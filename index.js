"use strict";

//note Selecting DOM elements
const input = document.querySelector(".todolist__input");
const contentBlock = document.querySelector(".todolist__content");
const buttonAdd = document.querySelector(".todolist__add");
const buttonDeleteAll = document.querySelector(".todolist__delete-all");

// Retrieve saved items from local storage or initialize an empty array
let savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

//note Function to update local storage
function updateLocalStorage() {
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
}

//note Function to delete a task by index
function deleteTask(index) {
  savedItems.splice(index, 1);
  updateLocalStorage();
  renderItems();
}

//note Function to add a new task
function addTodoItem() {
  const inputValue = input.value;
  if (inputValue.length < 1) {
    return;
  }
  const todoItem = `
     <div class="todolist__item">
        <span class="todolist__label">${inputValue}</span>
        <div class="todolist__buttons">
            <button class="todolist__done">
                <img src="./img/check.svg" alt="complete">
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

//note Function to render items on the page
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

//note Render items on page load
renderItems();

//note Initialize the buttonDoneHandler
buttonDoneHandler();

//note Event listener for adding a task when Enter key is pressed
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodoItem();
  }
});

//note Event listener for adding a task when "Add" button is clicked
buttonAdd.addEventListener("click", addTodoItem);

//note Function to remove all tasks
function removeAllTodoItem() {
  savedItems = [];
  localStorage.removeItem("todoItems");
  renderItems();
}

//note Event listener for removing all tasks
buttonDeleteAll.addEventListener("click", removeAllTodoItem);

//note Function to handle the completion of tasks
function buttonDoneHandler() {
  const buttonDoneOnce = contentBlock.querySelectorAll(".todolist__done");
  buttonDoneOnce.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const parentItem = e.currentTarget.closest(".todolist__item");
      parentItem.classList.toggle("done-todo");
      savedItems[index] = parentItem.outerHTML;
      updateLocalStorage();
    });
  });

}

renderItems();



