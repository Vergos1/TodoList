"use strict";

const input = document.querySelector(".todolist__input");
const contentBlock = document.querySelector(".todolist__content");
const buttonAdd = document.querySelector(".todolist__add");
const buttonDeleteAll = document.querySelector(".todolist__delete-all");

let savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

//note Function for deleting a task/Функция удаления задачи
function deleteTask(itemElement) {
  savedItems = savedItems.filter((item) => item !== itemElement);
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
  renderItems();
}

//note Function for adding a task/Функция добавления задачи
function addTodoItem() {
  const inputValue = input.value;
  if (inputValue.length < 1) {
    return;
  }
  const todoItem = `
     <div class="todolist__item">
        <span class="todolist__label">${inputValue}</span>
        <button class="todolist__delete">
            <img src="./img/delete-icon.svg" alt="delete">
        </button>
     </div>
  `;
  savedItems.push(todoItem);
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
  renderItems();
  input.value = "";
}

//note Function for displaying tasks/Функция отображения задач
function renderItems() {
  contentBlock.innerHTML = savedItems.join("");
  const deleteButtons = contentBlock.querySelectorAll(".todolist__delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteTask(savedItems[index]);
    });
  });
}

renderItems();

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodoItem();
  }
});

buttonAdd.addEventListener("click", addTodoItem);

function removeAllTodoItem() {
  savedItems = [];
  localStorage.removeItem("todoItems");
  renderItems();
}

buttonDeleteAll.addEventListener("click", removeAllTodoItem);
