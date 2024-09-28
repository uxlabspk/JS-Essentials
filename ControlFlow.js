
/*
 * Control Flows includes:
 * if, if-else, else-if, switch, for, for-in, for-of, while, do-while loops, break, continue, return, try-catch, try-catch-finally and throw.
 */


let temperature = 27;

// if statement
if (temperature > 30)
    console.log('it is hot today')

// if-else statement
if (temperature > 30)
    console.log('it is hot today')
else
    console.log('it is cold today')

// else-if
if (temperature > 30)
    console.log('it is hot today')
else if(temperature > 20)
    console.log('it is normal today')
else
    console.log('it is cold today')

// switch statement
switch(temperature) {
    case 10:
        console.log('temperature is 10');
        break
    case 20:
        console.log('temperature us 20')
        break
    default:
        console.log('invalid temperature value')
}


// for loop
for (let i = 0; i < 6; i++) {
    console.log(`The value of i is : ${i}`)
}

let employee = {
    name: 'name',
    age: 21
}

// for in loop
for (const employeeKey in employee) {
    console.log(employeeKey)
}

let arr = ['car', 'bike']

// for of loop
for (const elements of arr) {
    console.log(elements)
}

let count = 0

// while loop
while (count < 5) {
    console.log(`value of count is ${count++}`)
}

count = 0
// do while loop
do {
    console.log(`value of count in do while loop ${count++}`)
} while (count < 5)

// Jump statements: break and continue
for (let i = 0; i < 5; i++) {
    if (i == 3)
        break
    console.log(`The value of i ${i} break at 3`)
}

for (let i = 0; i < 5; i++) {
    if (i == 3)
        continue
    console.log(`The value of i ${i} continue at 3`)
}

// return
function printNumbers() {
    let number = 0
    while (number <= 10) {
        console.log(`The value of number is ${number}`)
        number++

        if (number == 4)
            return
    }
}

// try-catch
try {
    console.log('try to run code block')
} catch (e) {
    console.log(`error is ${e.message}`)
}

// try-catch finally (try with resource)
try {
    console.log('trying code here')
} catch (e) {
    console.log(`catching error ${e.message}`)
} finally {
    console.log('I will always printed')
}

// throw
if (typeof count != "number") {
    throw new Error('NaN')
}
