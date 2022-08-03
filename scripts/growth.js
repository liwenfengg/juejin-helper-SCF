const JuejinHttp = require("./growth/api");
const {getCookie} = require("./growth/cookie");
const {handleTask} = require("./growth/task");
const pushMessage = require("./utils/pushMessage");

const growth = async () => {
  try {
    const cookie = await getCookie();
    const API = new JuejinHttp(cookie);
    const {growth_tasks = {}} = await API.getTaskList();
    const data = Object.values(growth_tasks);
    let taskHasDone = 0;
    for (let items of data) {
      for (let task of items) {
        if (task.limit > 0 && task.done < task.limit && ![4, 15, 16].includes(task.task_id)) {
          console.log(`---开始任务：<${task.title}> ---`);
          await handleTask(task);
          taskHasDone += 1;
        }
      }
    }
    const {today_jscore} = await API.getTaskList();
    if (taskHasDone > 0) {
      const message = `成长任务已完成: ${today_jscore}`;
      console.log(message);
      return await pushMessage({
        subject: "掘金成长任务",
        text: message
      });
    }
  } catch (err) {
    console.log(`出错了: ${err.message}`);
  }
};

module.exports = growth;
