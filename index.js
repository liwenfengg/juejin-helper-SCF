const checkin = require("./workflows/checkin");
const seaGold = require("./workflows/seagold");
const growth = require("./workflows/growth");

module.exports = main_handler = async () => {
  await checkin();
  await seaGold();
  await growth();
};
