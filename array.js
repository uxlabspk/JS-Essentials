let arr = [1, 2, 3, 4, 5];

// 1. push(): Adds element to the end of the array
arr.push(6);
console.log("push:", arr);  // [1, 2, 3, 4, 5, 6]

// 2. pop(): Removes the last element
let popped = arr.pop();
console.log("pop:", arr);   // [1, 2, 3, 4, 5]
console.log("popped element:", popped);  // 6

// 3. shift(): Removes the first element
let shifted = arr.shift();
console.log("shift:", arr);   // [2, 3, 4, 5]
console.log("shifted element:", shifted);  // 1

// 4. unshift(): Adds element to the beginning of the array
arr.unshift(0);
console.log("unshift:", arr);  // [0, 2, 3, 4, 5]

// 5. map(): Multiply each element by 2
let mappedArr = arr.map(x => x * 2);
console.log("map:", mappedArr);  // [0, 4, 6, 8, 10]

// 6. filter(): Keep only even numbers
let filteredArr = arr.filter(x => x % 2 === 0);
console.log("filter:", filteredArr);  // [0, 2, 4]

// 7. reduce(): Sum all the elements
let sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log("reduce:", sum);  // 14

// 8. slice(): Extract a portion of the array (from index 1 to 3)
let slicedArr = arr.slice(1, 3);
console.log("slice:", slicedArr);  // [2, 3]

// 9. splice(): Remove 1 element at index 2, and insert 99
arr.splice(2, 1, 99);
console.log("splice:", arr);  // [0, 2, 99, 4, 5]
