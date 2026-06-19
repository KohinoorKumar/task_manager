//? #pipeline

const main = document.querySelector("main")
const darkMode = document.querySelector("#dark-mode")
const dayMode = document.querySelector("#day")
const nightMode = document.querySelector("#night")
const arrows = document.querySelectorAll(".arrow")

darkMode.addEventListener('click', () => {
    
    if (main.classList.toggle("light-up")){
        main.setAttribute("data-mode", 'day')
        dayMode.style.display = 'none'
        nightMode.style.display = 'flex'
        console.log(main.getAttribute('data-mode'))
        arrows.forEach((arrow) => arrow.style.color = 'black')
        renderCard()
    } else {
        main.setAttribute("data-mode", 'night')
        dayMode.style.display = 'flex'
        nightMode.style.display = 'none'
        arrows.forEach((arrow) => arrow.style.color = 'white')
        renderCard()

    }

})