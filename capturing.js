const main = document.querySelector("main")
const body = document.querySelector("body")
const div = document.querySelector(".pipeline")
const darkMode = document.querySelector("#dark-mode")
const dayMode = document.querySelector("#day")
const nightMode = document.querySelector("#night")
const btn = document.querySelector(".card")

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

body.addEventListener("click", (events) => {
    console.log('great grand parent triggered...')
}, {capture:true})

main.addEventListener("click", (events) => {
   console.log('grand parent triggered...')
}, {capture:true})

div.addEventListener("click", (events) => {
    console.log('parent triggered...')
}, {capture:true})

btn.addEventListener("click", (events) => {
    console.log('child triggered...')
}, {capture:true})



