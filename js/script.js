const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const buttonRestart = document.querySelector("[data-button-restart]")

let isCircleTurn;

// Armazenando as cominações dentro de uma variável
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 3, 6],
]

// Criando a função startGame
const startGame = () => {
        isCircleTurn = false

        // Criando o evento click
        for(const cell of cellElements) {
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    }

    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message")
}

// Criando a função endGame()
const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O venceu!" : "X venceu!"
    }

    winningMessage.classList.add("show-winning-message")
}

// Criando uma função que vai verificar por vitória
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

// Criando a função de empate
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    board.classList.remove("circle")
    board.classList.remove("x")

    if(isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

// Invertendo as jogadas
const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
}

// Criando a função handleClick()
const handleClick = (element)=> {

    // Colocar a marca (X ou Circle)
    const cell = element.target
    const classToAdd = isCircleTurn ? "circle" : "x"

    placeMark(cell, classToAdd)

    // Verificar por vitória
    const isWin = checkForWin(classToAdd)

    // Verificar por empate
    const isDraw = checkForDraw()

    if(isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    } else {
        // Mudar símbolo
        swapTurns()
    }
}

startGame()

// Restart Play

buttonRestart.addEventListener("click", startGame,)