class FontLoad {

    // Name of SCRIPT HTML attribute containing query-selector of HTML SELECT tags designated to create/extend its OPTION list.
    attributeNameElementsSelector = "data-font-load-select-elements";

    attributeNameOptionsMode = "data-font-load-mode";

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

        if (!this.scriptNode.hasAttribute(this.attributeNameElementsSelector)) {
            return;
        }

        // Create OPTIONS list:
        var a = [], o = [], r = s.sheet.cssRules;
        for (var i = 0, l = r.length; i < l; ++i) {
            var ff = r[i].style.cssText.match(/font-family: \"([^\"]*)\"/);
            if (ff && ff.length >= 2) {
                a[ff[1]] = '';
            }
        };

        // Place OPTIONS list to target elements
        for (var i in a) {
            o.push(`<option value="${i}">${i}</option>`);
        };
        for (var e of document.querySelectorAll(this.scriptNode.getAttribute(this.attributeNameElementsSelector))) {
            switch (this.scriptNode.getAttribute(this.attributeNameOptionsMode)) {
                case "replace":
                    e.innerHTML = o.join("");
                    break;
                case "append":
                default:
                    e.innerHTML = e.innerHTML + o.join("");
            }
        };
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