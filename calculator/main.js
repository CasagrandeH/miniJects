const display = document.querySelector('#display')
const nums = document.querySelectorAll('.num')
const ops = document.querySelectorAll('.ops')
const acts = document.querySelectorAll('.act')

function calcDisplay(e) {
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

nums.forEach(num => {
    num.addEventListener('click', calcDisplay)
})
ops.forEach(op => {
    op.addEventListener('click', calcDisplay)
})
acts.forEach(act => {
    act.addEventListener('click', action)
})
