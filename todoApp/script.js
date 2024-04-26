const taskForm = document.getElementById("task-form");
// form element
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
// dialog element . <form> can be linked with it by atribute method="dialog"
const openTaskFormBtn = document.getElementById("open-task-form-btn");
// button Add New Task
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
// button without text - close new task creation with cose element
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
// button to add or update - the same element
const cancelBtn = document.getElementById("cancel-btn");
// existing task button with Cancel
const discardBtn = document.getElementById("discard-btn");
// existing task button with Discard
const tasksContainer = document.getElementById("tasks-container");
// empty div to fill it with new tasks
const titleInput = document.getElementById("title-input");
// task options - Title
const dateInput = document.getElementById("date-input");
// task options - Date
const descriptionInput = document.getElementById("description-input");
// task options - Description
const taskData = JSON.parse(localStorage.getItem("data")) || [];
// array with tasks created and saved in local storage

let currentTask = {};

const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  //update button text
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  // array method finds and returns the index of the first element
  // in an array that meets the criteria specified by a provided testing function.
  //  If no such element is found, the method returns -1.

  const taskObj = {
    // When a user creates a task, it should be saved in an object
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    // create an unique id for each task using Data
    // split method split the string into an array of words
    // join method turns the result back into a string. For the separator, use a hyphen (-)
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
    // our object contains inputs values from three fields
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
    // add the taskObj object to the beginning of the taskData array.
  } else {
    taskData[dataArrIndex] = taskObj;
    // to make the editing functional
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  // clear out the existing contents of tasksContainer before adding a new task
  // display the task on the page by looping through it
  // object destructuring of callback function params
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick="editTask(this)">Edit</button>
          <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
        </div>
      `;
  });
  // creating ellements inside Task container
  // to enable editing and deleting for each task
  // add an onclick attribute to both buttons
};

const deleteTask = (buttonEl) => {
  //is passed to onclick attribute with param this(wich mean the button with attribute onclick)
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  // splice() is an array method that modifies arrays by removing,
  // replacing, or adding elements at a specified index,
  // while also returning the removed elements.
  // It can take up to three arguments: the first one is the mandatory index
  // at which to start (dataArrIndex), the second is the number of items to remove - 1,
  // and the third is an optional replacement element.
  localStorage.setItem("data", JSON.stringify(taskData));
};
// The item you retrieve is a string, as you saved it with JSON.stringify().
// To view it in its original form before saving, you need to use JSON.parse().
// you can use localStorage.removeItem() to remove a specific item
// and localStorage.clear() to clear all items in the local storage.

const editTask = (buttonEl) => {
  //is passed to onclick attribute with param this(buttonEl - button with attribute onclick)
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  // find a task to edit using id and assign it to currenttask variable
  currentTask = taskData[dataArrIndex];
  //retrieve the task to be edited
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";
  // set button text
  taskForm.classList.toggle("hidden");
  // close the form modal to view the task
};

// instead of clearing the input fields one by one,
// it's a good practice to create a function that handles clearing those fields
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  // clear the input fields and also hide the form modal for the user to see the added task
  currentTask = {};
};

if (taskData.length) {
  updateTaskContainer();
}

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});
//opening and closing the form modal with toggle class hidden with display none option

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  // check if there is a value in the titleInput field
  // or the dateInput field or the descriptionInput field

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  // if the user attempts to edit a task but decides not to make
  // any changes before closing the form, there is
  // no need to display the modal with the Cancel and Discard buttons.

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
    // method of dialog element  to display a modal dialog
  } else {
    // if there are no changes
    reset();
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  // The dialog box can be closed using the .close() method
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // stop the browser from refreshing the page after submitting the form
  addOrUpdateTask();
});
