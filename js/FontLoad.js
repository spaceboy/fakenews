class FontLoad {

    scriptNode;

    constructor () {
        this.scriptNode = document.currentScript;
        if (this.scriptNode.hasAttribute('data-url-googlefonts')) {
            this.load.call(this, this.scriptNode.getAttribute('data-url-googlefonts'));
        }
    }

    afterLoad (content) {
        // Create STYLE element:
        let s = document.createElement('style');
        s.innerHTML = content;
        this.scriptNode.parentNode.insertBefore(s, this.scriptNode);

        // Create OPTIONS list and place it into SELECT element:
        if (this.scriptNode.hasAttribute("data-select-fill-options")) {
            var a = [], o = [], r = document.querySelector("head > style").sheet.cssRules;
            for (var i = 0, l = r.length; i < l; ++i) {
                var ff = r[i].style.cssText.match(/font-family: \"([^\"]*)\"/);
                if (ff && ff.length >= 2) {
                    a[ff[1]] = '';
                }
            };
            for (var i in a) {
                o.push(`<option value="${i}">${i}</option>`);
            };
            for (var e of document.querySelectorAll(this.scriptNode.getAttribute("data-select-fill-options"))) {
                e.innerHTML = o.join("");
            };
        }
    }

    load (url) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                this.afterLoad(ajax.responseText);
            }
        }
        ajax.open("GET", url, true);
        ajax.send();
        return this;
    }
}

new FontLoad();