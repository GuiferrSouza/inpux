class Inpux {
    constructor(input, options) {
        this.setOptions(options);
        this.setInput(input);
        if (this.input) {
            this.previousValue = this.input.value;
            this.input.value = this.val();
            this.format(true);
        }
    }

    setOptions(options) {
        options = typeof options === "object" ? options : {};
        options.timePattern = options.datePattern = null;
        options.type = (function (val) {
            let result = String(val).toUpperCase();
            const types = ["NUMERAL", "DATE", "TIME", "CUSTOM"];
            return types.includes(result) ? result : "CUSTOM";
        })(options.type);
        options.onlyBlurred = (function (val) {
            return !val ? false : typeof val == 'string' ?
                (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : false;
        })(options.onlyBlurred);
        options.onlyFocused = (function (val) {
            return !val ? false : typeof val == 'string' ?
                (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : false;
        })(options.onlyFocused);

        const newOptions = {
            NUMERAL: {
                type: options.type,
                onlyBlurred: options.onlyBlurred,
                onlyFocused: options.onlyFocused,
                emptyToZero: (function (val) {
                    return !val ? (typeof val === "boolean" ? false : true) : typeof val == 'string' ?
                        (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : true;
                })(options.emptyToZero),
                decimalPlaces: (function (val) {
                    return _isNum(val) &&
                        Math.min(parseInt(val), 100) >= 0 ?
                        Math.min(parseInt(val), 100) : false;
                })(options.decimalPlaces),
                numeralStyle: (function (val) {
                    let result = String(val).toUpperCase();
                    const styles = ["THOUSAND", "LAKH", "WAN"];
                    return styles.includes(result) ? result : "THOUSAND";
                })(options.numeralStyle),
                trailingZero: (function (val) {
                    return !val ? (typeof val === "boolean" ? false : true) : typeof val == 'string' ?
                        (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : true;
                })(options.trailingZero),
                delimiters: (function (val) {
                    let result = !val ? false : typeof val == 'string' ?
                        val.split('') : Array.isArray(val) ? val : false;
                    return _filterNumeralDelimiters(_filterOnlyStr(result), [',', '.'])
                })(options.delimiters),
                max: (function (val) {
                    return _isNum(val) ? _decimal(val) : false;
                })(options.max),
                min: (function (val) {
                    return _isNum(val) ? _decimal(val) : false;
                })(options.min),
            },

            CUSTOM: {
                type: options.type,
                onlyBlurred: options.onlyBlurred,
                onlyFocused: options.onlyFocused,
                blocks: (function (val) {
                    let result = !val ? false : _isTypeNum(val) ? [val] :
                        Array.isArray(val) && val.length > 0 ? val : false;
                    return result ? _abs(_filterOnlyInt(result)) : false;
                })(options.blocks),
                onlyNumbers: (function (val) {
                    return !val ? false : typeof val == 'string' ?
                        (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : false;
                })(options.onlyNumbers),
                leadingZero: (function (val) {
                    return !val ? (typeof val === "boolean" ? false : true) : typeof val == 'string' ?
                        (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : true;
                })(options.leadingZero),
                delimiters: (function (val) {
                    let result = !val ? false : typeof val == 'string' ?
                        val.split('') : Array.isArray(val) ? val : false;
                    return _filterOnlyStr(result) || [''];
                })(options.delimiters),
                contained: (function (val) {
                    return !val ? false : typeof val == 'string' ?
                        (/^(true|false)$/i).test(val) : typeof val == 'boolean' ? val : false;
                })(options.contained),
                max: (function (val) {
                    return _isNum(val) ? [_decimal(val)] : Array.isArray(val) &&
                        _filterMaxAndMin(val).length > 0 ? _filterMaxAndMin(val) : false;
                })(options.max),
                min: (function (val) {
                    return _isNum(val) ? [_decimal(val)] : Array.isArray(val) &&
                        _filterMaxAndMin(val).length > 0 ? _filterMaxAndMin(val) : false;
                })(options.min),
            },

            TIME: {
                contained: true,
                onlyNumbers: true,
                leadingZero: true,
                type: options.type,
                onlyBlurred: options.onlyBlurred,
                onlyFocused: options.onlyFocused,
                pattern: (function (val) {
                    let pattern = ["H", "M", "S"];
                    let result = typeof val === "string" ? val.split('') : Array.isArray(val) ? val : pattern;
                    let arr = []; for (let el of result) {
                        if (!arr.includes(el) && !arr.includes(el.toUpperCase())) { arr.push(el); }
                    } result = arr.filter(c => pattern.includes(String(c).toUpperCase()));
                    options.timePattern = result; return result;
                })(options.pattern),
                delimiters: (function (val) {
                    let result = !val ? [':'] : typeof val == 'string' ?
                        val.split('') : Array.isArray(val) ? val : [':'];
                    return _filterOnlyStr(result) || [':'];
                })(options.delimiters),
                blocks: (function (pattern) {
                    return pattern.map((c) => (2));
                })(options.timePattern),
                max: (function (pattern, max) {
                    let values = { H: [0, 23] }
                    let result = pattern.map((c) => (values[c.toUpperCase()] || [0, 59]));
                    max = _isNum(max) ? [parseInt(max)] : Array.isArray(max) ? max : [];
                    max = max.slice(0, result.length); return result.map((v, i) => {
                        return max[i] ? Math.min(Math.max(v[0], max[i]), v[1]) : v[1];
                    });
                })(options.timePattern, options.max),
                min: (function (pattern, min) {
                    let values = { H: [0, 23] }
                    let result = pattern.map((c) => (values[c.toUpperCase()] || [0, 59]));
                    min = _isNum(min) ? [parseInt(min)] : Array.isArray(min) ? min : [];
                    min = min.slice(0, result.length); return result.map((v, i) => {
                        return min[i] ? Math.min(Math.max(v[0], min[i]), v[1]) : v[0];
                    });
                })(options.timePattern, options.min),
            },

            DATE: {
                contained: true,
                onlyNumbers: true,
                leadingZero: true,
                type: options.type,
                onlyBlurred: options.onlyBlurred,
                onlyFocused: options.onlyFocused,
                pattern: (function (val) {
                    let pattern = ["M", "D", "Y"];
                    let result = typeof val === "string" ? val.split('') : Array.isArray(val) ? val : pattern;
                    let arr = []; for (let el of result) {
                        if (!arr.includes(el) && !arr.includes(el.toUpperCase())) { arr.push(el); }
                    } result = arr.filter(c => pattern.includes(String(c).toUpperCase()));
                    options.datePattern = result; return result;
                })(options.pattern),
                delimiters: (function (val) {
                    let result = !val ? ['/'] : typeof val == 'string' ?
                        val.split('') : Array.isArray(val) ? val : ['/'];
                    return _filterOnlyStr(result) || ['/'];
                })(options.delimiters),
                blocks: (function (pattern) {
                    return pattern.map((c) => (c === "Y" ? 4 : 2));
                })(options.datePattern),
                max: (function (pattern, max) {
                    let values = { Y: [1, 9999], M: [1, 12] }
                    let result = pattern.map((c) => (values[c.toUpperCase()] || [1, 31]));
                    max = _isNum(max) ? [parseInt(max)] : Array.isArray(max) ? max : [];
                    max = max.slice(0, result.length); return result.map((v, i) => {
                        return max[i] ? Math.min(Math.max(v[0], parseInt(max[i])), v[1]) : v[1];
                    });
                })(options.datePattern, options.max),
                min: (function (pattern, min) {
                    let values = { Y: [1, 9999], M: [1, 12] }
                    let result = pattern.map((c) => (values[c.toUpperCase()] || [1, 31]));
                    min = _isNum(min) ? [parseInt(min)] : Array.isArray(min) ? min : [];
                    min = min.slice(0, result.length); return result.map((v, i) => {
                        return min[i] ? Math.min(Math.max(v[0], parseInt(min[i])), v[1]) : v[0];
                    });
                })(options.datePattern, options.min),
            }
        }

        let result = newOptions[options.type];
        for (let key in result) {
            if (result[key] === false) { delete result[key] }
        } if (this.input) {
            this.input.value = this.val();
            this.options = result;
            this.adjustValue(); this.format(true);
            this.previousValue = this.input.value;
            return;
        } this.options = result;

        function _isTypeNum(val) { return typeof val === "number" }
        function _decimal(val) { return val ? val.toLocaleString('en-US', { useGrouping: false }) : val }
        function _isNum(val) {
            let result = _decimal(val);
            result = result ? result.replace(/[\.]/g, '') : false;
            return (/^-?\d+$/).test(result) && !isNaN(Number(val));
        }

        function _filterNumeralDelimiters(a, b) {
            a = (a || b).slice(0, 2)
                .filter(el => typeof el === 'string')
                .map(el => el.replace(/[0-9-]/g, '').charAt(0));
            a = a.length == 0 ? b : a.length == 1 ? [a[0], a[0]] : a;
            return (a[1] === "") ? [a[0], b[1]] : a;
        }
        function _filterMaxAndMin(arr) {
            return arr.map((el) => {
                let result = typeof el === "number" ? Number.isInteger(el) ? el :
                    Math.floor(el) : typeof el === "string" && _isNum(el) ? el : false;
                return _isNum(result) ? _decimal(result) : false;
            });
        }
        function _filterOnlyInt(arr) {
            return !arr ? false : arr.map((el) => {
                return !el ? 0 : typeof el == "number" ? parseInt(el) :
                    typeof el === "string" ? isNaN(parseInt(el)) ? 0 : parseInt(el) : 0;
            });
        }
        function _filterOnlyStr(arr) {
            return !arr ? false : arr.map((el) => {
                return !el ? "" : typeof el === "string" ? el : el.toString;
            });
        }
        function _abs(arr) {
            return arr.map(a => Math.abs(a))
        }
    }

    setInput(input) {
        input = (function (val) {
            return !val ? null
                : typeof val == 'string' ? document.querySelector(val)
                    : input instanceof HTMLInputElement ? val : null;
        })(input);

        if (input) {
            input.addEventListener('input', this.handleInputEventListener);
            input.addEventListener('focus', this.handleFocusEventListener);
            input.addEventListener('blur', this.handleBlurEventListener);
            if (this.input) {
                this.destroy();
                this.input = input;
                this.input.value = this.val();
                this.adjustValue(); this.format(true);
                this.previousValue = this.input.value;
            } this.input = input;
        }
    }

    handleInputEventListener = (e) => {
        if (this.options.onlyBlurred) {
            this.input.value = this.val();
            this.adjustValue();
        } else {
            let oldValue = this.input.value;
            let cursorPositionStart = this.input.selectionStart;

            this.input.value = this.val();
            this.adjustValue();
            this.format();

            if (this.input.value == this.previousValue && e.inputType == "deleteContentBackward") {
                cursorPositionStart--;
            } this.previousValue = this.input.value;

            let cursorPositionDiff = this.input.value.length - oldValue.length;
            let newPos = cursorPositionStart + cursorPositionDiff;

            if (this.input.setSelectionRange) {
                this.input.setSelectionRange(newPos, newPos);
            } else if (this.input.createTextRange) {
                let range = this.input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', newPos);
                range.moveStart('character', newPos);
                range.select();
            }
        }
    }

    handleBlurEventListener = () => {
        this.input.value = this.val();
        this.adjustValue(); this.format(true);
        this.previousValue = this.input.value;
        if (this.options.onlyFocused) { this.input.value = this.val() }
    }

    handleFocusEventListener = () => {
        if (this.options.onlyFocused) {
            this.input.value = this.val();
            this.adjustValue(); this.format(true);
            this.previousValue = this.input.value;
        } if (this.options.onlyBlurred) { this.input.value = this.val() }
    }

    format(blurring) {
        let options = this.options;
        let myVal = this.input.value;
        let onlyNumbers = options.onlyNumbers;
        let decimalPlaces = options.decimalPlaces;
        let emptyToZero = options.emptyToZero;
        let trailingZero = options.trailingZero;
        let leadingZero = options.leadingZero;
        let delimiters = options.delimiters;
        let blocks = options.blocks;
        let max = options.max;
        let min = options.min;
        let pattern = options.pattern;
        let numeral = options.type === "NUMERAL";
        let date = options.type === "DATE";

        myVal = numeral && myVal == '-' && blurring ? '' : myVal;

        myVal = String((onlyNumbers) && !blocks &&
            _isNum(min) && myVal.length > 0 && blurring &&
            Number(myVal) <= Number(min) ? min : myVal);

        myVal = String((onlyNumbers) && !blocks &&
            _isNum(max) && myVal.length > 0 && blurring &&
            Number(myVal) >= Number(max) ? max : myVal);

        let groups = numeral ? _agroupNumeral(myVal) :
            options.blocks ? _agroup(myVal) : [myVal];

        this.input.value = "" + _placeDelimiters(groups, delimiters);

        function _agroup(val) {
            let result = [];
            let index = 0;

            while (val.length > 0) {
                const size = blocks[index % blocks.length];
                console.log(size)
                let group = val.slice(0, size);

                if (onlyNumbers && blurring) {
                    let myMin = Array.isArray(min) ? min[index % min.length] : false;
                    let myMax = Array.isArray(max) ? max[index % max.length] : false;
                    group = String(_isNum(myMin) && Number(group) <= Number(myMin) ? myMin : group);
                    group = String(_isNum(myMax) && Number(group) >= Number(myMax) ? myMax : group);
                    group = leadingZero ? _leadingZero(group, size) : group;
                }

                if (group.length >= 0) {
                    result.push(group);
                    val = val.slice(size);
                } index++;
            }

            if (date && blurring) {
                let maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let monthIndex = pattern.indexOf('m') > -1 ? pattern.indexOf('m') : pattern.indexOf('M');
                let dayIndex = pattern.indexOf('d') > -1 ? pattern.indexOf('d') : pattern.indexOf('D');
                let monthDays = maxDays[result[monthIndex] - 1] || 31;
                if (result[dayIndex] && result[monthIndex]) {
                    result[dayIndex] = _leadingZero(Math.min(result[dayIndex], monthDays), 2);
                }
            } return result;
        }
        function _agroupNumeral(val) {
            if (val.length === 0) {
                if (emptyToZero && blurring) {
                    val = min && Number(min) > 0 ? min : "0";
                } else { return [""] }
            }

            let endDel = !blurring
                && val.endsWith(`${delimiters[1]}`)
                && delimiters[1] ? delimiters[1] : "";

            const numeralStyles = {
                LAKH: (/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g),
                THOUSAND: (/\B(?=(\d{3})+(?!\d))/g),
                WAN: (/\B(?=(\d{4})+(?!\d))/g),
            }; let rgx = numeralStyles[options.numeralStyle.toUpperCase()];

            let numValue = (decimalPlaces && blurring) ?
                Number(val.replace(delimiters[1], ".")).toFixed(decimalPlaces) :
                Number(val.replace(delimiters[1], "."));

            val = blurring ? val.replace(/^(-?)0+(?=[\d])/g, "$1")
                .replace(`-${delimiters[1]}`, `-0${delimiters[1]}`)
                .replace(new RegExp(`^\\${delimiters[1]}`), `0${delimiters[1]}`) :
                val.replace(/^(-?)0+(?=[\d])/g, "$1")

            val = numValue <= Number(min) && blurring ? min.replace('.', delimiters[1]) : val;
            val = numValue >= Number(max) && blurring ? max.replace('.', delimiters[1]) : val;
            if (numValue == 0 && val.includes("-") && blurring) { val = val.replace("-", "") }

            let numGroups = val.split(delimiters[1]);
            numGroups[0] = numGroups[0].replace(rgx, delimiters[0]);
            numGroups[1] = numGroups[1] ? delimiters[1] + (function () {
                return (blurring && _isNum(decimalPlaces) && trailingZero) ?
                    _trailingZero(numGroups[1].slice(0, String(decimalPlaces)), decimalPlaces) :
                    (!blurring && _isNum(decimalPlaces)) ? numGroups[1].slice(0, String(decimalPlaces)) : numGroups[1];
            })() : (blurring && _isNum(decimalPlaces) && trailingZero) ? `${delimiters[1]}${"0".repeat(decimalPlaces)}` : "";

            let result = blurring ? numGroups.join('').replace(/^-0$/, "0") : numGroups.join('');
            return result.startsWith(`${delimiters[1]}`) && blurring ? ["0" + result] : [result + endDel];
        }

        function _placeDelimiters(arr) {
            let delimiterIndex = 0;
            const result = arr.map((item, index) => {
                const delimiter = delimiters[delimiterIndex];
                delimiterIndex = (delimiterIndex + 1) % delimiters.length;
                return index === arr.length - 1 ? item : item + delimiter;
            }).join(''); return result;
        }

        function _decimal(val) { return val ? val.toLocaleString('en-US', { useGrouping: false }) : val }
        function _isNum(val) {
            let result = _decimal(val);
            result = result ? result.replace(/[\.]/g, '') : false;
            return (/^-?\d+$/).test(result) && !isNaN(Number(val));
        }

        function _leadingZero(num, len) { return String(num).padStart(len, '0') }
        function _trailingZero(num, len) { return num.length < len ? num + "0".repeat(len - num.length) : num }
    }

    val(formatted) {
        let options = this.options;
        let blocks = options.blocks;
        let myVal = this.input.value;
        let contained = options.contained;
        let numeral = options.type === "NUMERAL";
        let delimiters = numeral ? [options.delimiters[0]] : options.delimiters;
        let regex = delimiters.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        return formatted ? myVal : contained && blocks ?
            myVal.replace(new RegExp(regex.join('|'), 'gi'), '').slice(0, _sum(options.blocks)) :
            myVal.replace(new RegExp(regex.join('|'), 'gi'), '');
        function _sum(arr) { return (arr.reduce((a, b) => a + b, 0)) }
    }

    adjustValue() {
        let prefix = "";
        let options = this.options;
        let result = this.input.value;
        let delimiters = options.delimiters;
        let onlyNumbers = options.onlyNumbers;
        let numeral = options.type === "NUMERAL";
        let selectionPos = this.input.selectionStart;
        let regex = numeral
            ? [delimiters[0]].map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            : delimiters.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        result = result.replace(new RegExp(regex.join('|'), 'gi'), '');

        if (numeral) {
            prefix += result.split('-').length > 1 ? "-" : "";
            let numGroups = _onlyFirstOrLast(result, delimiters[1]).split(delimiters[1]);
            numGroups[0] = numGroups[0].length > 0 ? String(_num(numGroups[0])) : "";
            numGroups[1] = numGroups.length > 1 ? delimiters[1] + numGroups[1] : "";
            result = numGroups.join('');
        }

        result = onlyNumbers ? result.replace(/[\D]/g, '') : result;

        this.input.value = prefix + result;
        this.input.setSelectionRange(selectionPos, selectionPos);

        function _num(val) { return val.toLocaleString('fullwide', { useGrouping: false }) }
        function _onlyFirstOrLast(str, delmtr, first) {
            let rgx = new RegExp(first ? `\\${delmtr}`
                : `(\\${delmtr}(?=[^${delmtr}]*\\${delmtr}))`, "g");
            return (first ? str.replace(rgx, function (match, offset, originalValue) {
                return originalValue.indexOf(match) === offset ? match : "";
            }) : str.replace(rgx, '')).replace(new RegExp(`[^\\d${delmtr}]`, 'g'), '');
        }
    }

    destroy() {
        this.input.value = this.val();
        this.input.removeEventListener("input", this.handleInputEventListener);
        this.input.removeEventListener("focus", this.handleFocusEventListener);
        this.input.removeEventListener("blur", this.handleBlurEventListener);
    }

    groups() {
        let delimiters = this.options.delimiters;
        let result = [this.val(true)];
        delimiters.forEach(del => {
            result = result.flatMap(item => item.split(del));
        }); result = result.filter(item => item !== "");
        return result;
    }
}
