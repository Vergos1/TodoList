"use strict";

const input = document.querySelector(".todolist__input");
const contentBlock = document.querySelector(".todolist__content");
const buttonAdd = document.querySelector(".todolist__add");
const buttonDeleteAll = document.querySelector(".todolist__delete-all");

let savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

function updateLocalStorage() {
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
}

function deleteTask(index) {
  savedItems.splice(index, 1);
  updateLocalStorage();
  renderItems();
}

function addTodoItem() {
  const inputValue = input.value;
  if (inputValue.length < 1) {
    return;
  }
  const todoItem = `
     <div class="todolist__item">
            <span class="todolist__label">${inputValue}</span>
        <div class="todolist__buttons">
            <button class="todolist__complite complite-todo-button">
                <img src="./img/check.svg" alt="complite">
            </button>
            <button class="todolist__delete">
                <img src="./img/delete-icon.svg" alt="delete">
            </button>
        </div>
     </div>
  `;
  savedItems.push(todoItem);
  updateLocalStorage();
  renderItems();
  input.value = "";
}

function renderItems() {
  contentBlock.innerHTML = savedItems.join("");
  const deleteButtons = contentBlock.querySelectorAll(".todolist__delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteTask(index);
    });
  });
  buttonDoneHandler();
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


function buttonDoneHandler () {
  const buttonDoneOnce = contentBlock.querySelectorAll(".todolist__complite");
  buttonDoneOnce.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const parentItem = e.currentTarget.closest(".todolist__item");
      parentItem.classList.toggle("done-todo");
      savedItems[index] = parentItem.outerHTML;
      updateLocalStorage();
    })
  });
}
buttonDoneHandler();
