// 发布沸点
const JuejinHttp = require("../api");
const { getHitokotoWords, getRandomEmoji } = require("../utils");
const env = require("../utils/env");
const pinPublish = async (task, cookie) => {
  const API = new JuejinHttp(cookie);
  const times = task.limit - task.done; //需要执行的次数
  console.log(`需要发布${times}篇沸点`);
  for (let i = 0; i < times; i++) {
    const emoji = env.APPEND_EMOJI ? await getRandomEmoji() : "";
    const words = (await getHitokotoWords()) + emoji;
    const pinRes = await API.pinPublish(words);
  }
  console.log(`发布沸点 done`);
};

module.exports = pinPublish;
