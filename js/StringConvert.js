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
        "\\(PI\\)": "&pi;",
        "\\(,u\\)": "&micro;",
        "\\(\\+\\-\\)": "&dagger;",
        "\\(\\+\\+\\)": "&Dagger;",
        "\\(SS\\)": "&sect;",

        "\\(<>\\)": "&diams;",
        "\\(<3\\)": "&hearts;",
        "\\(-3\\)": "&spades;",
        "\\(\\=3\\)": "&clubs;",

        // "\\(v\\)": "&diams;", // fajfka
        "\\(v\\-\\)": "&radic;", // (v-) odmocnina
        "\\(f\\)": "&fnof;", // (f) italské ef

        "\\(<=>\\)": "&harr;",
        "\\(<=\\)": "&larr;",
        "\\(=>\\)": "&rarr;",
        "\\(<<>>\\)": "&loz;",
        "\\-\\-\\-": "&mdash;",
        "\\-\\-": "&ndash;",
        "\\'\\'": "&#39;",
        "\\\"\\\"": "&quot;",
        "\\.\\.\\.": "&hellip;",
        "__": "&#95;",
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
        str = StringConvert.specialChars(str);
        str = str.replace(/\*([^\s]+)?\b([^\*]+)\b([^\s]+)?\*/gi, '<b>$1$2$3</b>');
        str = str.replace(/\_([^(\_|\s)]+)\_/gi, '<i>$1</i>');
        str = str.replace(/\=([^\s]+)?\b([^\=]+)\b([^\s]+)?\=/gi, '<u>$1$2$3</u>');
        str = str.replace(/\~([^\s]+)?\b([^\~]+)\b([^\s]+)?\~/gi, '<s>$1$2$3</s>');

        str = str.replace(/\"([^\s]+)?\b([^\"]+)\b([^\s]+)?\"/gi, '„$1$2$3“');


        str = str.replace(/\'([^\s]+)?\b([^\']+)\b([^\s]+)?\'/gi, '‚$1$2$3‘');


        str = str.replace(/(\^\^)(.)/g, "<sub>$2</sub>");
        str = str.replace(/(\^)(.)/g, "<sup>$2</sup>");
        return str.trim();
    }

    static multiline (str) {
        var a = [];
        Each.for(str.split("\n")).do((line) => {
            a.push(["<p>", StringConvert.line(line), "</p>"].join(""));
        });
        return a.join("");
    }
}
