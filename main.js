function Person(age) {
    this.age=age
}

Person.prototype.name = 'name1'

let person = new Person()
console.log(person.__proto__)
console.log(person.name)
Person.prototype = {name:'name2'}

console.log(person.__proto__)
console.log(person.name)

