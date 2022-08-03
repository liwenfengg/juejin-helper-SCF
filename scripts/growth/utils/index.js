const axios = require("axios");
const puppeteer = require("puppeteer");

module.exports = {
  deepMerge(ops1, ops2) {
    let ops = Object.assign({}, ops1, ops2);
    let keys = Object.keys(ops1);
    keys.forEach((item) => {
      if (typeof ops1[item] === "object" && !Array.isArray(ops1[item])) {
        ops[item] = Object.assign({}, ops1[item], ops2[item] || {});
      }
    });
    return ops;
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  async getRandomSentence() {
    return new Promise(async (r) => {
      const defaultWords = `最近大环境好像真的很差哎，以前简历找我的都是一大堆，现在寥寥无几`;
      const res = await axios.get("https://v1.jinrishici.com/all.json").catch((error) => {
        return r(defaultWords);
      });
      if (res.status == 200) {
        const data = res.data;
        if (data && data.content) {
          return r(data.content);
        }
      }
      return r(defaultWords);
    });
  },
  async getHitokotoWords() {
    return new Promise(async (r) => {
      const defaultWords = `最近大环境好像真的很差哎，以前简历找我的都是一大堆，现在寥寥无几`;
      const res = await axios.get("https://v1.hitokoto.cn/").catch((error) => {
        return r(defaultWords);
      });
      if (res.status == 200) {
        const data = res.data;
        if (data && data.hitokoto) {
          return r(data.hitokoto);
        }
      }
      return r(defaultWords);
    });
  },
  async addCookies(cookies_str, page, domain) {
    let cookies = cookies_str.split(";").map((pair) => {
      let name = pair.trim().slice(0, pair.trim().indexOf("="));
      let value = pair.trim().slice(pair.trim().indexOf("=") + 1);
      return {name, value, domain};
    });
    await Promise.all(
      cookies.map((pair) => {
        return page.setCookie(pair);
      })
    );
  },
  async getBrowser(options) {
    try {
      const browser = await puppeteer.launch(
        Object.assign({}, options, {
          headless: true,
          ignoreDefaultArgs: ["--disable-extensions"],
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--use-gl=egl",
            "--disable-web-security",
            "--disable-features=IsolateOrigins,site-per-process"
          ]
        })
      );
      return browser;
    } catch (error) {
      console.log(error.message || "puppeteer启动失败");
    }
  }
};
