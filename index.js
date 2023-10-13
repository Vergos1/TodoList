"use strict";

//note Selecting DOM elements
const input = document.querySelector(".todolist__input");
const contentBlock = document.querySelector(".todolist__content");
const documentationBlock = document.querySelector(".todolist__documentation");
const headerBlock = document.querySelector(".todolist__header");
const buttonAdd = document.querySelector(".todolist__add");
const buttonDeleteAll = document.querySelector(".todolist__delete-all");
const buttonTab = document.querySelectorAll(".todolist__tab");

//note Function to handle the completion of tasks
buttonTab[0].classList.add("active-tab"); // Set the first tab as active initially
activeContent();

buttonTab.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Switch between content and documentation views when tab is clicked
    buttonTab.forEach(button => button.classList.remove("active-tab"));
    button.classList.add("active-tab");
    if (index === 0) {
      documentationBlock.classList.remove("active-content");
      activeContent();
    } else {
      contentBlock.classList.remove("active-content");
      activeDocumentation();
    }
  });
});

function activeContent() {
  contentBlock.classList.add("active-content"); // Activate the content view
}

function activeDocumentation() {
  documentationBlock.classList.add("active-content"); // Activate the documentation view
}

//note Retrieve saved items from local storage or initialize an empty array
let savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

//note Function to update local storage
function updateLocalStorage() {
  localStorage.setItem("todoItems", JSON.stringify(savedItems));
}

//note Function to delete a task by index
function deleteTask(index) {
  savedItems.splice(index, 1); // Remove a task from the list
  updateLocalStorage(); // Update local storage with the modified list
  renderItems(); // Render the updated list of tasks
}

function addMessage() {
  headerBlock.insertAdjacentHTML("beforeend", `<span class="todolist__message">You have successfully added a note "${input.value}"</span>`);
  setTimeout(() => {
    headerBlock.querySelector(".todolist__message").remove(); // Remove the success message after 1 second
  }, 1000);
}

//note Function to add a new task
function addTodoItem() {
  const inputValue = input.value;
  if (inputValue.length < 1) {
    return; // Do nothing if the input value is empty
  }
  addMessage(); // Display a success message
  setTimeout(() => {
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
    savedItems.push(todoItem); // Add the new task to the list
    updateLocalStorage(); // Update local storage with the modified list
    renderItems(); // Render the updated list of tasks
  }, 1000); // Delay the task addition by 1 second
  input.value = ""; // Clear the input field
}

//note Function to render items on the page
function renderItems() {
  contentBlock.innerHTML = savedItems.join(""); // Display the tasks in the content block
  const deleteButtons = contentBlock.querySelectorAll(".todolist__delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteTask(index); // Set up event listeners for deleting tasks
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
    documentationBlock.classList.remove("active-content");
    contentBlock.classList.add("active-content");
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
      parentItem.classList.toggle("done-todo"); // Toggle the completed status of a task
      savedItems[index] = parentItem.outerHTML; // Update the task in the list
      updateLocalStorage(); // Update local storage with the modified list
    });
  });
}

renderItems();
