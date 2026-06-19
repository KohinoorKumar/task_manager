let tasksDiv = document.createElement("div")
let taskCardDiv = document.createElement("div")
let cardTopDiv = document.createElement("div")
let cardBtnsDiv = document.createElement("div")
let status = document.createElement("p")
let category = document.createElement("p")
let h1 = document.createElement("h1")
let editBtn = document.createElement("button")
let completeBtn = document.createElement("button")
let deleteBtn = document.createElement("button")


const tasks = document.querySelector(".tasks")
const main = document.querySelector("main")
const createBtn = document.querySelector("#create")
const formDiv = document.querySelector(".form")
const formCancelDiv = document.querySelector(".form-cancel")
const form = document.querySelector("form")
const find = document.querySelector("#find")
const darkMode = document.querySelector("#dark-mode")
const dayMode = document.querySelector("#day")
const nightMode = document.querySelector("#night")
const totalTasks = document.querySelector("#total-tasks")
const pendingTasks = document.querySelector("#pending-tasks")
const completedTasks = document.querySelector("#completed-tasks")
const clearBtn = document.querySelector("#clear-tasks")

const tasksArr = []
let taskEdit = null

main.append(tasksDiv)
main.setAttribute("data-mode", 'night')
tasksDiv.classList.add('tasks')


const renderTask = (id, statusChange, title, categoryChange) => {
    const taskCardDiv = document.createElement("div")
    const cardTopDiv = document.createElement("div")
    const cardBtnsDiv = document.createElement("div")
    const status = document.createElement("p")
    const category = document.createElement("p")
    const h1 = document.createElement("h1")
    const editBtn = document.createElement("button")
    const completeBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    

    tasksDiv.append(taskCardDiv)
    taskCardDiv.classList.add('tasks-card')
    taskCardDiv.appendChild(cardTopDiv)
    cardTopDiv.classList.add("card-top")
    cardTopDiv.prepend(status)
    cardTopDiv.append(category)
    taskCardDiv.append(h1)

    taskCardDiv.setAttribute('data-id', id)

    status.innerText = statusChange
    status.setAttribute('data-status', statusChange)
    category.innerText = categoryChange
    category.setAttribute('data-category', categoryChange)


    h1.innerText = title

    taskCardDiv.append(cardBtnsDiv)
    cardBtnsDiv.classList.add('btns')
    cardBtnsDiv.append(editBtn)
    editBtn.id = 'edit'
    cardBtnsDiv.append(completeBtn)
    completeBtn.id = 'complete'
    cardBtnsDiv.append(deleteBtn)
    deleteBtn.id = 'delete'

    editBtn.innerText = 'Edit'
    completeBtn.innerText = 'Complete'
    deleteBtn.innerText = 'Delete'

    completeBtn.addEventListener('click', (event) => {
        if(status.getAttribute("data-status").toLowerCase() === 'pending'){
            status.setAttribute("data-status", "Completed")
            status.innerText = 'Completed'
            status.style.color = 'green'
            completeBtn.innerText = "Submitted"
            let task = tasksArr.find((elem) => elem.id === Number(taskCardDiv.dataset.id))
            if(task) {
                task.status = "Completed"
            } 
        }

        if(completeBtn.innerText === "Submitted"){
            taskCardDiv.style.backgroundColor = 'rgba(205, 134, 63, 0.699)'
        }

        renderTotalTasks()
        renderPendingTasks()
        renderCompletedTasks()
    })


    editBtn.addEventListener('click', (event) => {
        formDiv.style.display = 'flex'
        let taskName = tasksArr.find((elem) => {
            console.log("task Id:", elem.id)
            return elem.id === Number(taskCardDiv.dataset.id)
        })

        taskEdit = tasksArr.findIndex((elem) => elem.id === Number(taskCardDiv.dataset.id))

        if (taskName){
            form[0].value = taskName.title
            form[1].value = taskName.category
            form[2].innerText = "Edit"
        }

        renderTotalTasks()
        renderPendingTasks()
        renderCompletedTasks()
    })


    deleteBtn.addEventListener('click', () => {
        let index = tasksArr.findIndex((elem) => elem.id === Number(taskCardDiv.dataset.id))
        console.log("Index:", index)
        tasksArr.splice(index, 1)
        renderCard()
        renderTotalTasks()
        renderPendingTasks()
        renderCompletedTasks()
    })

    // console.log(taskCardDiv.dataset.id)
    // console.log(status.dataset.status)
    // console.log(category.dataset.category)

    renderTotalTasks()
    renderPendingTasks()
    renderCompletedTasks()

}

