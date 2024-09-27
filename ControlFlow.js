


// if condition
if (condition) {
    // code to execute if the condition is true
}

// if else
if (condition) {
    // code to execute if the condition is true
} else {
    // code to execute if the condition is false
}

// else if
if (condition1) {
    // code if condition1 is true
} else if (condition2) {
    // code if condition2 is true
} else {
    // code if both are false
}


// switch
switch (expression) {
    case value1:
        // code if expression === value1
        break;
    case value2:
        // code if expression === value2
        break;
    default:
    // code if none of the cases match
}


// for loop
for (initialization; condition; increment) {
    // code to be executed
}


// while loop
while (condition) {
    // code to be executed
}

// do while loop
do {
    // code to be executed
} while (condition);


// for in loop
for (key in object) {
    // code to execute for each property
}


// for of loop
for (element of iterable) {
    // code to execute for each element
}


// break
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // breaks the loop when i is 5
    }
}


// continue
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        continue; // skips the iteration when i is 5
    }
}

// return
function sum(a, b) {
    return a + b; // exits the function and returns the sum
}


// try catch
try {
    // code that may throw an error
} catch (error) {
    // code to handle the error
}


// finally
try {
    // code that may throw an error
} catch (error) {
    // code to handle the error
} finally {
    // code to execute no matter what
}


// throw
if (somethingWrong) {
    throw new Error('Something went wrong!');
}
