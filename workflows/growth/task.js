const {
  collectArticle,
  diggArticle,
  diggPin,
  commentArticle,
  commentPin,
  followAuthor,
  publishArticle,
  publishPin,
  readArticle
} = require("./task/index");

const handleTask = async (task, cookie) => {
  const id = task.task_id;
  if (id == 13) {
    await readArticle(task, cookie);
  }
  if (id == 9) {
    await diggArticle(task, cookie);
  }
  if (id == 12) {
    await collectArticle(task, cookie);
  }
  if (id == 11) {
    await followAuthor(task, cookie);
  }
  if (id == 7) {
    await commentArticle(task, cookie);
  }
  if (id == 8) {
    await commentPin(task, cookie);
  }
  if (id == 10) {
    await diggPin(task, cookie);
  }
  if (id == 6) {
    await publishPin(task, cookie);
  }
  if (id == 5) {
    await publishArticle(task, cookie);
  }
};

module.exports = {
  handleTask
};
