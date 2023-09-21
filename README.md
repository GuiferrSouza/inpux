# Inpux
Simple custom `<input type="text"/>` formatter for `<html></html>`

## Features
- `Custom`, `numeral`, `date` and `time` formatting types
- Custom options for each formatting type
- CommonJS / ES module systems

## Installation
### npm
```bash
npm install inpux
```
Inpux is available in [jsDelivr](https://www.jsdelivr.com/package/npm/inpux) and [GitHub](https://github.com/GuiferrSouza/inpux)

### Usage
Using [script tag](https://www.w3schools.com/tags/tag_script.asp), include one of these in your `HTML`
```html
<script src="https://cdn.jsdelivr.net/npm/inpux@1.1.7/inpux.min.js"></script>
<script src="https://guiferrsouza.github.io/inpux/inpux.min.js"></script>
```

Using [modules](https://dev.to/costamatheus97/es-modules-and-commonjs-an-overview-1i4b), include one of these in your `Javascript`
```js
import Inpux from './node_modules/inpux/inpux.min.js';
const Inpux = require("inpux");
```

Create your input element in your `HTML`
```html
<input class="input-to-format"/>
```

Set your `Inpux` element with your DOM element and your options as parameters in your `Javascript`
```js
const myInpux = new Inpux('.input-to-format', {...});
```
[Project](https://github.com/GuiferrSouza/inpux) • [Documentation](https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md) • [Demo](guiferrsouza.github.io/inpux/)
