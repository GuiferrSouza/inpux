# Inpux `options`
> [!NOTE]
> Note that each formatting type has its own options and if you set an option not available for that type, it will be ignored.

<br/>

 - General
   - [type](#type)
   - [delimiters](#delimiters)
   - [onlyBlurred and onlyFocused](#onlyBlurred)
   - [max and min](#max)

  <br/>
     
 - Numeral
   - [numeralStyle](#numeralStyle)
   - [decimalPlaces](#decimalPlaces)
   - [trailingZero](#trailingZero)
   - [emptyToZero](#emptyToZero)

  <br/>
     
 - Time and date
   - [pattern](#pattern)
  
  <br/>
     
 - Custom
   - [blocks](#blocks)
   - [contained](#contained)
   - [leadingZero](#leadingZero)
   - [onlyNumbers](#onlyNumbers)
  <br/><br/>

## `type`
A `string` that decides the type of format, the available options are `numeral`, `date`, `time` and `custom (default)`.
```js
let numeralInput = new Inpux('#numeral-input', { type: "numeral" });
let customInput  = new Inpux('#custom-input',  { type: "custom"  });
let dateInput    = new Inpux('#date-input',    { type: "date"    });
let timeInput    = new Inpux('#time-input',    { type: "time"    });
```
<br/><br/>

## `delimiters`
An array of `strings` that hold the delimiters in formatting.\
The default value for each format type is: `numeral: [",","."]`, `custom: [""]`, `date: ["/"]`, `time: [":"]`.
> [!NOTE]
> - For the `custom` type, you have to set a [blocks](#blocks) option.
> - For the `numeral` type, the delimiters will consist of the first two elements, with the first one representing the thousandth part and the second one representing the decimal part.
```js
// 1234567,89  =>  1.234.567,89
let numeralInput = new Inpux('#numeral-input', {
  delimiters: [".", ","], // or ".,"
  type: "numeral"
});

// ABC63791458  =>  ABC.637.914-58
let customInput = new Inpux('#custom-input', {
  delimiters: [".", ".", "-"], // or "..-"
  blocks: [3, 3, 3, 2]
});

// 02192003  =>  02-19/2003
let date = new Inpux('#date-input', {
  delimiters: "-/", // or ["-", "/"]
  type: "date"
});
```
<br/><br/>

## `onlyBlurred` and `onlyFocused`
onlyBlurred is a `boolean` that, when set to `true`, triggers the format on the `blur` event, while onlyFocused, another `boolean`, does the same for the `focus` event when set to `true`.
```js
// Focused input value: "HelloWorld!"
// Blurred input value: "Hello World!"
let customInput = new Inpux('#custom-input', {
  onlyBlurred: true,
  delimiters: " ",
  blocks: [5, 6]
});

// Focused input value: "Hello World!"
// Blurred input value: "HelloWorld!"
let customInput = new Inpux('#custom-input', {
  onlyFocused: true,
  delimiters: " ",
  blocks: [5, 6]
});
```
<br/><br/>

## `max` and `min`
`numbers` or arrays of `numbers` that defines the max and min value of a number.
> [!NOTE]
> - For `custom` type, you have to set [onlyNumbers](#onlyNumbers) option as `true`.
> - For `date` and `time` type, the array will be transformed into an array of `integers`.
> - For `numeral` type, max and min can be a `float` value.

<br/>

Using max and min as a `float` or `integer`:
```js
// 500        =>  blur event  =>  1000
// 9,999,999  =>  blur event  =>  1,234,567.89
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  max: 1234567.89,
  min: 1000
});

// 99.99.10  =>  blur event  =>  50.50.25
let customInput = new Inpux('#custom-input', {
  blocks: 2,
  onlyNumbers: true,
  delimiters: ".",
  max: 50,
  min: 25
});
```
<br/>

Using max and min as an `array` of `integers`:
```js
// 999.999.1  =>  blur event  =>  100.100.025
let customInput = new Inpux('#custom-input', {
  blocks: 3,
  onlyNumbers: true,
  delimiters: ".",
  max: [100, 100, 100],
  min: [false, false, 25]
});

// 02/19/1000  =>  blur event  =>  02/19/1923
// 02/19/3333  =>  blur event  =>  02/19/2023
let dateInput = new Inpux('#date-input', {
  type: "date",
  max: [false, false, 2023],
  max: [false, false, 1923]
});
```
<br/><br/>

## `numeralStyle`
A `string` that determines the numeral style, with three available options: `"thousand" (default)`, `"wan"`, and `"lakh"`.
```js
// 1,234,567.89
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  numeralStyle: "thousand"
});

// 123,4567.89
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  numeralStyle: "wan"
});

// 12,34,567.89
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  numeralStyle: "lakh"
});
```
<br/><br/>

## `decimalPlaces`
An `integer` that determines how many numbers you can place after decimal [delimiter](#delimiters).
```js
// 5.123  =>  5.12
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  decimalPlaces: 2
});
```
<br/><br/>

## `trailingZero`
A `boolean` option that, when set to `true`, fills in the decimal places with `"0"` on the right. You must also include [decimalPlaces](#decimalPlaces).
```js
// 5.1  =>  blur event  =>  5.100
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  decimalPlaces: 3,
  trailingZero: true
});
```
<br/><br/>

## `emptyToZero`
A `boolean` that, when set to `true`, automatically converts an `empty` inpux value into `"0"`.
```js
// empty  =>  blur event  =>  0
let numeralInput = new Inpux('#numeral-input', {
  type: "numeral",
  emptyToZero: true
});
```
<br/><br/>

## `pattern`
An `array` of `strings`, used to describe how values should be formatted and displayed.\
The default value for the date type is `["M", "D", "Y"]`, and for the time type, it is `["H", "M", "S"]`.
```js
// 02/2023
let dateInput = new Inpux('#date-input', {
  type: "date",
  pattern: ["m", "Y"] // or "mY"
});

// 02/23
let dateInput = new Inpux('#date-input', {
  type: "date",
  pattern: ["m", "y"] // or "my"
});

// 06:30
let timeInput = new Inpux('#time-input', {
  type: "time",
  pattern: ["h", "m"] // or "hm"
});
```
<br/><br/>

## `blocks`
An array that holds the group sizes of the inpux value for placing [delimiters](#delimiters) between them.\
```js
// abcdefg  =>  ["abc", "def", "g"]
let customInput = new Inpux('#custom-input', {
  blocks: 3
});

// 1234567890A  =>  ["123", "45", "678", "90"]
let customInput = new Inpux('#custom-input', {
  blocks: [3, 2]
});
```
<br/><br/>

## `contained`
A `boolean` that if `true`, will limit the character quantity to the blocks full size. You must also include [blocks](#blocks).\
If `false` it will loop every array options even if it exceeds the blocks size.
```js
// abcdefghi  =>  ["abc"]
let customInput = new Inpux('#custom-input', {
  blocks: 3,
  contained: true
});

// 1234567890  =>  ["123", "45", "6"]
let customInput = new Inpux('#custom-input', {
  blocks: [3, 2, 1],
  contained: true
});
```
<br/><br/>

## `leadingZero`
A `boolean` that, when set to `true`, fills the blocks with `"0"` on the left. You must also include [blocks](#blocks).\
```js
// 1    =>  blur event  =>  01
// 123  =>  blur event  =>  12.003
let customInput = new Inpux('#custom-input', {
  blocks: [2, 3],
  delimiters: ".",
  leadingZero: true
});
```
<br/><br/>

## `onlyNumbers`
A `boolean` that, when set to `true`, filter only numeric characters in the inpux value.\
```js
// ABC123$$456  =>  123456
let customInput = new Inpux('#custom-input', {
  onlyNumbers: true
});
```
