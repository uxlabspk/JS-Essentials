


// Global Scope
let globalVar = "I am global!";

function printGlobalVar() {
    console.log(globalVar);  // Accessible here
}

printGlobalVar();  // Output: I am global!

// Function Scope
function myFunction() {
    let functionVar = "I am local to this function!";
    console.log(functionVar);  // Accessible here
}

myFunction();
// console.log(functionVar);  // Uncaught ReferenceError: functionVar is not defined


// Block Scope (ES6)
if (true) {
    let blockScopedVar = "I am block-scoped!";
    console.log(blockScopedVar);  // Accessible here
}

// console.log(blockScopedVar);  // Uncaught ReferenceError: blockScopedVar is not defined


// Hoisting
console.log(x);  // Output: undefined (due to hoisting)
var x = 5;

console.log(y);  // Output: ReferenceError (let is not hoisted like var)
let y = 10;


// Lexical Scope
let outerVar = "Outer";

function outerFunction() {
    let innerVar = "Inner";

    function innerFunction() {
        console.log(outerVar);  // Can access outer variables
        console.log(innerVar);  // Can access variables in the same scope
    }

    innerFunction();
}

outerFunction();
// innerFunction();  // Uncaught ReferenceError: innerFunction is not defined


// Closures in JavaScript
function outer() {
    let outerVar = "I am from the outer scope";

    return function inner() {
        console.log(outerVar);  // Can access the outerVar even after outer has returned
    };
}

const closureFunction = outer();
closureFunction();  // Output: I am from the outer scope


// More Practical Closure Example:
function counter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const increment = counter();
console.log(increment());  // Output: 1
console.log(increment());  // Output: 2
console.log(increment());  // Output: 3


// Closures in Loops (Common Pitfall and Fix)
// The Pitfall with var:
for (var i = 1;     i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // Output: 4, 4, 4 (due to `var` being function-scoped)
    }, 1000);
}


// Fix with let:
for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);  // Output: 1, 2, 3 (due to `let` being block-scoped)
    }, 1000);
}
