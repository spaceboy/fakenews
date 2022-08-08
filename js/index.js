Elem.from("#form-date").value((function (d) {return d.getDate() + "." + (parseInt(d.getMonth()) + 1) + "." + d.getFullYear();})(new Date()));

Elem
    .from('#canvas-image .image .picture')
    .style({
        "background": '#ccc url("gfx/test01.jpg") no-repeat scroll 0% 0%',
        "backgroundSize": "cover"
    });
Elem
    .from("#canvas-image .image")
    .style({
        "height": "418px",
        "width": "640px"
    });


function imageLoad (e) {
    let imageElem = Elem.from("#canvas-image .image");

    var height = Math.floor(e.srcElement.height * imageElem.get().offsetWidth / e.srcElement.width);

    imageElem.style("height", height + "px");
    Elem.from("#canvas-image .image .picture").style("background", `url("${e.srcElement.src}") no-repeat scroll 0% 0% / cover`);
    Elem.from("#form-image-height")
        .value(height)
        .attr("data-auto-height", height);
}

class ImageLoader {
    image

    constructor () {
        this.image = new Image();
        Evnt.on(this.image, {
            "load": imageLoad,
            "error": (e) => {
                console.log(e);
            }
        })
    }

    fromUrl (url) {
        this.image.src = url;
    }

    fromInputElement (el) {
        var fr = new FileReader;
        fr.addEventListener("load", (e) => {
            this.image.src = e.target.result;
        });
        fr.readAsDataURL(el.files[0]);
    }
}

// Nastavit accordeony:
new Accordeon(document.getElementById("form-main"));
Evnt.fire('h3[data-accordeon="table-block-title"]', "click");

// Nastavit defaultní hodnoty:
Each.all("#form-main *[data-default-value]").do((el) => {
    el.value = el.getAttribute("data-default-value");
});