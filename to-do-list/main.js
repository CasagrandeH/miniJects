const toDo = document.querySelector('.to-do .items')
const isDone = document.querySelector('.is-done .items')

function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function treatItems() {
    const task = document.querySelector('#task').value
    
    if (task.trim() !== '') {
        const listed = novoElemento('li', 'item')
        const btnClear = novoElemento('button', 'done')
        btnClear.classList.add('btns')
        const btnDel = novoElemento('button', 'del')
        btnDel.classList.add('btns')

        btnClear.innerHTML = '&#10004;'
        btnDel.innerHTML = '&#10060;'

        const items = document.querySelectorAll('.item')
        listed.innerHTML += `${items.length + 1}- ${task}`

        toDo.appendChild(listed)
        listed.appendChild(btnClear)
        listed.appendChild(btnDel)

        indexCorreto()
    }
    indexCorreto()
}

function indexCorreto() {
    const items = document.querySelectorAll('.item')
    items.forEach((item, i) => {
        item.innerHTML = `${i + 1}- ${item.innerHTML.split('-')[1]}`
    })
}

function removeItem(e) {
    if (e.target.classList.contains('del')) {
        const parent = e.target.parentElement
        parent.remove()
        indexCorreto()
    }
    
}

function setAsDone(e) {
    if (e.target.classList.contains('done')) {
        const item = e.target.parentElement
        item.removeChild(e.target)
        toDo.removeChild(item)
        isDone.appendChild(item)
    }
    
}

function events() {
    const btn = document.querySelector('[leButton]')

    btn.addEventListener('click', treatItems)
    toDo.addEventListener('click', removeItem)
    toDo.addEventListener('click', setAsDone)
    isDone.addEventListener('click', removeItem)
}

addEventListener('load', events)
