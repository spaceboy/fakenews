
class CanvasImage {
    // Načte obrázek.
    static imageLoad (srcElement) {
        Elem.from("#canvas-image .image .picture")
            .attr({
                "data-original-height": srcElement.height,
                "data-original-width": srcElement.width
            });
        Elem.from("#canvas-image .image .picture").style({
            "backgroundImage": `url("${srcElement.src}")`
        });
        CanvasImage.imageResize();
    }

    static imageResize () {
        let imageElem = Elem.from("#canvas-image .image");
        let pictureElem = Elem.from("#canvas-image .image .picture");

        var height = Math.floor(parseInt(pictureElem.attr("data-original-height")) * imageElem.get().offsetWidth / parseInt(pictureElem.attr("data-original-width")));

        imageElem.style("height", height + "px");
        pictureElem
            .style({
                "backgroundPosition": Elem.valueById("form-image-align-horizontal") + " " + Elem.valueById("form-image-align-vertical"),
                "backgroundSize": "cover",
                "backgroundRepeat": "no-repeat",
            })
        Elem.from("#form-image-height").value(height);
    }
}

// Nastavit accordeony:
new Accordeon(document.getElementById("form-main"), "h3", "table-row-group");
Evnt.fire('h3[data-accordeon="table-block-title"]', "click");

// Nastavit defaultní hodnoty:
Each.all("#form-main *[data-default-value]").do((el) => {
    el.value = el.getAttribute("data-default-value");
    Evnt.fire(el, "change", true);
});
// Dafaultní hodnota pro datum:
Evnt.fire(
    Elem
        .from("#form-date")
        .value((function (d) {return d.getDate() + "." + (parseInt(d.getMonth()) + 1) + "." + d.getFullYear();})(new Date()))
        .get(),
    "change",
    true
);

// Inicializace menu:
Menu.init("#menu-main");
