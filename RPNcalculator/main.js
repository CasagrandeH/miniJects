const display = document.querySelector('#display')
const items = document.querySelectorAll('.item')
const nums = document.querySelectorAll('.num')
const ops = document.querySelectorAll('.ops')
const acts = document.querySelectorAll('.act')
const equals = document.querySelector('#equals')

function updateDisplay(e) {
    let len = display.value.length
    const button = e.target

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

    let postfix = infixToPostfix(expression)
    const stack = []

    for (let token of postfix) {

        if (!isNaN(token)) {
            stack.push(parseFloat(token))
        } else {
            const b = stack.pop() 
            const a = stack.pop()
            stack.push(calculate(a, token, b))
        }

    }

    display.value = stack[0]
}

function infixToPostfix(exp) {
    const expression = exp
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 }

    const output = []
    const operators = []

    let i = 0
    while (i < expression.length) {
        const char = expression[i]
        // Check if first number is negative, no need to check if 2nd 3rd and so forth
        // are negatives because the calculator does not handle parenthesis,
        // so its not possible to work with negative nums other than in the first
        //operation of the expression.
        if (char === "-" && i === 0) {
            let num = char
            let nextChar = expression[i + 1]
            while (
                i < expression.length - 1 &&
                (!isNaN(nextChar) || nextChar === ".")
            ) {
                num += nextChar
                i++
                nextChar = expression[i + 1]
            }

            output.push(num)
        } else if (/[+\-*/]/.test(char)) {
            while (
                operators.length > 0 &&
                precedence[char] <= precedence[operators[operators.length - 1]]
            ) {
                output.push(operators.pop())
            }
            operators.push(char)
        } else if (!isNaN(char) || char === ".") {
            let num = char
            let isDecimal = char === "."

            while (
                i < expression.length - 1 &&
                (!isNaN(expression[i + 1]) || (!isDecimal && expression[i + 1] === "."))
            ) {
                num += expression[i + 1]
                if (expression[i + 1] === ".") {
                    isDecimal = true;
                }
                i++
            }
            output.push(num)
        }
        i++
    }

    while (operators.length > 0) {
        output.push(operators.pop())
    }

    return output
}


function calculate(firstOperand, operator, secondOperand) {
    let result = ''

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
