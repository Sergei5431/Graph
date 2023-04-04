import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 7000;

app.use(cors())

app.listen(PORT, () => {
    console.log("server started 7000 " + PORT)
})

const arr = ['Семён', 'Ева', 'Том', 'Марк', 'Иван', 'Ольга']
const min = 0;
const max = arr.length-1
const minNumber = 0
const maxNumber = 35

let userArr = []
let numberArr = []
let stringFinish = ''

function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1)) ;
}

const randomNumber = (min, max) =>{
	let rand = min + Math.random() * (max - min + 1);
	if(rand > max) return String(max)
  return rand.toFixed(1);
}



function userPush(){
     const user = random(min, max)
           if(!(userArr.includes(user))){
            userArr.push(user)
            return
        }
            userPush()        
}

function numberPush(name){
    const number = randomNumber(minNumber, maxNumber)
        if(!(numberArr.includes(number))){
            numberArr.push(number)
            return
        }
        numberPush()
}

const amount = ()=>{
    userArr = []
    numberArr = []
    stringFinish = ''
    const name = random(min+2, max)
    for(let i=0; i < name ; i++){
        userPush(name)
    }
    for(let i=0; i < name ; i++){
        numberPush()
    }
  
    for(let i=0; i < name; i++){
        stringFinish = stringFinish + `${arr[userArr[i]]} ${numberArr[i]}\n`
    }
    return stringFinish
}

app.get('/', cors(), (req, res)=>{

    res.send(amount())
    if (res.status(500)){
amount()
    }
})