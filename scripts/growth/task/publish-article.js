const {getCookie} = require("../cookie");
const JuejinHttp = require("../api");
const {getBrowser} = require("../utils");

const mockArticleData = {
  title: "如果有一天不做前端了，我会做什么？",
  brief_content:
    "毕业后就投身于前端行业，这期间做过业务，做过基建，大前端技术体系下的各个子方向基本都实践过。回过头来看，与刚进入前端行业时相比，对前端行业的认识更清晰...",
  content: `毕业后就投身于前端行业，这期间做过业务，做过基建，大前端技术体系下的各个子方向基本都实践过。回过头来看，与刚进入前端行业时相比，对前端行业的认识更清晰了，但也发现困惑更多了，追求的东西好像变了，欠缺的东西变多了。`
};

const articlePublish = async (task) => {
  const cookie = await getCookie();
  const API = new JuejinHttp(cookie);
  const times = task.limit - task.done; //需要执行的次数
  console.log(`需要发布${times}篇文章`);
  let links = [];
  let articles = [];
  const defaultArticles = Array(times).fill(mockArticleData);
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // 爬取一篇文章发布 并删除
    await page.goto(`https://segmentfault.com/blogs/newest`);
    await page.waitForTimeout(10000);
    await page.waitForSelector(".content-list-wrap");
    const host = `https://segmentfault.com`;
    links = await page.$$eval(".content-list-wrap .list-group-item", (els) => {
      return els.map((el) => {
        let $a = el.querySelector("h5 a.title");
        if ($a) {
          return $a.getAttribute("href");
        }
      });
    });
    links = links.filter((v) => !!v);
    if (!links.length) {
      console.log(`未抓取到合适的文章`);
    } else {
      for (let i = 0; i < times; i++) {
        let link = host + (links[i] || links[0]);
        await page.goto(link);
        await page.waitForTimeout(5000);
        await page.waitForSelector("h1.h2");
        const title = await page.$$eval("h1.h2", (els) => {
          return els[0].innerText;
        });
        let content = await page.$$eval("article.article-content", (els) => {
          return els[0].innerText;
        });
        if (content.length == 0) {
          content += title;
        }
        content += ` \n> 来源： [${title}](${link}) \n`;
        let brief_content = content.substr(0, 50) + "...";
        while (brief_content.length < 50) {
          brief_content += brief_content;
        }
        articles.push({
          title,
          content,
          brief_content
        });
      }
    }
  } catch (err) {
    console.log(`爬取文章失败，将发布默认文章`);
    console.log(err.message);
  }

  articles = articles.concat(defaultArticles);
  for (let i = 0; i < times; i++) {
    let currentArticle = articles[i];
    let {title, brief_content, content} = currentArticle;
    const articleInfo = await API.createArticle(title).catch((err) => {
      console.log(`发布失败`);
      console.log(err);
    });
    const article_id = articleInfo["id"];
    await API.updateArticle(article_id, title, brief_content, content).catch((err) => {
      console.log(`发布失败2`);
      console.log(err);
    });
    // 去草稿箱点击模拟发布文章
    await page.goto(`https://juejin.cn/editor/drafts/${article_id}`);
    await page.waitForTimeout(2000);
    await page.click(".publish-popup");
    await page.waitForTimeout(2000);
    await page.click(".panel .footer button:last-of-type");
    // 监听发布成功
    const publishRes = await page.waitForResponse((response) =>
      response.url().includes(`https://api.juejin.cn/content_api/v1/article/publish`)
    );
    const publishResJson = await publishRes.json();
    if (publishResJson.err_no == 0) {
      const data = publishResJson.data;
      // 删除刚刚发布的文章
      // ids.push(data.article_id)
      // await API.articleRemove(data.article_id || '')
    }
  }
  await page.close();
  console.log(`发布文章 done`);
};

module.exports = articlePublish;
