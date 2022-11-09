const env = require("./utils/env");
const {
  collectArticle,
  diggArticle,
  diggPin,
  commentArticle,
  commentPin,
  followAuthor,
  publishArticle,
  publishPin,
  publishThemePin,
  readArticle
} = require("./task/index");

const handleTask = async (task, cookie) => {
  const id = task.task_id;
  if (id == 13 && env.READARTICLE) {
    await readArticle(task, cookie);
  }
  if (id == 9 && env.DIGGARTICLE) {
    await diggArticle(task, cookie);
  }
  if (id == 12 && env.COLLECTARTICLE) {
    await collectArticle(task, cookie);
  }
  if (id == 11 && env.FOLLOWAUTHOR) {
    await followAuthor(task, cookie);
  }
  if (id == 7 && env.COMMENTARTICLE) {
    await commentArticle(task, cookie);
  }
  if (id == 8 && env.COMMENTPIN) {
    await commentPin(task, cookie);
  }
  if (id == 10 && env.DIGGPIN) {
    await diggPin(task, cookie);
  }
  if (id == 6 && env.PUBLISHPIN) {
    await publishPin(task, cookie);
  }
  if (id == 5 && env.PUBLISHARTICLE) {
    await publishArticle(task, cookie);
  }

  try {
  await publishThemePin({limit:1,done:0},cookie)
  } catch (error) {
    console.log('error',error)
  }

};

module.exports = {
  handleTask
};
