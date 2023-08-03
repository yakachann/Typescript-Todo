import { v4 as uuidV4 } from "uuid";

type Task = { id: string, title: string, completed: boolean, createdAt: Date }

/**
 * querySelecterの後ろでジェネリクス、getElementbyId()の後ろでas句で型の指定可能
 */
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTask(); //loadTask()の戻り値を配列型に
tasks.forEach(addListItem);

/**「?.」はオプションチェーン演算子で、プロパティやメソッドにアクセスする際、そのプロパティやメソッドが存在するかチェックしてくれる
 * 　存在しない場合はエラーではなくundefinedを返してくれる
 */
form?.addEventListener("submit", e => {
  e.preventDefault()
  if (input?.value == "" || input?.value == null) return

  const newTask: Task= {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);

  addListItem(newTask);
  input.value = ""; //入力してタスク化されたら入力欄を空にする
})

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTask(): Task[]{
  const taskJSON = localStorage.getItem("TASKS");
  if(taskJSON == null) return []
  return JSON.parse(taskJSON);
}