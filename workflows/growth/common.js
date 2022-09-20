// 获取最新文章列表
const JuejinHttp = require("./api");

// 获取文章列表
// 300最新 200 为 默认
const getArticleList = async cookie => {
  const API = new JuejinHttp(cookie);
  const list = await API.getRecommendArticles().catch(err => {
    console.log(err);
  });
  const articles = [];
  list.map(v => {
    if (v.item_type == 2) {
      articles.push(v.item_info);
    }
  });
  return articles || [];
};

module.exports = {
  getArticleList
};
