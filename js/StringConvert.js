class StringConvert {
    static #chRepl = {
        "\\(1\\/4\\)": "&frac14;",
        "\\(1\\/2\\)": "&frac12;",
        "\\(3\\/4\\)": "&frac34;",
        "\\(%%\\)": "&permil;",
        "\\(\\^o\\)": "&deg;",
        "\\(\\*\\)": "&times;",
        "\\(\\/\\)": "&divide;",
        "\\(oo\\)": "&infin;",
        "\\(~=\\)": "&asymp;",
        "\\(!=\\)": "&ne;",
        "\\(>=\\)": "&ge;",
        "\\(<=\\)": "&le;",
        "\\(\\+\\/\\-\\)": "&plusmn;",
        "\\(\\/o\\)": "&oslash;",
        "\\(o\\)": "&bull;",
        "\\(PI\\)": "&pi;",
        "\\(,u\\)": "&micro;",
        "\\(\\+\\-\\)": "&dagger;",
        "\\(\\+\\+\\)": "&Dagger;",
        "\\(SS\\)": "&sect;",
        "\\(<>\\)": "&diams;",
        "\\(<3\\)": "&hearts;",
        "\\(\\->\\)": "&spades;",
        "\\(\\-3\\)": "&clubs;",
        "\\(_\\)": "&nbsp;", // pevná mezera
        "\\(\\-\\)": "&shy;", // možné dělení slova
        "\\(v\\-\\)": "&radic;", // (v-) odmocnina
        "\\(f\\)": "&fnof;", // (f) italské ef
        "\\(<=>\\)": "&harr;",
        "\\(<=\\)": "&larr;",
        "\\(=>\\)": "&rarr;",
        "\\(<<>>\\)": "&loz;",
        "\\-\\-\\-": "&mdash;",
        "\\-\\-": "&ndash;",
        "\\(<<\\)": "&laquo;",
        "\\(>>\\)": "&raquo;",
        "\\(<\\)": "&lsaquo;",
        "\\(>\\)": "&rsaquo;",
        "\\'\\'": "&#39;",
        "\\\"\\\"": "&quot;",
        "\\.\\.\\.": "&hellip;", // trojtečka
        "__": "&#95;", // typografické podtržítko
        "\\^\\?": "&iquest;",
        "\\^\\!": "&iexcl;",
        "\\(E\\)": "&euro;",
        "\\(L\\)": "&pound;",
        "\\(Y\\)": "&yen;",
        "\\(C\\)": "&yen;",
        "\\(r\\)": "&reg;",
        "\\(c\\)": "&copy;",
        "\\(tm\\)": "&trade;",
    };

    static specialChars (str) {
        Each.in(StringConvert.#chRepl).do((rep, key) => str = str.replace(new RegExp(key, "g"), rep));
        return str;
    }

    static line (str) {
        return StringConvert.specialChars(str)
            .replace(/\*([^\s]+)?\b([^\*]+)\b([^\s]+)?\*/gi, '<b>$1$2$3</b>')
            .replace(/\_([^(\_|\s)]+)\_/gi, '<i>$1</i>')
            .replace(/\=([^\s]+)?\b([^\=]+)\b([^\s]+)?\=/gi, '<u>$1$2$3</u>')
            .replace(/\~([^\s]+)?\b([^\~]+)\b([^\s]+)?\~/gi, '<s>$1$2$3</s>')
            .replace(/\"([^\s]+)?\b([^\"]+)\b([^\s]+)?\"/gi, '„$1$2$3“')
            .replace(/\'([^\s]+)?\b([^\']+)\b([^\s]+)?\'/gi, '‚$1$2$3‘')
            .replace(/(\^\^)(.)/g, "<sub>$2</sub>")
            .replace(/(\^)(.)/g, "<sup>$2</sup>")
            .trim();
    }

    static multiline (str) {
        var a = [];
        Each.for(str.split("\n")).do((line) => {
            a.push(["<p>", StringConvert.line(line), "</p>"].join(""));
        });
        return a.join("");
    }
}
