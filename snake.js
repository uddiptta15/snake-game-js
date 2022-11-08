let snakeArr = [
    { x: 4, y: 7 }
]
let snakeDirr = [
    { x: 0, y: 0 }
]
let foodArr = [
    { x: 12, y: 12 }
]

let scoreObject = {
    your_score: 0
}

let color = ["rgb(86, 248, 194,0.1)", "rgb(63, 255, 5,0.1)", "rgb(255, 234, 0,0.1)","rgb(77, 73, 73,0.1)","blueviolet", "rgb(44, 110, 232,0.1)", "rgb(251, 20, 243,0.1)","rgb(251, 20, 47,0.1)"]

let timeOut = 0.2

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let maxScore = localStorage.getItem('maxScore') || 0
let currScore = scoreObject.your_score

let maxscore1 = document.getElementsByClassName("maxscore")[0]
let score = document.getElementsByClassName("score")[0]
let gameBox = document.getElementById("gameBox")
let snake = document.createElement("div")
let food = document.createElement("div")
let SnakeImage = document.createElement("img")
SnakeImage.classList.add("SnakeImage")
SnakeImage.setAttribute("src","https://image.winudf.com/v2/image/Y29tLnh0cl9zY3JlZW5fM19mMnU5b2k5Yg/screen-3.jpg?fakeurl=1&type=.webp")
let lastPaintTime = 0
let speed = 8
let gridSide = 30

snake.className = "snake"
food.className = "food"

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime
    gameloop()
}
window.requestAnimationFrame(main)

const SnakePosition = () => {

    snakeArr.forEach((e, i) => {
        let snake = document.createElement("div")
        if (i == 0) {
            snake.className = "snakeHead"
        } else {
            snake.className = "snake"
        }
        snake.style.gridRowStart = e.x
        snake.style.gridColumnStart = e.y
        gameBox.append(snake)
    })
}

const DisplayFood = () => {
    food.style.gridRowStart = foodArr[0].x
    food.style.gridColumnStart = foodArr[0].y
    gameBox.append(food)
}

const ChangePosition = () => {
    musicSound.play();
    gameBox.innerHTML = ""
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x = (snakeArr[0].x + snakeDirr[0].x) % gridSide
    snakeArr[0].y = (snakeArr[0].y + snakeDirr[0].y) % gridSide
    if (snakeArr[0].x <= 0) {
        snakeArr[0].x += gridSide
    }
    if (snakeArr[0].y <= 0) {
        snakeArr[0].y += gridSide
    }
    SnakePosition()
    DisplayFood()
    collison()
}

const ChangeFood = () => {

    gameBox.innerHTML = ""
   

    function generateUnique(arr) {
        const num = Math.floor(Math.random() * (gridSide - 1)) + 1
        if (arr.includes(num)) {
            return generateUnique(arr)
        }
        return num
    }

    let posX = []
    let posY = []
    for (let index = 0; index < snakeArr.length; ++index) {
        const element = snakeArr[index];
        posX.push(element.x)
        posY.push(element.y)
    }

    a = generateUnique(posX)
    b = generateUnique(posY)

    function getRandomColor() {
       return color[(a+b)%(color.length-1)]
    }
    // gameBox.style.backgroundColor = getRandomColor()
    foodArr[0].x = a
    foodArr[0].y = b
    SnakePosition()
    DisplayFood()
}

const ChangeLength = () => {
    if (snakeDirr[0].x == 1) {
        let l = snakeArr.length
        let m = snakeArr[l - 1].x - 1
        let n = snakeArr[l - 1].y
        snakeArr.push({ x: m, y: n })
    }
    if (snakeDirr[0].x == -1) {
        let l = snakeArr.length
        let m = snakeArr[l - 1].x + 1
        let n = snakeArr[l - 1].y
        snakeArr.push({ x: m, y: n })
    }
    if (snakeDirr[0].y == 1) {
        let l = snakeArr.length
        let m = snakeArr[l - 1].x
        let n = snakeArr[l - 1].y - 1
        snakeArr.push({ x: m, y: n })
    }
    if (snakeDirr[0].y == -1) {
        let l = snakeArr.length
        let m = snakeArr[l - 1].x
        let n = snakeArr[l - 1].y + 1
        snakeArr.push({ x: m, y: n })
    }

}

const collison = () => {
    if (snakeArr[0].x == foodArr[0].x && snakeArr[0].y == foodArr[0].y) {
        musicSound.pause();
        foodSound.play();
        ChangeFood()
        ChangeLength()
        scoreObject.your_score += 1
        score.innerHTML = scoreObject.your_score


    }
}



let end = document.getElementById("end")
const GameOver = () => {

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            musicSound.pause();
            gameOverSound.play();
           
            if (currScore > maxScore) {
                localStorage.setItem('maxScore', currScore)
                maxScore = currScore

            }
            gameBox.style.display = "none"
            end.append(SnakeImage)
        }
    }

}


window.addEventListener("keydown", function (e) {
    moveSound.play();
    // musicSound.pause();
    if(timeOut < 0){
    switch (e.key.toLowerCase()) {
        case "arrowdown":
            timeOut = 0.2;
            if (snakeDirr[0].x != -1) {
                snakeDirr[0].x = 1
                snakeDirr[0].y = 0

            }
            return
        case "arrowup":
            timeOut = 0.2;
            if (snakeDirr[0].x != 1) {
                snakeDirr[0].x = -1
                snakeDirr[0].y = 0

            }
            return
        case "arrowleft":
            timeOut = 0.2;
            if (snakeDirr[0].y != 1) {
                snakeDirr[0].y = -1
                snakeDirr[0].x = 0

            }
            return
        case "arrowright":
            timeOut = 0.2;
            if (snakeDirr[0].y != -1) {
                snakeDirr[0].y = 1
                snakeDirr[0].x = 0

                // collison()
            }
            return
    }
}
})
SnakePosition()

DisplayFood()
const gameloop = () => {
    if(timeOut > -0.4){
        timeOut -= 0.2
    }
    currScore = scoreObject.your_score
    ChangePosition()
    GameOver()
    maxscore1.innerHTML = maxScore
}