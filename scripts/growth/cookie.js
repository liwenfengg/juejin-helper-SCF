const {getUsersCookie} = require("../utils/utils");
const env = require("../utils/env");

const getCookie = async () => {
  const cookies = getUsersCookie(env);
  try {
    // 只使用第一个Cookie执行成长任务
    return cookies[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCookie
};
