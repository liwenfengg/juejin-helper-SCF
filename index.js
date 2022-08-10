const checkin = require("./workflows/checkin");
const seaGold = require("./workflows/seaGold");
const growth = require("./workflows/growth");

module.exports = main_handler = async () => {
  await checkin();
  await seaGold();
  await growth();
};