const renderCard = (list = tasksArr) => {
    tasksDiv.innerHTML = ''
    if(!list || list.length === 0){
        const msg = document.createElement('p')
        msg.classList.add('no-results')
        msg.innerText = 'No tasks found'
        if(main.getAttribute('data-mode') === 'day'){
            msg.style.color = 'black'
        }else{
            msg.style.color = 'white'
        }
        tasksDiv.append(msg)
        return
    }

    list.forEach((elem) => {
        renderTask(elem.id, elem.status, elem.title, elem.category)
    })

    renderTotalTasks()
    renderCompletedTasks()
    renderPendingTasks()
}

const renderTotalTasks = () =>{
    let length = tasksArr.length
    totalTasks.innerText = length
}

const renderCompletedTasks = () => {
    
    let completeCount = tasksArr.reduce((acc, item) => {
        if(item.status.toLowerCase() === 'completed'){
            acc++
        }
        return acc
    }, 0)
    console.log(completeCount);
    
    completedTasks.textContent = `${completeCount}`
}

const renderPendingTasks = () => {
    let pendingCount = tasksArr.reduce((acc, item) => {
        if(item.status.toLowerCase() === 'pending'){
            acc++
        }
        return acc
    }, 0)
    pendingTasks.innerText = pendingCount
}

const clearAllTasks = () => {
    tasksArr.forEach((elem) => {
        delete elem
        renderCard()
    })
}

renderCard()




createBtn.addEventListener("click", (event) => {
    formDiv.style.display = 'flex' 
})

formCancelDiv.addEventListener("click", () => {
    formDiv.style.display = 'none'
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let status = 'Pending'
    let title = form[0].value
    let categoryName = form[1].value


    let taskObj = {
        id: Date.now(),
        status: status,
        title:title,
        category: categoryName
    }

    if(taskEdit !== null){
        tasksArr[taskEdit] = taskObj
        taskEdit = null
    }else {
        tasksArr.push(taskObj)
    }

    renderCard()

    console.log(tasksArr)
    form.reset()

    formDiv.style.display = 'none'
})


find.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim()
    if(query === ''){
        renderCard()
        return
    }

    const filtered = tasksArr.filter((elem) => {
        return elem.title.toLowerCase().includes(query) || (elem.category && elem.category.toLowerCase().includes(query))
    })

    renderCard(filtered)
})

darkMode.addEventListener('click', () => {
    
    if (main.classList.toggle("light-up")){
        main.setAttribute("data-mode", 'day')
        dayMode.style.display = 'none'
        nightMode.style.display = 'flex'
        console.log(main.getAttribute('data-mode'))
        renderCard()
    } else {
        main.setAttribute("data-mode", 'night')
        dayMode.style.display = 'flex'
        nightMode.style.display = 'none'
        renderCard()
    }

})

clearBtn.addEventListener("click", () => {
    const userConfirmed = confirm("⚠️Are you sure you want to delete all task? ");
    if(userConfirmed){
        tasksArr.forEach((elem) => {
            tasksArr.splice(0, tasksArr.length)
        })
    } 

    renderCard()
    renderTotalTasks()
    renderPendingTasks()
    renderCompletedTasks()

})
