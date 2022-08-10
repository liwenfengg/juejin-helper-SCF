const axios = require("axios");
const hitokotoURL = "https://v1.hitokoto.cn/?c=e";

const deepMerge = (ops1, ops2) => {
  let ops = Object.assign({}, ops1, ops2);
  let keys = Object.keys(ops1);
  keys.forEach(item => {
    if (typeof ops1[item] === "object" && !Array.isArray(ops1[item])) {
      ops[item] = Object.assign({}, ops1[item], ops2[item] || {});
    }
  });
  return ops;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomEmoji = async () => {
  return new Promise(async r => {
    const emojis = [
      "[闭嘴]",
      "[睡]",
      "[吃瓜群众]",
      "[尴尬]",
      "[发怒]",
      "[调皮]",
      "[撇嘴]",
      "[思考]",
      "[不失礼貌的微笑]",
      "[奸笑]",
      "[抓狂]",
      "[吐]",
      "[偷笑]",
      "[愉快]",
      "[白眼]",
      "[傲慢]",
      "[困]",
      "[灵光一现]",
      "[流汗]",
      "[憨笑]",
      "[捂脸]",
      "[奋斗]",
      "[咒骂]",
      "[疑问]",
      "[嘘]",
      "[晕]",
      "[衰]",
      "[骷髅]",
      "[敲打]",
      "[再见]",
      "[擦汗]",
      "[抠鼻]",
      "[泣不成声]",
      "[坏笑]",
      "[左哼哼]",
      "[右哼哼]",
      "[打哈欠]",
      "[鄙视]",
      "[委屈]",
      "[快哭了]",
      "[摸头]"
    ];
    const index = getRandomInt(0, emojis.length - 1);
    return r(emojis[index]);
  });
};

const getHitokotoWords = async () => {
  return new Promise(async r => {
    const defaultWords = "呃呃";
    const res = await axios.get(hitokotoURL).catch(error => {
      return r(defaultWords);
    });
    if (res.status == 200) {
      const data = res.data;
      if (data && data.hitokoto) {
        const emj = await getRandomEmoji();
        const word = (data.hitokoto += emj);
        return r(word);
      }
    }
    return r(defaultWords);
  });
};

module.exports = {
  deepMerge,
  getRandomInt,
  getHitokotoWords,
  getRandomEmoji
};
