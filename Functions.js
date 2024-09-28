/*
 * Functions
 */

// function declaration
function functionName(parameters) {
    console.log(parameters)
}

// function expression
const functionExpression = function (parameters) {
    console.log(parameters)
}

// arrow functions
const arrowFunctions = () => {
    console.log('do something here')
}

// IIFE (Immediately Invoked Function Expression) functions
(function () {
    console.log('function running immediately')
})();


// high order functions
function calculate(operation, a, b) {
    return operation(a, b)
}

console.log(calculate((a, b) => a + b, 3, 2))

// Methods
const Person = {
    name: 'username', age: 0, greet: function () {
        console.log(`hi my name is ${this.name} and age is ${this.age}`)
    }
}

console.log(Person.greet());

// Default Parameters
function greet(name = 'user') {
    console.log(`hi, ${name}`)
}


// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0)
}