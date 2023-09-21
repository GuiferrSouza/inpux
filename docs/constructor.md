# Inpux `constructor`
### `new Inpux(selection, {options})`

- *Selection* can be either HTML selector or the DOM element
- *Options* must be an object containing a list of available values [here]()

## Examples
Using `HTML selector`
```js
const myInpux = new Inpux("#inputID", {
  type: "numeral",
  max: 100000
});
```

Using `DOM element`
```js
const myInput = document.getElementById("inputID");
const myInpux = new Inpux(myInput, {
  type: "numeral",
  max: 100000
});
```
[Project](https://github.com/GuiferrSouza/inpux) • [Documentation](https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md) • [Demo](guiferrsouza.github.io/inpux/)
