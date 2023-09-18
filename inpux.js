class Inpux { constructor(e, t) { this.setOptions(t), this.setInput(e), this.input && (this.previousValue = this.input.value, this.input.value = this.val(), this.format(!0)) } setOptions(e) { var t, i, n, l, s, r, a, o, p, u, h, d, c, y, m, f, g, $, v, _, b, A, E, L, x, S, U, B, T, F, M, N, j, C; (e = "object" == typeof e ? e : {}).timePattern = e.datePattern = null; let O; e.type = ["NUMERAL", "DATE", "TIME", "CUSTOM"].includes(O = String(t = e.type).toUpperCase()) ? O : "CUSTOM", e.onlyBlurred = !!(i = e.onlyBlurred) && ("string" == typeof i ? /^(true|false)$/i.test(i) : "boolean" == typeof i && i), e.onlyFocused = !!(n = e.onlyFocused) && ("string" == typeof n ? /^(true|false)$/i.test(n) : "boolean" == typeof n && n); let V, P, Z, R, k, D, I, H, W, Y, G = { NUMERAL: { type: e.type, onlyBlurred: e.onlyBlurred, onlyFocused: e.onlyFocused, emptyToZero: (l = e.emptyToZero) ? "string" == typeof l ? /^(true|false)$/i.test(l) : "boolean" != typeof l || l : "boolean" != typeof l, decimalPlaces: !!(z(s = e.decimalPlaces) && Math.min(parseInt(s), 100) >= 0) && Math.min(parseInt(s), 100), numeralStyle: ["THOUSAND", "LAKH", "WAN"].includes(V = String(r = e.numeralStyle).toUpperCase()) ? V : "THOUSAND", trailingZero: (a = e.trailingZero) ? "string" == typeof a ? /^(true|false)$/i.test(a) : "boolean" != typeof a || a : "boolean" != typeof a, delimiters: (F = Q(!!(o = e.delimiters) && ("string" == typeof o ? o.split("") : !!Array.isArray(o) && o)), M = [",", "."], "" === (F = 0 == (F = (F || M).slice(0, 2).filter(e => "string" == typeof e).map(e => e.replace(/[0-9-]/g, "").charAt(0))).length ? M : 1 == F.length ? [F[0], F[0]] : F)[1] ? [F[0], M[1]] : F), max: !!z(p = e.max) && q(p), min: !!z(u = e.min) && q(u) }, CUSTOM: { type: e.type, onlyBlurred: e.onlyBlurred, onlyFocused: e.onlyFocused, blocks: !!(P = !!(h = e.blocks) && ((N = h, "number" == typeof N) ? [h] : !!Array.isArray(h) && h.length > 0 && h)) && (C = (j = P, !!j && j.map(e => e ? "number" == typeof e ? parseInt(e) : "string" == typeof e ? isNaN(parseInt(e)) ? 0 : parseInt(e) : 0 : 0)), C.map(e => Math.abs(e))), onlyNumbers: !!(d = e.onlyNumbers) && ("string" == typeof d ? /^(true|false)$/i.test(d) : "boolean" == typeof d && d), leadingZero: (c = e.leadingZero) ? "string" == typeof c ? /^(true|false)$/i.test(c) : "boolean" != typeof c || c : "boolean" != typeof c, delimiters: Q(!!(y = e.delimiters) && ("string" == typeof y ? y.split("") : !!Array.isArray(y) && y)) || [""], contained: !!(m = e.contained) && ("string" == typeof m ? /^(true|false)$/i.test(m) : "boolean" == typeof m && m), max: z(f = e.max) ? [q(f)] : !!Array.isArray(f) && J(f).length > 0 && J(f), min: z(g = e.min) ? [q(g)] : !!Array.isArray(g) && J(g).length > 0 && J(g) }, TIME: { contained: !0, onlyNumbers: !0, leadingZero: !0, type: e.type, onlyBlurred: e.onlyBlurred, onlyFocused: e.onlyFocused, pattern: function (t) { let i = ["H", "M", "S"], n = "string" == typeof t ? t.split("") : Array.isArray(t) ? t : i, l = []; for (let s of n) l.includes(s) || l.includes(s.toUpperCase()) || l.push(s); return n = l.filter(e => i.includes(String(e).toUpperCase())), e.timePattern = n, n }(e.pattern), delimiters: Q(($ = e.delimiters) ? "string" == typeof $ ? $.split("") : Array.isArray($) ? $ : [":"] : [":"]) || [":"], blocks: (v = e.timePattern).map(e => 2), max: (_ = e.timePattern, b = e.max, Z = { H: [0, 23] }, R = _.map(e => Z[e.toUpperCase()] || [0, 59]), b = (b = z(b) ? [parseInt(b)] : Array.isArray(b) ? b : []).slice(0, R.length), R.map((e, t) => b[t] ? Math.min(Math.max(e[0], b[t]), e[1]) : e[1])), min: (A = e.timePattern, E = e.min, k = { H: [0, 23] }, D = A.map(e => k[e.toUpperCase()] || [0, 59]), E = (E = z(E) ? [parseInt(E)] : Array.isArray(E) ? E : []).slice(0, D.length), D.map((e, t) => E[t] ? Math.min(Math.max(e[0], E[t]), e[1]) : e[0])) }, DATE: { contained: !0, onlyNumbers: !0, leadingZero: !0, type: e.type, onlyBlurred: e.onlyBlurred, onlyFocused: e.onlyFocused, pattern: function (t) { let i = ["M", "D", "Y"], n = "string" == typeof t ? t.split("") : Array.isArray(t) ? t : i, l = []; for (let s of n) l.includes(s) || l.includes(s.toUpperCase()) || l.push(s); return n = l.filter(e => i.includes(String(e).toUpperCase())), e.datePattern = n, n }(e.pattern), delimiters: Q((L = e.delimiters) ? "string" == typeof L ? L.split("") : Array.isArray(L) ? L : ["/"] : ["/"]) || ["/"], blocks: (x = e.datePattern).map(e => "Y" === e ? 4 : 2), max: (S = e.datePattern, U = e.max, I = { Y: [1, 9999], M: [1, 12] }, H = S.map(e => I[e.toUpperCase()] || [1, 31]), U = (U = z(U) ? [parseInt(U)] : Array.isArray(U) ? U : []).slice(0, H.length), H.map((e, t) => U[t] ? Math.min(Math.max(e[0], parseInt(U[t])), e[1]) : e[1])), min: (B = e.datePattern, T = e.min, W = { Y: [1, 9999], M: [1, 12] }, Y = B.map(e => W[e.toUpperCase()] || [1, 31]), T = (T = z(T) ? [parseInt(T)] : Array.isArray(T) ? T : []).slice(0, Y.length), Y.map((e, t) => T[t] ? Math.min(Math.max(e[0], parseInt(T[t])), e[1]) : e[0])) } }, w = G[e.type]; for (let K in w) !1 === w[K] && delete w[K]; if (this.input) { this.input.value = this.val(), this.options = w, this.adjustValue(), this.format(!0), this.previousValue = this.input.value; return } function q(e) { return e ? e.toLocaleString("en-US", { useGrouping: !1 }) : e } function z(e) { let t = q(e); return t = !!t && t.replace(/[\.]/g, ""), /^-?\d+$/.test(t) && !isNaN(Number(e)) } function J(e) { return e.map(e => { let t = "number" == typeof e ? Number.isInteger(e) ? e : Math.floor(e) : !!("string" == typeof e && z(e)) && e; return !!z(t) && q(t) }) } function Q(e) { return !!e && e.map(e => e ? "string" == typeof e ? e : e.toString : "") } this.options = w } setInput(e) { var t; (e = (t = e) ? "string" == typeof t ? document.querySelector(t) : e instanceof HTMLInputElement ? t : null : null) && (e.addEventListener("input", this.handleInputEventListener), e.addEventListener("focus", this.handleFocusEventListener), e.addEventListener("blur", this.handleBlurEventListener), this.input && (this.destroy(), this.input = e, this.input.value = this.val(), this.adjustValue(), this.format(!0), this.previousValue = this.input.value), this.input = e) } handleInputEventListener = e => { if (this.options.onlyBlurred) this.input.value = this.val(), this.adjustValue(); else { let t = this.input.value, i = this.input.selectionStart; this.input.value = this.val(), this.adjustValue(), this.format(), this.input.value == this.previousValue && "deleteContentBackward" == e.inputType && i--, this.previousValue = this.input.value; let n = i + (this.input.value.length - t.length); if (this.input.setSelectionRange) this.input.setSelectionRange(n, n); else if (this.input.createTextRange) { let l = this.input.createTextRange(); l.collapse(!0), l.moveEnd("character", n), l.moveStart("character", n), l.select() } } }; handleBlurEventListener = () => { this.input.value = this.val(), this.adjustValue(), this.format(!0), this.previousValue = this.input.value, this.options.onlyFocused && (this.input.value = this.val()) }; handleFocusEventListener = () => { this.options.onlyFocused && (this.input.value = this.val(), this.adjustValue(), this.format(!0), this.previousValue = this.input.value), this.options.onlyBlurred && (this.input.value = this.val()) }; format(e) { let t = this.options, i = this.input.value, n = t.onlyNumbers, l = t.decimalPlaces, s = t.emptyToZero, r = t.trailingZero, a = t.leadingZero, o = t.delimiters, p = t.blocks, u = t.max, h = t.min, d = t.pattern, c = "NUMERAL" === t.type, y = "DATE" === t.type; i = c && "-" == i && e ? "" : i, i = String(n && !p && f(h) && i.length > 0 && e && Number(i) <= Number(h) ? h : i), i = String(n && !p && f(u) && i.length > 0 && e && Number(i) >= Number(u) ? u : i); let m = c ? function i(n) { var a, p; if (0 === n.length) { if (!s || !e) return [""]; n = h && Number(h) > 0 ? h : "0" } let d = !e && n.endsWith(`${o[1]}`) && o[1] ? o[1] : "", c = { LAKH: /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, THOUSAND: /\B(?=(\d{3})+(?!\d))/g, WAN: /\B(?=(\d{4})+(?!\d))/g }[t.numeralStyle.toUpperCase()], y = l && e ? Number(n.replace(o[1], ".")).toFixed(l) : Number(n.replace(o[1], ".")); n = e ? n.replace(/^(-?)0+(?=[\d])/g, "$1").replace(`-${o[1]}`, `-0${o[1]}`).replace(RegExp(`^\\${o[1]}`), `0${o[1]}`) : n.replace(/^(-?)0+(?=[\d])/g, "$1"), n = y <= Number(h) && e ? h.replace(".", o[1]) : n, n = y >= Number(u) && e ? u.replace(".", o[1]) : n, 0 == y && n.includes("-") && e && (n = n.replace("-", "")); let m = n.split(o[1]); m[0] = m[0].replace(c, o[0]), m[1] = m[1] ? o[1] + (e && f(l) && r ? (a = m[1].slice(0, String(l)), p = l, a.length < p ? a + "0".repeat(p - a.length) : a) : !e && f(l) ? m[1].slice(0, String(l)) : m[1]) : e && f(l) && r ? `${o[1]}${"0".repeat(l)}` : ""; let g = e ? m.join("").replace(/^-0$/, "0") : m.join(""); return g.startsWith(`${o[1]}`) && e ? ["0" + g] : [g + d] }(i) : t.blocks ? function t(i) { let l = [], s = 0; for (; i.length > 0;) { let r = p[s % p.length], o = i.slice(0, r); if (n && e) { let c = !!Array.isArray(h) && h[s % h.length], m = !!Array.isArray(u) && u[s % u.length]; o = String(f(c) && Number(o) <= Number(c) ? c : o), o = String(f(m) && Number(o) >= Number(m) ? m : o), o = a ? g(o, r) : o } o.length > 0 && (l.push(o), i = i.slice(r)), s++ } if (y && e) { let $ = d.indexOf("m") > -1 ? d.indexOf("m") : d.indexOf("M"), v = d.indexOf("d") > -1 ? d.indexOf("d") : d.indexOf("D"), _ = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][l[$] - 1] || 31; l[v] && l[$] && (l[v] = g(Math.min(l[v], _), 2)) } return l }(i) : [i]; function f(e) { var t; let i = (t = e) ? t.toLocaleString("en-US", { useGrouping: !1 }) : t; return i = !!i && i.replace(/[\.]/g, ""), /^-?\d+$/.test(i) && !isNaN(Number(e)) } function g(e, t) { return String(e).padStart(t, "0") } this.input.value = "" + function e(t) { let i = 0, n = t.map((e, n) => { let l = o[i]; return i = (i + 1) % o.length, n === t.length - 1 ? e : e + l }).join(""); return n }(m, o) } val(e) { var t; let i = this.options, n = i.blocks, l = this.input.value, s = i.contained, r = ("NUMERAL" === i.type ? [i.delimiters[0]] : i.delimiters).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); return e ? l : s && n ? l.replace(RegExp(r.join("|"), "gi"), "").slice(0, (t = i.blocks, t.reduce((e, t) => e + t, 0))) : l.replace(RegExp(r.join("|"), "gi"), "") } adjustValue() { let e = "", t = this.options, i = this.input.value, n = t.delimiters, l = t.onlyNumbers, s = "NUMERAL" === t.type, r = this.input.selectionStart, a = s ? [n[0]].map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) : n.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); if (i = i.replace(RegExp(a.join("|"), "gi"), ""), s) { var o, p, u, h; e += i.split("-").length > 1 ? "-" : ""; let d, c = (o = i, p = n[1], d = RegExp(u ? `\\${p}` : `(\\${p}(?=[^${p}]*\\${p}))`, "g"), (u ? o.replace(d, function (e, t, i) { return i.indexOf(e) === t ? e : "" }) : o.replace(d, "")).replace(RegExp(`[^\\d${p}]`, "g"), "")).split(n[1]); c[0] = c[0].length > 0 ? String((h = c[0], h.toLocaleString("fullwide", { useGrouping: !1 }))) : "", c[1] = c.length > 1 ? n[1] + c[1] : "", i = c.join("") } i = l ? i.replace(/[\D]/g, "") : i, this.input.value = e + i, this.input.setSelectionRange(r, r) } destroy() { this.input.value = this.val(), this.input.removeEventListener("input", this.handleInputEventListener), this.input.removeEventListener("focus", this.handleFocusEventListener), this.input.removeEventListener("blur", this.handleBlurEventListener) } groups() { let e = this.options.delimiters, t = [this.val(!0)]; return e.forEach(e => { t = t.flatMap(t => t.split(e)) }), t = t.filter(e => "" !== e) } }
