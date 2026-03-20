# JavaScript Complete Learning Guide — Basics to Advanced

> A structured guide covering everything from variables to type conversion, with examples at every step.

---

## Table of Contents

1. [Variables & Data Types](#1-variables--data-types)
2. [Operators](#2-operators)
3. [Control Flow](#3-control-flow)
4. [Functions](#4-functions)
5. [Arrays](#5-arrays)
6. [Objects](#6-objects)
7. [Strings](#7-strings)
8. [Type Conversion & Coercion](#8-type-conversion--coercion)

---

## 1. Variables & Data Types

### How Memory Works

JavaScript stores values in two places:

- **Stack** — primitives are stored directly (fast, fixed-size)
- **Heap** — objects/arrays are stored here; the variable holds a *reference* (memory address) pointing to the actual data

### Primitive Types (7 total)

Primitives are immutable and stored by value. Copying one gives you an independent copy.

| Type | Example | Notes |
|------|---------|-------|
| `string` | `"hello"`, `'world'`, `` `template` `` | Text |
| `number` | `42`, `3.14`, `NaN`, `Infinity` | All numbers share one type |
| `boolean` | `true`, `false` | Used in conditions |
| `null` | `null` | Intentional absence of value |
| `undefined` | `undefined` | Variable declared but not assigned |
| `symbol` | `Symbol('id')` | Unique identifier (ES6+) |
| `bigint` | `9007199254740991n` | Integers beyond `Number.MAX_SAFE_INTEGER` |

```js
let a = 10;
let b = a;   // b gets a COPY of the value
b = 99;

console.log(a); // 10  ← unchanged
console.log(b); // 99
```

### Non-Primitive Types (Reference Types)

Non-primitives are objects under the hood. When you copy them, you copy the *reference*, not the data — both variables point to the same object in memory.

```js
const user1 = { name: "Ali" };
const user2 = user1;   // copies the REFERENCE, not the object

user2.name = "Sara";

console.log(user1.name); // "Sara" ← both variables affected!
console.log(user2.name); // "Sara"

// Fix: clone with spread
const user3 = { ...user1 }; // independent copy
```

| Type | Example |
|------|---------|
| `object` | `{ name: "Ali", age: 25 }` |
| `array` | `[1, 2, 3]` |
| `function` | `function greet() {}` or `() => {}` |

### `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block `{ }` | Block `{ }` |
| Hoisted | Yes (as `undefined`) | TDZ error | TDZ error |
| Re-declare | Yes | No | No |
| Reassign | Yes | Yes | No |
| Use today | Avoid | When value changes | Default choice |

```js
// Scope demonstration
if (true) {
  var x = 10;   // function-scoped — leaks OUT of the block
  let y = 20;   // block-scoped — stays INSIDE
  const z = 30; // block-scoped — stays INSIDE
}

console.log(x); // 10 ← var leaked
console.log(y); // ReferenceError
console.log(z); // ReferenceError
```

```js
// Hoisting
console.log(a); // undefined ← var is hoisted but not initialized
console.log(b); // ReferenceError (Temporal Dead Zone)

var a = 5;
let b = 10;
```

```js
// The const trap — objects can still be mutated
const user = { name: "Ali" };
user.name = "Sara";  // Works — changing a property
user = {};           // TypeError — can't reassign the reference

// To truly freeze an object:
const config = Object.freeze({ theme: "dark" });
config.theme = "light"; // silently ignored
```

### Key Rules

- Start with `const` by default
- Switch to `let` only when you need to reassign
- Never use `var` in modern JavaScript
- `null` = intentional empty; `undefined` = never assigned
- `typeof null` returns `"object"` — a historic JS bug; null is not actually an object

---

## 2. Operators

### Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition / Concatenation | `5 + 3` | `8` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `15 / 4` | `3.75` |
| `%` | Modulus (remainder) | `17 % 5` | `2` |
| `**` | Exponentiation | `2 ** 8` | `256` |
| `++` | Increment | `let x=5; x++` | `x` is `6` |
| `--` | Decrement | `let x=5; x--` | `x` is `4` |

> The `+` operator is overloaded: `"5" + 3` → `"53"` (string concatenation), but `"5" - 3` → `2` (numeric subtraction forces conversion).

### Comparison Operators

```js
// == (loose) applies type coercion — AVOID
5 == "5"     // true ← dangerous!
0 == false   // true ← dangerous!
null == undefined // true

// === (strict) — ALWAYS USE THIS
5 === "5"    // false
0 === false  // false
null === undefined // false
5 === 5      // true
```

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Loose equal (with coercion) | `5 == "5"` | `true` |
| `===` | Strict equal (no coercion) | `5 === "5"` | `false` |
| `!=` | Loose not equal | `5 != "5"` | `false` |
| `!==` | Strict not equal | `5 !== "5"` | `true` |
| `>` | Greater than | `10 > 5` | `true` |
| `<` | Less than | `3 < 8` | `true` |
| `>=` | Greater or equal | `5 >= 5` | `true` |
| `<=` | Less or equal | `4 <= 3` | `false` |

### Logical Operators

```js
// && (AND) — returns last truthy or first falsy value
"Ali" && "Sara"   // "Sara"
null && "Sara"    // null (stops at first falsy)

// || (OR) — returns first truthy value
null || "default" // "default"
0    || "fallback" // "fallback" (0 is falsy)

// ?? (Nullish Coalescing) — only triggers on null/undefined
0    ?? "fallback" // 0 (0 is NOT nullish)
null ?? "fallback" // "fallback"

// ! (NOT)
!true   // false
!!null  // false (double-not converts any value to boolean)
```

**Short-circuit patterns used in real code:**

```js
const name = user.name ?? "Guest";     // fallback if null/undefined only
const name = user.name || "Guest";     // fallback if any falsy value
user.isAdmin && showAdminPanel();       // run only if truthy
const port = process.env.PORT ?? 3000; // env var with safe default
```

### Assignment Operators

| Operator | Equivalent to | Example (x=10) | Result |
|----------|--------------|----------------|--------|
| `=` | Assign | `x = 5` | `x → 5` |
| `+=` | `x = x + n` | `x += 3` | `x → 13` |
| `-=` | `x = x - n` | `x -= 4` | `x → 6` |
| `*=` | `x = x * n` | `x *= 2` | `x → 20` |
| `/=` | `x = x / n` | `x /= 2` | `x → 5` |
| `%=` | `x = x % n` | `x %= 3` | `x → 1` |
| `**=` | `x = x ** n` | `x **= 2` | `x → 100` |
| `&&=` | `x && (x = n)` | `x &&= 99` | `x → 99` if truthy |
| `\|\|=` | `x \|\| (x = n)` | `x \|\|= 99` | `x` unchanged if truthy |
| `??=` | `x ?? (x = n)` | `x ??= 99` | `x` unchanged if not null |

### Ternary Operator

```js
condition ? valueIfTrue : valueIfFalse
```

```js
const age = 20;
const status = age >= 18 ? "adult" : "minor"; // "adult"

// In template literals
const label = `Hello, ${isLoggedIn ? name : "Guest"}!`;

// Nested (use sparingly)
const grade =
  score >= 90 ? "A" :
  score >= 70 ? "B" :
  score >= 50 ? "C" : "F";
```

### Operator Precedence

```js
2 + 3 * 4      // 14, not 20 — * before +
(2 + 3) * 4    // 20 — parentheses override

true || false && false  // true — && before ||
```

---

## 3. Control Flow

### `if / else if / else`

JavaScript checks conditions **top to bottom** and stops at the first `true`.

```js
function getGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 75) {
    return "B";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F";
  }
}
```

### `switch`

Cleaner than a long `if/else if` chain when comparing one variable against many exact values. Uses strict equality (`===`) internally. **Always add `break`** unless intentional fall-through.

```js
const day = "Monday";

switch (day) {
  case "Saturday":
  case "Sunday":              // fall-through: both share this result
    console.log("Weekend!");
    break;
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost there!");
    break;
  default:
    console.log("Midweek");
}
```

### `for` Loop

Total control: initialize a counter, set a condition, define the update.

```js
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
// i = 0, 1, 2, 3, 4  (stops when i < 5 is false)
```

The three parts: `init` (runs once) | `condition` (checked each time) | `update` (after each body).

### `while` Loop

Checks condition *before* each iteration. Never runs if condition is false from the start.

```js
let count = 3;

while (count > 0) {
  console.log(count); // 3, 2, 1
  count--;
}

// count starts at 0 → never runs at all
while (0 > 0) { /* ... */ }
```

### `do...while` Loop

Runs the body *first*, then checks. Guarantees at least one execution.

```js
let count = 0;

do {
  console.log(count); // runs ONCE even though 0 > 0 is false
  count--;
} while (count > 0);
```

### `for...in` — iterate object keys

```js
const user = { name: "Ali", age: 25, city: "Lahore" };

for (const key in user) {
  console.log(key);  // "name", "age", "city"
  console.log(user[key]); // "Ali", 25, "Lahore"
}
```

### `for...of` — iterate iterable values

```js
const scores = [80, 95, 72];

for (const score of scores) {
  console.log(score); // 80, 95, 72
}

// Also works on strings
for (const char of "JS!") {
  console.log(char); // "J", "S", "!"
}
```

### `break` and `continue`

```js
// break — exit the loop entirely
for (let i = 0; i < 10; i++) {
  if (i === 4) break;
  console.log(i); // 0, 1, 2, 3
}

// continue — skip this iteration
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i); // 1, 3, 5
}
```

### When to Use Which Loop

| Situation | Best choice |
|-----------|-------------|
| Known number of iterations | `for` |
| Unknown iterations, check first | `while` |
| Must run at least once | `do...while` |
| Iterating object properties | `for...in` |
| Iterating array/string values | `for...of` |
| Array: transform every item | `forEach` / `map` |

---

## 4. Functions

### Anatomy of a Function

Every function has four parts: **keyword** · **name** · **parameters (inputs)** · **return value (output)**.

### Function Declaration

Hoisted — you can call it before it's defined in the file.

```js
// This works even before the definition!
console.log(add(3, 4)); // 7

function add(a, b) {
  return a + b;
}

add(10, 5);   // 15
add(100, -3); // 97
```

### Function Expression

Assigned to a variable. **Not hoisted** — must be defined before calling.

```js
const multiply = function(a, b) {
  return a * b;
};

multiply(4, 6); // 24

// Named function expression — useful for recursion & stack traces
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

factorial(5); // 120
```

### Arrow Functions

Shorter syntax for function expressions. No own `this`, no `arguments` object, cannot be used as constructors.

```js
// Full syntax (with body block — explicit return required)
const greet = (name) => {
  const msg = `Hello, ${name}!`;
  return msg;
};

// Concise body — implicit return (no curly braces)
const greet = (name) => `Hello, ${name}!`;

// Single parameter — parens optional
const double = n => n * 2;

// Zero parameters — parens required
const getRandom = () => Math.random();

// Returning an object literal — wrap in parens!
const makeUser = (name, age) => ({ name, age });
// Without parens, {} looks like a code block

// Most common use — callbacks
const nums = [3, 1, 4, 1, 5, 9];
const doubled = nums.map(n => n * 2);
const evens   = nums.filter(n => n % 2 === 0);
const total   = nums.reduce((acc, n) => acc + n, 0);
```

**The `this` difference:**

```js
// Regular function — 'this' can be wrong
function Timer() {
  this.seconds = 0;
  setInterval(function() {
    this.seconds++; // 'this' refers to window/undefined, NOT Timer
  }, 1000);
}

// Arrow function — inherits 'this' from surrounding scope
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++; // correct — 'this' is Timer
  }, 1000);
}
```

### Parameters, Arguments & Default Values

```js
function createOrder(item, qty = 1, discount = 0) {
  const price = 50;
  const total = price * qty * (1 - discount);
  return `${qty}x ${item} = $${total}`;
}

createOrder("Book");          // qty=1, discount=0 (defaults)
createOrder("Book", 3);       // qty=3, discount=0
createOrder("Book", 3, 0.1);  // qty=3, discount=10%
```

**Rest parameters** — collect extra args into an array:

```js
function sum(label, ...numbers) {
  const total = numbers.reduce((acc, n) => acc + n, 0);
  return `${label}: ${total}`;
}

sum("Total", 1, 2, 3, 4); // "Total: 10"
```

### Return Values

```js
// Returns a value
function square(n) { return n * n; }

// Early return (guard clause)
function divide(a, b) {
  if (b === 0) return "error"; // exits immediately
  return a / b;
}

// No return → undefined
function log(msg) {
  console.log(msg);
  // implicit return undefined
}

// Return any type — including objects
function getStats(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  return {
    sum,
    avg: sum / nums.length,
    min: Math.min(...nums),
    max: Math.max(...nums),
  };
}
```

### The Three Syntaxes Side by Side

```js
// Declaration — hoisted, named
function square(n) { return n * n; }

// Expression — not hoisted, assigned to variable
const square = function(n) { return n * n; };

// Arrow — concise, no own `this`
const square = n => n * n;

// All three called identically:
square(5); // 25
```

---

## 5. Arrays

### Creation & Indexing

```js
const fruits = ["apple", "banana", "mango", "grape", "kiwi"];

fruits[0]              // "apple"  ← first element
fruits[2]              // "mango"
fruits[fruits.length - 1] // "kiwi" ← last element
fruits.at(-1)          // "kiwi"   ← ES2022 shorthand
fruits.at(-2)          // "grape"
```

Arrays are **zero-indexed** — the first item is always at index `0`. The `.at()` method accepts negative indices.

### Mutating Methods

These methods **change the original array** in place.

```js
const arr = ["apple", "banana", "mango"];

// Add/remove from end
arr.push("grape");    // adds to end → returns new length
arr.pop();            // removes from end → returns removed element

// Add/remove from front
arr.unshift("kiwi");  // adds to front → returns new length
arr.shift();          // removes from front → returns removed element

// Remove/replace at any position
arr.splice(1, 1);           // remove 1 element at index 1
arr.splice(1, 1, "lemon");  // replace 1 element at index 1 with "lemon"
arr.splice(1, 0, "peach");  // insert "peach" at index 1 (no removal)
```

### `map` — Transform Every Element

Returns a **new array** of the same length. The original is unchanged.

```js
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]
const strings = nums.map(n => `Item ${n}`); // ["Item 1", "Item 2", ...]
```

### `filter` — Keep Matching Elements

Returns a **new array** that may be shorter. Only items where the callback returns `true` are kept.

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = nums.filter(n => n % 2 === 0); // [2, 4, 6, 8]
const big   = nums.filter(n => n > 5);        // [6, 7, 8]
```

### `reduce` — Fold Into a Single Value

Collapses the entire array into one value (number, string, object, etc.).

```js
const nums = [10, 20, 30, 40];

const total = nums.reduce((acc, n) => acc + n, 0);
// Step by step:
// acc=0  + 10 → acc=10
// acc=10 + 20 → acc=30
// acc=30 + 30 → acc=60
// acc=60 + 40 → acc=100

const max = nums.reduce((acc, n) => n > acc ? n : acc, -Infinity); // 40
```

### Other Essential Methods

```js
const arr = ["apple", "banana", "mango", "grape", "kiwi"];

// Finding
arr.find(f => f.length > 5)       // "banana" (first match)
arr.findIndex(f => f === "mango") // 2
arr.includes("banana")            // true
arr.indexOf("grape")              // 3  (-1 if not found)

// Checking all/some
arr.some(f => f.length > 6)  // true (at least one)
arr.every(f => f.length > 3) // true (all of them)

// Extracting
arr.slice(1, 3)  // ["banana", "mango"] (non-mutating)
arr.slice(-2)    // ["kiwi", "lemon"]

// Sorting (mutates — sort a copy!)
[...arr].sort()                    // alphabetical
[10, 2, 9].sort((a, b) => a - b)  // numeric ascending

// Joining / converting
arr.join(", ")         // "apple, banana, mango, grape, kiwi"
arr.join(" | ")

// Flattening
[[1, 2], [3, [4, 5]]].flat()    // [1, 2, 3, [4, 5]]
[[1, 2], [3, [4, 5]]].flat(2)   // [1, 2, 3, 4, 5]

// Combining
arr.concat(["lemon", "peach"]) // new array, non-mutating
```

### Method Chaining — The Pipeline Pattern

```js
const products = [
  { name: "laptop",   price: 1200, inStock: true  },
  { name: "mouse",    price: 25,   inStock: true  },
  { name: "monitor",  price: 800,  inStock: false },
  { name: "keyboard", price: 120,  inStock: true  },
];

const result = products
  .filter(p => p.inStock)             // keep only in-stock
  .map(p => p.name.toUpperCase())     // extract + uppercase names
  .sort();                            // alphabetical order
// ["KEYBOARD", "LAPTOP", "MOUSE"]
```

### Iteration

```js
const nums = [1, 2, 3];

// forEach — side effects, no return value
nums.forEach((n, index) => console.log(`${index}: ${n}`));

// for...of — works with any iterable
for (const n of nums) {
  console.log(n);
}

// Classic for loop — when you need the index
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
```

---

## 6. Objects

### What is an Object?

An unordered collection of **key-value pairs** called properties. Properties whose values are functions are called **methods**.

```js
const user = {
  name: "Ali",               // string property
  age: 25,                   // number property
  greet() {                  // method
    return `Hi, I'm ${this.name}!`;
  },
  address: { city: "Lahore" } // nested object
};
```

### Creation: 3 Ways

```js
// 1. Object literal (most common)
const user = {
  name: "Ali",
  age: 25,
  greet() { return `Hi, I'm ${this.name}!`; }
};

// 2. Factory function
function createUser(name, age) {
  return {
    name,    // shorthand for name: name
    age,
    greet() { return `Hi, I'm ${this.name}!`; }
  };
}
const ali  = createUser("Ali", 25);
const sara = createUser("Sara", 30);

// 3. Class (ES6+)
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() { return `Hi, I'm ${this.name}!`; }
}
const ali = new User("Ali", 25);
```

### Dot Notation vs Bracket Notation

```js
const user = { name: "Ali", age: 25 };

// Dot notation — clean, preferred when key is a valid identifier
user.name          // "Ali"
user.age           // 25
user.name = "Sara" // write
user.email = "a@b.c" // add new property
delete user.age    // remove property

// Fails for special keys:
user.first-name    // SyntaxError
user.1stProp       // SyntaxError

// Bracket notation — required for special/dynamic keys
user["name"]       // "Ali"
user["first-name"] // works!
user["1stProp"]    // works!

const key = "name";
user[key]          // "Ali" — dynamic key lookup
```

### Object Methods & `this`

```js
const player = {
  name: "Ali",
  score: 0,
  level: 1,

  addPoints(pts) {
    this.score += pts;  // 'this' refers to the player object
    return `+${pts} points! Total: ${this.score}`;
  },
  levelUp() {
    this.level++;
    this.score = 0;
    return `Level up! Now level ${this.level}`;
  }
};

player.addPoints(10); // "+10 points! Total: 10"
player.levelUp();     // "Level up! Now level 2"
```

> **Warning:** Arrow functions as methods break `this`. Always use regular function syntax for object methods.

### Destructuring

```js
const user = { name: "Ali", age: 25, city: "Lahore" };

// Basic destructuring
const { name, age } = user;
// same as: const name = user.name; const age = user.age;

// Rename while destructuring
const { name: fullName, age: years } = user;

// Default values
const config = { theme: "dark" };
const { theme, lang = "en", size = 14 } = config;

// Nested destructuring
const user2 = { name: "Ali", address: { city: "Lahore", zip: "54000" } };
const { name, address: { city, zip } } = user2;
// 'address' itself is NOT extracted as a variable

// Destructuring in function parameters
function greet({ name, age = 0, city = "Unknown" }) {
  return `${name}, ${age}, from ${city}`;
}
greet({ name: "Ali", age: 25 }); // "Ali, 25, from Unknown"

// Rest in destructuring
const { name, ...rest } = user;
// name = "Ali"
// rest = { age: 25, city: "Lahore" }
```

### Spread Operator

```js
const base    = { name: "Ali", age: 25, role: "user" };
const updates = { age: 26, city: "Lahore" };

// Shallow clone
const clone   = { ...base };

// Merge — later keys override earlier ones
const merged  = { ...base, ...updates };
// { name:"Ali", age:26, role:"user", city:"Lahore" }

// Override a single field
const promoted = { ...base, role: "admin" };

// Add a new field
const withEmail = { ...base, email: "ali@example.com" };
```

> **Note:** Spread is a *shallow* copy — nested objects are still references. For deep cloning use `structuredClone(obj)`.
>
> **Order matters:** `{ ...base, role: "admin" }` promotes to admin. But `{ role: "admin", ...base }` gives you "user" because `base.role` overwrites it.

### `Object.keys`, `Object.values`, `Object.entries`

```js
const scores = { ali: 92, sara: 87, umar: 78 };

Object.keys(scores)    // ["ali", "sara", "umar"]
Object.values(scores)  // [92, 87, 78]
Object.entries(scores) // [["ali", 92], ["sara", 87], ["umar", 78]]

// Practical uses
const avg = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

Object.entries(scores).forEach(([name, score]) => {
  console.log(`${name}: ${score}`);
});

// Convert back from entries
const doubled = Object.fromEntries(
  Object.entries(scores).map(([k, v]) => [k, v * 2])
);
// { ali: 184, sara: 174, umar: 156 }
```

---

## 7. Strings

### Creation & the Three Quote Styles

```js
// Single quotes — most common in JS
const a = 'hello';
const b = 'say "hi"'; // can embed double quotes

// Double quotes — functionally identical
const c = "hello";
const d = "it's fine"; // can embed single quotes

// Template literals — preferred for modern JS
const name = "Ali";
const msg = `Hi ${name}!`; // supports expressions and line breaks
```

Strings are **zero-indexed** and **immutable**. You cannot change individual characters. All string methods return a new string.

```js
const str = "JavaScript";
str[0]     // "J"
str.length // 10
str.at(-1) // "t" (last character)

str[0] = "X"; // silently does nothing — immutable!
```

### Template Literals

```js
const name = "Ali";
const score = 78;
const grade = score >= 75 ? "B" : "C";

// Embed any expression inside ${}
`Hello, ${name}! Score: ${score} = grade ${grade}`
// "Hello, Ali! Score: 78 = grade B"

// Multi-line (no \n needed)
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Score: ${score}/100</p>
    <p>${score >= 50 ? 'PASS' : 'FAIL'}</p>
  </div>
`;

// Expressions work — math, ternary, method calls
`Sum: ${5 + 3}`           // "Sum: 8"
`Upper: ${"hello".toUpperCase()}` // "Upper: HELLO"
```

### `slice` — Extract a Substring

```js
const str = "JavaScript is awesome!";

str.slice(0, 10)  // "JavaScript"
str.slice(11)     // "is awesome!"
str.slice(-8)     // "awesome!"
str.slice(3, 7)   // "aScrip"

// Pattern: slice(start, end) — end is EXCLUSIVE
```

### `indexOf` and `lastIndexOf`

```js
const str = "JavaScript is awesome!";

str.indexOf("a")        // 1  ← first occurrence
str.indexOf("Script")   // 4
str.indexOf("xyz")      // -1 (not found)
str.lastIndexOf("a")    // last occurrence of "a"

// Classic pattern
if (str.indexOf("Java") !== -1) { /* found */ }
// or cleaner:
if (str.includes("Java")) { /* found */ }
```

### `includes`, `startsWith`, `endsWith`

```js
const str = "JavaScript is awesome!";

str.includes("Java")      // true
str.includes("Python")    // false
str.startsWith("Java")    // true
str.endsWith("!")         // true
str.startsWith("Script")  // false
```

### `split` and `join`

```js
const str = "JavaScript is awesome!";

str.split(" ")          // ["JavaScript", "is", "awesome!"]
str.split("")           // individual characters
str.split("a")          // split on every "a"

// split + join to transform
str.split(" ").join("-") // "JavaScript-is-awesome!"

// Reverse a string
str.split("").reverse().join("") // "!emosewa si tpircSavaJ"
```

### `replace` and `replaceAll`

```js
const str = "JavaScript is awesome!";

str.replace("awesome", "amazing")   // "JavaScript is amazing!"
str.replace(/a/g, "@")              // replace ALL with /g flag
str.replaceAll("a", "@")            // ES2021 — same as /a/g
str.replace(/[aeiou]/gi, "*")       // regex: replace all vowels
```

### Case Methods

```js
const str = "JavaScript is awesome!";

str.toUpperCase() // "JAVASCRIPT IS AWESOME!"
str.toLowerCase() // "javascript is awesome!"
```

### `trim`, `trimStart`, `trimEnd`

```js
const raw = "  hello world  ";

raw.trim()       // "hello world"
raw.trimStart()  // "hello world  "
raw.trimEnd()    // "  hello world"

// Common use: sanitize user input
const email = userInput.trim().toLowerCase();
```

### `padStart` and `padEnd`

```js
"5".padStart(3, "0")    // "005"
"42".padStart(5)        // "   42" (default: space)
"hi".padEnd(6, ".")     // "hi...."

// Useful for formatting IDs, numbers, tables
const id = String(userId).padStart(6, "0"); // "000042"
```

### `repeat`

```js
"ha".repeat(3)   // "hahaha"
"-".repeat(20)   // "--------------------"
"ab".repeat(0)   // ""
```

### Escape Sequences

| Sequence | Meaning |
|----------|---------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |
| `` \` `` | Backtick |
| `\u0041` | Unicode: "A" |

---

## 8. Type Conversion & Coercion

### The Core Distinction

- **Implicit coercion** — JavaScript converts types automatically (can surprise you)
- **Explicit conversion** — you convert deliberately (always prefer this)

### Implicit Coercion — The `+` Operator Trap

The `+` operator does two completely different things depending on types:

```js
// String + anything = string concatenation
"5" + 3          // "53"  ← NOT 8!
"10" + "5"       // "105" ← NOT 15!
"Sum: " + 42     // "Sum: 42"

// Other arithmetic operators always force numeric
"5" - 3          // 2    (coerces "5" to 5)
"6" * "2"        // 12   (both coerced)
"10" / "2"       // 5

// Booleans in arithmetic
true + true      // 2    (true → 1)
true + false     // 1
false + 1        // 1

// Surprising results
null + 1         // 1    (null → 0)
undefined + 1    // NaN  (undefined → NaN)
[] + {}          // "[object Object]"
```

### Truthy and Falsy — Boolean Coercion

Every value has an inherent boolean meaning. There are only **6 falsy values**:

| Falsy value | Notes |
|-------------|-------|
| `false` | The boolean |
| `0` | Zero (also `-0`) |
| `""` | Empty string |
| `null` | Intentional empty |
| `undefined` | Not assigned |
| `NaN` | Not a number |

**Everything else is truthy**, including these surprises:

```js
Boolean("0")     // true  ← "0" is a non-empty string!
Boolean("false") // true  ← also a non-empty string
Boolean([])      // true  ← empty array
Boolean({})      // true  ← empty object
Boolean(-1)      // true
Boolean(Infinity)// true
```

```js
// Truthy/falsy in practice
if (username) { /* only if not "", null, undefined */ }
if (items.length) { /* only if array is not empty */ }
if (!value) { /* if value is falsy */ }
```

### Explicit Conversion — To Number

```js
Number("42")        // 42
Number("3.14")      // 3.14
Number("")          // 0
Number(true)        // 1
Number(false)       // 0
Number(null)        // 0
Number(undefined)   // NaN
Number("abc")       // NaN
Number([1])         // 1
Number([1, 2])      // NaN

// parseInt — stops at non-numeric character
parseInt("42px")    // 42
parseInt("abc")     // NaN
parseInt("0xFF", 16)// 255 (hex)

// parseFloat — for decimals
parseFloat("3.14em") // 3.14

// Unary + — quick conversion
+"99"               // 99
+true               // 1
+""                 // 0
+null               // 0
```

### Explicit Conversion — To String

```js
String(42)          // "42"
String(3.14)        // "3.14"
String(true)        // "true"
String(false)       // "false"
String(null)        // "null"
String(undefined)   // "undefined"
String(NaN)         // "NaN"

// .toString() method
(42).toString()     // "42"
(255).toString(16)  // "ff" (hex)
(10).toString(2)    // "1010" (binary)

// Template literal (cleanest)
`${42}`             // "42"
`${null}`           // "null"
```

### Explicit Conversion — To Boolean

```js
Boolean(1)         // true
Boolean(0)         // false
Boolean("hi")      // true
Boolean("")        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean({})        // true
Boolean([])        // true
Boolean(NaN)       // false

// Double-not !! — common shorthand
!!1       // true
!!0       // false
!!"hello" // true
!!null    // false
!![]      // true
```

### Loose `==` vs Strict `===`

The `==` operator applies complex coercion rules before comparing. This is why `===` is always preferred.

```js
// == surprises (AVOID)
0 == false     // true ← coercion!
1 == true      // true
"" == false    // true
"0" == false   // true
null == undefined // true
[] == false    // true
"5" == 5       // true

// === strict (USE THIS)
0 === false    // false
1 === true     // false
null === undefined // false
"5" === 5      // false
5 === 5        // true
```

> The only legitimate use of `==`: checking for both `null` and `undefined` at once: `if (value == null)`.

### `typeof` and `Number.isNaN`

```js
// typeof — check type at runtime
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object"  ← historic bug, not actually an object
typeof {}           // "object"
typeof []           // "object"  ← arrays are objects
typeof function(){} // "function"

// Correct null check:
value === null        // the only reliable way

// null OR undefined check:
value == null         // true for both null and undefined

// NaN checks
isNaN("hello")         // true (coerces first — misleading!)
Number.isNaN("hello")  // false (strict — only true NaN values)
Number.isNaN(NaN)      // true ← the correct way

// Safe conversion pattern
const input = "42px";
const num = Number(input);
if (Number.isNaN(num)) {
  console.log("Invalid number");
} else {
  console.log(num);
}
```

### Key Rules Summary

| Goal | Do this |
|------|---------|
| Convert to number | `Number(x)` or `+x` |
| Parse number from string prefix | `parseInt(x)` or `parseFloat(x)` |
| Convert to string | `String(x)` or `` `${x}` `` |
| Convert to boolean | `Boolean(x)` or `!!x` |
| Check for NaN | `Number.isNaN(x)` |
| Check for null | `x === null` |
| Check for null or undefined | `x == null` |
| Equality check | Always use `===` |

---

## What's Next

You've covered the full beginner-to-intermediate JavaScript foundations. The next topics in the roadmap are:

- **Scope & Closures** — how variables are accessed across nested functions
- **Hoisting** — what actually happens at runtime
- **The `this` keyword** — in depth, across all contexts
- **Prototype chain** — how JavaScript inheritance works
- **ES6 Classes** — OOP-style blueprints
- **Error handling** — `try/catch/finally` and custom errors
- **Asynchronous JS** — callbacks, Promises, and `async/await`

---

*Generated from the JavaScript Learning Roadmap conversation — Claude Sonnet 4.6*
