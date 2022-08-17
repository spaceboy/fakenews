// Handle events on #form-main.
Evnt.on("#form-main", {
    "change": (e) => {
        e.preventDefault();
        let t = e.target;
        let v = Elem.from(t).value();
        switch (t.getAttribute("name")) {
            case "title":
                Elem.from("#canvas-title").html(StringConvert.line(v));
                break;
            case "title-align":
                Elem.from("#canvas-title").style("textAlign", v);
                break;
            case "date":
                v = v.trim();
                if (v) {
                    Elem.from("#canvas-datetime").html(v);
                    Elem.from("#canvas .datetime").style("display", "block");
                } else {
                    Elem.from("#canvas .datetime").style("display", "none");
                }
                break;
            case "perex":
                Elem.from("#canvas .perex").html(StringConvert.multiline(v));
                break;
            case "perex-align":
                Elem.from("#canvas .perex").style("textAlign", v);
                break;
            case "perex-position":
                switch (v) {
                    case "after":
                        Elem.from("#canvas .perex").style("order", 5);
                        Elem.from("#canvas #canvas-image").style("order", 4);
                        break;
                    case "before":
                    default:
                        Elem.from("#canvas .perex").style("order", 4);
                        Elem.from("#canvas #canvas-image").style("order", 5);
                }
                break;
            case "image-url":
                Elem.from(t).removeClass("error");
                if (v) {
                    LoadImage.fromUrl(v, CanvasImage.imageLoad, (err) => Elem.from(t).addClass("error"));
                    Elem.from("#form-image").value("");
                }
                break;
            case "image":
                LoadImage.fromInputElement(t, CanvasImage.imageLoad);
                Elem.from("#form-image-url").value("");
                break;
            case "image-height":
                Elem.from("#canvas-image .image").style("height", v);
                break;
            case "image-width":
                Elem.from("#canvas").toggleClass(v, ["fullwidth", "halfwidth"]);
                CanvasImage.imageResize();
                switch (v) {
                    case "halfwidth":
                        Elem.from("#form-perex-position").val("before").attr("disabled", "true");
                        break;
                    case "fullwidth":
                    default:
                        Elem.from("#form-perex-position").attrRemove("disabled");
                        break;
                };
                break;
            case "image-align-vertical":
            case "image-align-horizontal":
                Elem.from("#canvas-image .image .picture").style(
                    "backgroundPosition",
                    Elem.valueById("form-image-align-horizontal") + " " + Elem.valueById("form-image-align-vertical")
                );
                break;
            case "blur":
            case "grayscale":
            case "sepia":
            case "contrast":
                var f = [];
                Each.all('#form-main [data-group="filter"]').do((i) => {
                    f.push(`${i.name}(${(i.hasAttribute("data-postfix") ? i.value + i.getAttribute("data-postfix") : i.value)})`);
                });
                Elem.from("#canvas-image .image .picture").style("filter", f.join(" "));
                break;
            case "blured-border":
                Elem.from("#canvas-image .image .border").style({
                    "display": (v === "0px" ? "none" : "block"),
                    "filter": `blur(${v})`
                });
                break;
            case "image-raster":
            case "raster-size":
            case "raster-granularity":
            case "raster-opacity":
            case "raster-light":
                var rSize = Elem.valueById("form-image-raster-size");
                var rGran = Elem.valueById("form-image-raster-granularity");
                var rGrnH = rGran / 2;
                var dotColor = (Elem.from("#form-image-raster-light").checked() ? "white" : "black");
                Elem.from("#canvas-image .image .raster").style({
                    "backgroundImage": `radial-gradient(${dotColor} ${rSize}, transparent ${rSize}), radial-gradient(${dotColor} ${rSize}, transparent ${rSize})`,
                    "backgroundPosition": `0 0, ${rGrnH}px ${rGrnH}px`,
                    "backgroundSize": `${rGran}px ${rGran}px`,
                    "display": (Elem.from("#form-image-raster").checked() ? "block" : "none"),
                    "opacity": Elem.valueById("form-image-raster-opacity")
                });
                break;
            case "image-description":
            case "image-author":
                let text = StringConvert.line(Elem.valueById("form-image-description").trim());
                var author = Elem.valueById("form-image-author").trim();
                if (text && author) {
                    author = ` &bull; ${author}`;
                }
                Elem.from("#canvas-image-description").html(text + author);
                break;
            case "agency":
            case "article":
                Elem.from("#canvas .article").html((function () {
                    var agency = Elem.valueById("form-agency").trim();
                    var article = Elem.valueById("form-article");
                    return StringConvert.multiline(agency ? `<b>${agency} &bull;</b> ` + article : article);
                })());
                break;
            case "article-align":
                Elem.from("#canvas .article").style("textAlign", v);
                break;
            case "template":
                Elem.from("#canvas").toggleClass(v, ["web", "press", "retro", "vintage", "vintage2", "historic"]);
                break;
        }
    }
});

// Automatický výpočet výšky obrázku:
Evnt.on("#form-image-height-auto", "click", (e) => {
    e.preventDefault();
    CanvasImage.imageResize();
});

// Označení celého textu v image URL inputu:
Evnt.on("#form-image-url", "focus", (e) => {
    e.currentTarget.selectionStart = 0;
    e.currentTarget.selectionEnd = e.currentTarget.value.length;
});

// Download image:
function downloadImage (dataUrl) {
    var link = document.createElement("a");
    var filename = Elem.valueById("form-filename");
    if (!filename) {
        filename = "fakenews";
    }
    link.download = filename + "." + Elem.valueById("form-fileformat");
    link.href = dataUrl;
    link.click();
    Splash.hide();
}
function showError (error) {
    Splash.hide();
    alert("ERROR\n" + error);
}

// Generate and then download image.
Evnt.on("#btn-download", "click", (e) => {
    e.preventDefault();
    Splash.show();
    switch (Elem.valueById("form-fileformat")) {
        case "png":
            domtoimage
                .toPng(document.getElementById("canvas"))
                .then(downloadImage)
                .catch(showError);
            break;
        case "jpg":
        default:
            domtoimage
                .toJpeg(document.getElementById("canvas"), {"quality": 0.9})
                .then(downloadImage)
                .catch(showError);
    }
});

// Image preview:
Evnt.on("#btn-image", "click", (e) => {
    e.preventDefault();
    Splash.show();
    domtoimage
        .toPng(document.getElementById("canvas"))
        .then((dataUrl) => {
            Splash.hide();
            document.getElementById("popup-background").style.display = "flex";
            document.getElementById("popup-image").src = dataUrl;
        })
        .catch(showError);
});
Evnt.on("#popup-background", "click", (e) => {
    e.stopPropagation();
    document.getElementById("popup-background").style.display = "none";
});
Evnt.on("#popup-image", "click", (e) => {
    e.stopPropagation();
    Elem.from(e.currentTarget.closest("div")).toggleClass("zoom");
});

// Vložit obrázek ze schránky (jen v inputu Obrázek z URL).
Evnt.on("#form-image-url", "paste", (e) => {
    let items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (var index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            var blob = item.getAsFile();
            var reader = new FileReader();
            reader.onload = function(e) {
                LoadImage.fromUrl(e.target.result, CanvasImage.imageLoad);
            };
            reader.readAsDataURL(blob);
        }
    }
});

// Načíst a zobrazit příklady.
Evnt.onAll("button.example", "click", (e) => {
    e.preventDefault();
    Examples.show(e.currentTarget.getAttribute("data-example"));
});