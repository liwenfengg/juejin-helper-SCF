// 阅读文章
const JuejinHttp = require("../api");
const { getArticleList } = require("../common");
const readArticle = async (task, cookie) => {
  const API = new JuejinHttp(cookie);
  const articles = await getArticleList(cookie);
  const times = task.limit - task.done; //需要执行的次数
  console.log(`需要阅读${times}篇文章`);
  for (let i = 0; i < times; i++) {
    let article = articles[i];
    console.log(`阅读文章《${article["article_info"]["title"]}》`);
    await API.growthPointReport(article.article_id);
  }
  console.log("阅读文章 done");
};

module.exports = readArticle;
