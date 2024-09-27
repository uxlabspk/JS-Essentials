


// function declaration
function functionName(parameters) {
    // code to be executed
}


// Function Expression
const functionName = function(parameters) {
    // code to be executed
};

// Arrow Functions
const functionName = (parameters) => {
    // code to be executed
};


// Anonymous Functions
setTimeout(function() {
    console.log('This runs after 2 seconds.');
}, 2000);


// Immediately Invoked Function Expression (IIFE)
(function() {
    console.log('This function runs immediately.');
})();


// Higher-Order Functions
function doMath(operation, a, b) {
    return operation(a, b);
}

const add = (a, b) => a + b;
console.log(doMath(add, 5, 3));  // Output: 8

// Functions as Methods
const person = {
    name: 'Alice',
    greet: function() {
        return `Hello, my name is ${this.name}.`;
    }
};

console.log(person.greet());  // Output: Hello, my name is Alice.


// Default Parameters
function greet(name = 'stranger') {
    return `Hello, ${name}!`;
}

console.log(greet());  // Output: Hello, stranger!
console.log(greet('Alice'));  // Output: Hello, Alice!


// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4));  // Output: 10


// Callback Functions
function fetchData(callback) {
    setTimeout(() => {
        const data = 'Data received!';
        callback(data);
    }, 1000);
}

fetchData(function(result) {
    console.log(result);  // Output after 1 second: Data received!
});







