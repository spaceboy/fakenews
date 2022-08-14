class Examples {
    static #example = {
        "brno": {
            "form-title": "Měsíc trvá už mnoho měsíců, zjistili brněnští vědci",
            "form-perex": "Po mnohaměsíčním úsilí brněnští vědci zjistili, že Měsíc je starší, než jsme čekali. Podle jejich měření trvá už nejméně třiatřicet měsíců.",
            "form-image-url": "https://spaceboy.github.io/fakenews/gfx/test01-half-moon.jpg",
            "form-image-description": "Měsíc je starší, než brněnští vědci pamatují",
            "form-image-author": "foto JPP",
            "form-agency": "Brno (JPP)",
            "form-article": "",
            "form-template": "retro"
        }
    };

    static #applyValues (data) {
        Each.of("#form-main", "input, select, textarea").do((el) => {
            if (el.id === "form-image") {
                return;
            }
            if (data.hasOwnProperty(el.id)) {
                Elem.from(el).value(data[el.id]).trigger("change", {"bubbles": true});
                return;
            }
            if (data.hasOwnProperty("data-default-value")) {
                Elem.from(el).value(el.getAttribute("data-default-value")).trigger("change", {"bubbles": true});
                return;
            }
            if (el.tagName === "SELECT") {
                if (!el.hasOwnProperty("options") || !el.options.length) {
                    return;
                }
                el.value = el.options[0].value;
            } else {
                el.value = "";
            }
            Elem.from(el).value(el.getAttribute("data-default-value")).trigger("change", {"bubbles": true});
        });
    }

    static show (label) {
        if (!Examples.#example.hasOwnProperty(label)) {
            return;
        }
        Evnt.trigger('li[data-menu-target="#panel-editor"]', "click");
        Examples.#applyValues(Examples.#example[label]);
    }
}