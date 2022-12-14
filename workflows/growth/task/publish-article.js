// 发布文章
const JuejinHttp = require("../api");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { getRandomInt } = require("../utils");

const publishArticle = async (task, cookie) => {
  const baseURL = "https://segmentfault.com";
  const API = new JuejinHttp(cookie);

  const parseToDOM = string => {
    // ALERT: Only basic dom api is enabled.
    const dom = new JSDOM(string);
    return dom.window.document;
  };

  const parseToLinkList = DOM => {
    const listDOM = DOM.querySelectorAll(".list-group-item");
    const linkList = [];
    for (const article of listDOM) {
      const item = article?.querySelector("a");
      const title = item?.innerHTML;
      const link = item?.getAttribute("href");
      linkList.push({
        title,
        link
      });
    }
    return linkList;
  };

  const fetchArticleDOM = link => {
    return axios
      .get(baseURL + link)
      .then(res => res.data)
      .then(data => parseToDOM(data))
      .catch(err => {
        console.log("获取文章内容失败");
        console.log(err);
      });
  };

  const parseToContent = DOM => {
    const articleDOM = DOM.querySelector("article");

    const imgs = articleDOM.querySelectorAll("img");
    imgs.forEach(item => item.remove()); // 移除所有图片

    const content = articleDOM.innerHTML;
    const brief_content = articleDOM.textContent.substr(0, 50) + "...";

    return {
      content,
      brief_content
    };
  };

  const fetchArticleContent = async linkList => {
    const slicedList = linkList.slice(0, 2);
    const articleList = [];
    for (const { title, link } of slicedList) {
      const DOM = await fetchArticleDOM(link);
      const { content, brief_content } = parseToContent(DOM);
      articleList.push({
        title,
        content: content + `<blockquote>\n\n本文来源：<a href="${baseURL + link}">${title}</a>\n</blockquote>`,
        brief_content
      });
    }
    return articleList;
  };

  const publishArticle = async articleList => {
    for (const { title, content, brief_content } of articleList) {
      const articleInfo = await API.createArticle(title).catch(err => {
        console.log(`创建文章失败`);
        console.log(err);
      });
      const article_id = articleInfo["id"];
      const category_id_list = ["6809637771511070734", "6809637776263217160", "6809637772874219534"];
      const tag_ids_list = ["6809640456868086000", "6809640490242146000", "6809640406058271000", "6809640684354535000"];
      const cateIndex = getRandomInt(0, category_id_list.length - 1);
      const tagIndex = getRandomInt(0, tag_ids_list.length - 1);
      await API.updateArticle(article_id, title, brief_content, content, category_id_list[cateIndex], [
        tag_ids_list[tagIndex]
      ]).catch(err => {
        console.log(`更新文章内容失败`);
        console.log(err);
      });
      await API.publishArticle(article_id).catch(err => {
        console.log(`发布文章失败`);
        console.log(err);
      });
    }
  };

  await axios
    .get(baseURL + "/blogs")
    .then(res => res.data)
    .then(data => parseToDOM(data))
    .then(DOM => parseToLinkList(DOM))
    .then(linkList => fetchArticleContent(linkList))
    .then(articleList => publishArticle(articleList))
    .catch(err => {
      console.log("发布文章出错");
      console.log(err);
    });
};

module.exports = publishArticle;
