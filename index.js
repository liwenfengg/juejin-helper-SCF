const checkin = require("./scripts/checkin");
const seaGold = require("./scripts/seaGold");
const growth = require("./scripts/growth");

// exports.main_handler = async () => {
//   await checkin();
//   await seaGold();
// await growth();
// };
const main_handler = async () => {
  //   await checkin();
  // await seaGold();
  await growth();
};

main_handler();
