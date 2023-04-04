import './styles/global.scss';
import './styles/component/mixin.scss';
import './styles/component/header.scss';
import './styles/component/main.scss';

import { getRes, object } from './utils/randomArr';
import { LineChart, container } from './utils/lineChart';

const colorArr = ['red', 'blue', 'green', 'yellow', 'black', 'orange']
const nameArr = ['Семён', 'Ева', 'Том', 'Марк', 'Иван', 'Ольга']
const interpretation = document.querySelector('.interpretation')
let counter = 0

function explication() {
    for (let i = 0; i < nameArr.length; i++) {
        const div = document.createElement('div')
        div.classList.add('wrapp')
        div.innerHTML = `
        <h2>${nameArr[i]}</h2>
        <div class = "user" style = "background-color: ${colorArr[i]}"></div>
        `
        interpretation.append(div)
    }
}

explication()

for (let key in object) {
    let el = document.createElement('div')
    el.classList.add(`${key}`)
    el.setAttribute('id', 'all')
    container.append(el)
    let color = colorArr[counter]
    counter++
    const graph = new LineChart(object[key], el, color).create()
}

setInterval(() => { 
    const prom = new Promise((resolve, rej) => { 
        resolve(getRes())
    })

    prom.then(() => {
        const all = document.querySelectorAll('[id="all"]')
        all.forEach(el => el.remove())
        let counter = 0
        for (let key in object) {
            let el = document.createElement('div')
            el.classList.add(`${key}`)
            el.setAttribute('id', 'all')
            container.append(el)
            let color = colorArr[counter]
            counter++
            const graph = new LineChart(object[key], el, color).create()
        }
    })
}, 5000)

