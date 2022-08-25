const form = document.querySelector("form");
const formBtn = document.querySelector("form button");
const input = document.querySelector("form input");
const listContainer = document.querySelector(".list-container");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");

let editFlag = false;
let element2;
let todos = JSON.parse(localStorage.getItem("items"));
todos.forEach((task) => {
    addTodos(task)
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodos()
})
function addTodos(task) {
    if (!editFlag) {
        const list = document.createElement("li");
        if (task) {
            list.innerText = task;
        }
        else {
            list.innerText = input.value;
        }

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container")
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        btnContainer.append(editBtn);
        btnContainer.append(deleteBtn)
        const listItem = document.createElement("div");
        listItem.classList.add("list-item")
        listItem.appendChild(list);
        listItem.append(btnContainer)
        listContainer.append(listItem);
        input.value = '';
        alert.classList.remove("redColor")
        alert.classList.add("greenColor")
        displayAlert("Item Added!")
        removeAlert();
        updateLocalStorage();


        clearBtn.classList.add("activeBtn")
        editBtn.addEventListener("click", (e) => {
            console.log(editFlag)
            element2 = e.currentTarget.parentElement.previousElementSibling;
            formBtn.innerText = 'Edit';
            input.value = element2.innerText;
            editFlag = true;
        })
        deleteBtn.addEventListener("click", (e) => {
            let element = e.currentTarget.parentElement.parentElement;
            listContainer.removeChild(element);
            if (listContainer.children.length === 0) {
                clearBtn.classList.remove("activeBtn")
            }
            alert.classList.add("redColor")
            alert.classList.remove("greenColor")
            displayAlert("Item Deleted Successfuly!")
            removeAlert();
            updateLocalStorage();
        })
        clearBtn.addEventListener("click", () => {
            const lis = document.querySelectorAll(".list-item");
            if (lis.length > 0) {
                lis.forEach((item) => {
                    listContainer.removeChild(item)
                })
                alert.classList.add("redColor")
                alert.classList.remove("greenColor")
                displayAlert("All Items Removed!")
                removeAlert()
            }
            clearBtn.classList.remove("activeBtn");
            updateLocalStorage();
        })
    }
    else if (editFlag) {
        element2.innerText = input.value
        editFlag = false
        input.value = '';
        formBtn.innerText = 'Submit'
        alert.classList.remove("redColor")
        alert.classList.add("greenColor")
        displayAlert("Item Edited!")
        removeAlert();
        updateLocalStorage();
    }
}

function displayAlert(text) {
    alert.innerText = text;
    alert.classList.add("alertVisible")
}

function removeAlert() {
    setTimeout(() => {
        alert.classList.remove("alertVisible")
    }, 1000)
}

function updateLocalStorage() {
    todos = [];
    let list = document.querySelectorAll("li");
    list.forEach((item) => {
        todos.push(item.innerHTML)
    })
    localStorage.setItem("items", JSON.stringify(todos))
}
