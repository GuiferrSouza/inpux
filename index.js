const delay = ms => new Promise(res => setTimeout(res, ms));
let _numeral, _date, _time, card, _phone, _custom;

window.addEventListener('DOMContentLoaded', () => {
    _numeral = new Inpux('#numeral-input', {
        type: "numeral",
        numeralStyle: "thousand",
        emptyToZero: false
    });
    _date = new Inpux("#date-input", {
        type: "date",
        pattern: ["Y", "m", "d"],
        delimiters: "-"
    });
    _time = new Inpux("#time-input", {
        type: "time",
        pattern: ["h", "m"],
    });
    _card = new Inpux("#card-input", {
        type: "custom",
        delimiters: " ",
        onlyNumbers: true,
        blocks: [4, 4, 4, 4],
        contained: true
    });
    _phone = new Inpux("#phone-input", {
        type: "custom",
        delimiters: ["(", ") ", "-"],
        onlyNumbers: true,
        blocks: [0, 3, 3, 4],
        contained: true
    });
    _custom = new Inpux("#custom-input", {
        type: "custom",
        delimiters: "/-",
        blocks: 3,
    });
    colorCodeStyle();
});

document.addEventListener('click', async e => {
    let docsBtn = e.target.closest('#docs-btn');
    let demoBtn = e.target.closest('.scroll-to-demo');
    let copyCodeBtn = e.target.closest('.copy-code-btn');
    let link = e.target.closest('.link');

    if (docsBtn) {
        location.href = "https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md";
    }

    if (copyCodeBtn) {
        copyCodeBtn.textContent = "done";
        copyCodeBtn.classList.add('copied');
        let el = copyCodeBtn.parentElement.querySelector('.code-area');
        let txt = el.innerText.replace(/\u2003|\u2002/g, "");
        navigator.clipboard.writeText(txt);
        await delay(1000);
        copyCodeBtn.textContent = "content_copy";
        copyCodeBtn.classList.remove('copied');
    }

    if (demoBtn) {
        document.querySelector('#numeral-input').scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }

    if(link){
        let socialList = {
            githubProjectLink: "https://github.com/GuiferrSouza/inpux",
            documentationLink: "https://github.com/GuiferrSouza/inpux/blob/main/docs/documentation.md",
            githubLink: "https://github.com/GuiferrSouza",
            codepenLink: "https://codepen.io/GuiFSouzah",
            linkedinLink: "https://www.linkedin.com/in/guilherme-ferreira-de-souza-96696b205/"
        }
        location.href = socialList[link.id]
    }
});

document.addEventListener('change', async e => {
    let numeralStyleSelect = e.target.closest("#numeral-style-select");
    if (numeralStyleSelect) {
        let val = numeralStyleSelect.value;
        let wrapper = numeralStyleSelect.closest(".wrapper");
        let codeArea = wrapper.querySelector(".code-area");
        codeArea.innerHTML = `
        var myinput = new Inpux("#input", {<br>
            &emsp;&ensp; type: "numeral",<br>
            &emsp;&ensp; numeralStyle: "${val}",<br>
            &emsp;&ensp; emptyToZero: false<br>
        });`; colorCodeStyle(codeArea);
        _numeral.setOptions({
            type: "numeral",
            numeralStyle: val,
            emptyToZero: false,
        });
    }
});

function colorCodeStyle(arg) {
    const codeArea = arg ? [arg] : document.querySelectorAll('.code-area');
    let result;
    for (let el of codeArea) {
        let txt = el.innerHTML;
        result = txt
            .replace(_rgx("var"), _spn("var", "blue"))
            .replace(_rgx("true"), _spn("true", "blue"))
            .replace(_rgx("false"), _spn("false", "blue"))
            .replace(_rgx("new"), _spn("new", "blue"))
            .replace(/\(/g, _spn("(", "yellow"))
            .replace(/\)/g, _spn(")", "yellow"))
            .replace(/\{/g, _spn("{", "pink"))
            .replace(/\}/g, _spn("}", "pink"))
            .replace(/\[/g, _spn("[", "blue"))
            .replace(/\]/g, _spn("]", "blue"))
            .replace(/\d+/g, _spn("$&", "green"))
            .replace(/(\w+:)/g, _spn("$1", "lightBlue"))
            .replace(/(['"])([^'"]*)\1/g, _spn("$1$2$1", "brown"));
        for (let val of _nxt("var", txt)) { result = result.replace(_rgx(val), _spn(val, "lightBlue")) }
        for (let val of _nxt("new", txt)) { result = result.replace(_rgx(val), _spn(val, "green")) }
        el.innerHTML = result;
    }

    function _spn(val, clr) { return `<span ${clr}>${val}</span>` }
    function _rgx(val) { return new RegExp(`\\b${val}\\b`, "g") }
    function _nxt(target, txt) {
        const regex = new RegExp(`${target}\\s+(\\w+)`, "g");
        const nextWords = []; let match;
        while ((match = regex.exec(txt)) !== null) {
            const nextWord = match[1];
            nextWords.push(nextWord);
        } return nextWords;
    }
}
