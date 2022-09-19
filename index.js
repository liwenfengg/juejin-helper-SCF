const checkin = require("./workflows/checkin");
const seaGold = require("./workflows/seagold");
const growth = require("./workflows/growth");
const utils = require("./workflows/utils/utils");
const env = require("./workflows/utils/env");
const pushMessage = require("./workflows/utils/pushMessage");

exports.main_handler = async () => {
  let msgList = [];
  const cookies = utils.getUsersCookie(env);
  for (let ck of cookies) {
    let oneList = [];
    oneList.push(await checkin(ck), await seaGold(ck), await growth(ck));
    oneMsg = oneList.join(`\n${"-".repeat(30)}\n`);
    msgList.push(oneMsg);
  }
  if (env.MERGE=="true") {
    let msg = msgList.join(`\n${"-".repeat(50)}\n${"-".repeat(50)}\n`);
    await pushMessage({
      subject: "掘金每日任务",
      text: msg
    });
  } else {
    for (let msg of msgList) {
      await pushMessage({
        subject: "掘金每日任务",
        text: msg
      });
    }
  }
};
