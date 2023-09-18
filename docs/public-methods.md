# Inpux `public methods`

#### `setOptions(options)` Changes the option values. Calling this function will also automatically format the inpux with the new value
```js
// Example of setOptions() usage

let myInput = new Inpux('input', { // Old options value
  type: "numeral",
  emptyToZero: true,
  max: 999999
});

myInput.setOptions({ // New options value
  type: "custom",
  blocks: [3, 3],
  contained: true
});
```
<br/>

#### `setInput(input)` Changes target inpux element, calling this function will also unformat and remove all event listeners from the old inpux and automatically format the new one
```js
// Example of setInput() usage

let secondInputID = "#secondInputID"
let secondInput = document.getElementById("#secondInputID");

let myInput = new Inpux('#firstInputID', {
  type: "numeral",
  emptyToZero: true,
  max: 999999
});

myInput.setInput(secondInputID);
// OR
myInput.setInput(secondInput);
```
<br/>

#### `val(formatted)` Get the inpux value. If you pass the parameter as true you will receive the formatted value, otherwise, you will receive the raw value
```js
// Example of val() usage
// Assume that the value is "1,234,567.90"
let myInput = new Inpux('input', { 
  type: "numeral",
  emptyToZero: true,
  max: 999999
});

console.log(myInput.val()) // 1234567.90 -> When the type is numeral, you will get the decimal delimiter
console.log(myInput.val(true)) // 1,234,567.90
```
<br/>

#### `groups()` Get an array of inpux values separated by delimiters
```js
// Example of groups() usage
// Assume that the value is "abc.def.ghi"
let myInput = new Inpux('input', { 
  type: "custom",
  delimiters: ["."]
});

console.log(myInput.groups()) // ["abc", "def", "ghi"]
```
<br/>

#### `destroy()` Unformat and remove all event listeners from your inpux
```js
// Example of destroy() usage
let myInput = new Inpux('input');
myInput.destroy();
```
Check [documentation](https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md) or [demo](https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md)  page
