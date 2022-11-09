const JuejinHttp = require("./growth/api");
const { handleTask } = require("./growth/task");

const {
  publishThemePin,
} = require("./growth/task/index");

const growth = async cookie => {
  let message = "掘金成长\n";
  try {
    const API = new JuejinHttp(cookie);
    const { growth_tasks = {} } = await API.getTaskList();
    const data = Object.values(growth_tasks);
    for (let items of data) {
      for (let task of items) {
        if (task.limit > 0 && task.done < task.limit && ![4, 15, 16].includes(task.task_id)) {
          console.log(`---开始任务：<${task.title}> ---`);
          await handleTask(task, cookie);
        }
      }
    }
    const { today_jscore } = await API.getTaskList();
    message += `任务完成: ${today_jscore}`;

    try {
      await publishThemePin({limit:1,done:0},cookie)
    } catch (error) {
      console.log('error',error)
    }

  } catch (err) {
    message += `任务出错: ${err.message}`;
  }
  console.log(message);
  return message;
};

module.exports = growth;
