const display = document.querySelector('#display')
const items = document.querySelectorAll('.item')
const nums = document.querySelectorAll('.num')
const ops = document.querySelectorAll('.ops')
const acts = document.querySelectorAll('.act')
const equals = document.querySelector('#equals')

function updateDisplay(e) {
    let len = display.value.length
    const button = e.target

    if (button.value === "=") {
        display.value = Number(eval(display.value).toFixed(2))
        return
    }

    const isNumber = button.classList.contains('num')

    if (display.value === '' && !isNumber) return

    if (len > 0 && button.classList.contains('ops') && isNaN(parseInt(display.value[len - 1]))) return

    if (button.value === "-/+" && !isNaN(parseInt(display.value))) {
        display.value *= -1
        return
    }

    display.value += button.value
}

function action(e) {
    const button = e.target

    if (button.value === "del") {
        display.value = display.value.toString().slice(0, -1)
    } else if (button.value ==="CE" || button.value === "C") {
        display.value = ''
    }
    
}

function displayResult() {
    const expression = display.value
    if (expression.length < 3) return
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

    const operators = []
    const operands = []

    let currentNumber = ''
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]

        if (/[+\-*/]/.test(char)) {
            if (currentNumber !== '') {
                operands.push(parseFloat(currentNumber));
                currentNumber = ''
            }

            while (
                operators.length > 0 &&
                precedence[operators[operators.length - 1]] >= precedence[char]
            ) {
                const operator = operators.pop()
                const right = operands.pop()
                const left = operands.pop()
                operands.push(calculate(left, operator, right))
            }
            
            operators.push(char)
        } else {
            currentNumber += char
        }
    }

    if (currentNumber !== '') {
        operands.push(parseFloat(currentNumber))
    }

    while (operators.length > 0) {
        const operator = operators.pop()
        const right = operands.pop()
        const left = operands.pop()
        operands.push(calculate(left, operator, right))
    }

    if (operands.length === 1) {
        display.value = operands[0]
    } else {
        display.value = "ERROR"
    }
}

function calculate(firstOperand, operator, secondOperand) {
    let result = null

    if (operator === "+") {
        result = parseFloat(firstOperand) + parseFloat(secondOperand)
    } else if (operator === "-") {
        result = parseFloat(firstOperand) - parseFloat(secondOperand)
    } else if (operator === "*") {
        result = parseFloat(firstOperand) * parseFloat(secondOperand)
    } else if (operator === "/") {
        if (secondOperand === 0) {
            alert('Division by zero is not allowed.')
            return
        }
        result = parseFloat(firstOperand) / parseFloat(secondOperand)
    }
    const remainder = result.toString().split('.')[1]

    if (result.toString().includes('.') && remainder.length > 10) {
        return parseFloat(result).toFixed(10)
    }
    return result
}

function pressed(e) {
    e.target.classList.toggle('depresso')
}

function events() {
    items.forEach(item => {
        item.addEventListener('mousedown', pressed)
        item.addEventListener('mouseup', pressed)
    })
    nums.forEach(num => {
        num.addEventListener('click', updateDisplay)
    })
    ops.forEach(op => {
        if (op.value != "=") op.addEventListener('click', updateDisplay)
    })
    acts.forEach(act => {
        act.addEventListener('click', action)
    })
    equals.addEventListener('click', displayResult)

}

addEventListener('load', events)
