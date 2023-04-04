export const numberMin = 0;
export const numberMax = 35;
export const amountElement = 21;
const url = 'http://tt.centr-to.ru/frontend-2023.txt'
// const url = 'http://localhost:7000'
const time = 5
let counterAdd = time * amountElement - time

export const randomNumber = (min, max) =>{
	let rand = min + Math.random() * (max - min + 1);
	if(rand > numberMax) return String(numberMax)
  return rand.toFixed(1);
}

export let object = {
	semen: [],
	eva: [],
	tom: [],
	mark: [],
	ivan: [],
	olga:[]
}

const legendOneUser =(object)=>{
	for(let key in object){
		for(let i=0; i<amountElement;i++){
		 object[key].push(randomNumber(numberMin, numberMax))
		}
	}
}

legendOneUser(object)



const coordinates = ()=>{
	for(let key in object){
		let counter = 0
		for(let i=0; i<object[key].length;i++){
			let el = object[key][i]
			object[key][i] = {
				x: counter,
				y: el
			}
			counter = counter + time
		}
	}
}
coordinates()

function check(name, number){
			name[name.length-1] = ({
				x: counterAdd,
				y: number
			})
}

function identification(data){
	for(let i = 0; i<data.length;i++){
		let number = data[i].slice(data[i].indexOf(' ')+1, data[i].length)
		let name = data[i].slice(0, data[i].indexOf(' '))
		if(name == 'Семён'){
			let key = object.semen
			check(key, number)
		}
		if(name == 'Ева'){
			let key = object.eva
			check(key, number)
		}
		if(name == 'Том'){
			let key = object.tom
			check(key, number)
		}
		if(name == 'Марк'){
			let key = object.mark
			check(key, number)
		}
		if(name == 'Иван'){
			let key = object.ivan
			check(key, number)
		}
		if(name == 'Ольга'){
			let key = object.olga
			check(key, number)
		}
	}
}

function iteration(){
	counterAdd = counterAdd + 5
	for(let key in object){
		object[key].splice(0, 1)
		object[key].push({
			x: counterAdd,
			y: object[key][object[key].length-1].y
		})	
	}
}

export async function getRes(){
    let response = await fetch(url)
    let data = await response.text()
	data = data.split('\n')
	data = data.splice(0, data.length-1)
	iteration()
	identification(data)
	console.log(data)
	return true
}

