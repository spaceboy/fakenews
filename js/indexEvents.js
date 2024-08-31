// Handle events on #form-main.
Evnt.on("#form-main", {
    "change": (e) => {
        e.preventDefault();
        let t = e.target;
        let v = Elem.from(t).value();
        switch (t.getAttribute("name")) {
            // Hlavička:
            /*
            case "header-image-url":
                Elem.from(t).removeClass("error");
                if (v) {
                    LoadImage.fromUrl(
                        v,
                        CanvasImage.imageLoad,
                        (err) => Elem.from(t).addClass("error"),
                        null,
                        {
                            "imageElem": Elem.from("#canvas-image .image"),
                            "pictureElem": Elem.from("#canvas-image .image .picture"),
                            "formElem": Elem.from("#form-header-image-height"),
                            "event": e
                        }
                    );
                    Elem.from("#form-header-image").value("");
                }
                break;
            case "header-image":
                LoadImage.fromInputElement(
                    t,
                    CanvasImage.imageLoad,
                    null,
                    null,
                    {
                        "imageElem": Elem.from("#canvas-image .image"),
                        "pictureElem": Elem.from("#canvas-image .image .picture"),
                        "formElem": Elem.from("#form-header-image")
                    }
                );
                Elem.from("#form-header-image-url").value("");
                break;
            */
            case "header-font-family":
                Elem.from("#headline").style("font-family", v);
                if (Elem.from("#form-header-subheadline-headlinefont").get().checked) {
                    Elem.from("#subheadline").style("font-family", v);
                }
                break;
            case "header-font-size":
                Elem.from("#headline").style("font-size", v);
                break;
            case "header-margin-top":
                Elem.from("#headline").style("margin-top", v);
                break;
            case "header-margin-bottom":
                Elem.from("#headline").style("margin-bottom", v);
                break;
            case "header-margin-left":
                Elem.from("#headline").style("margin-left", v);
                break;
            case "header-margin-right":
                Elem.from("#headline").style("margin-right", v);
                break;
            case "header-text-align":
                Elem.from("#headline").style("text-align", v);
                break;
            case "header-shadow":
                Elem.from("#headline").style("textShadow", v);
                break;
            case "header-subheadline-align":
                Elem.from("#subheadline").style("text-align", v);
                break;
            case "header-subheadline-margin-bottom":
                Elem.from("#canvas-title").style("margin-top", v);
                break;
            case "header-subheadline-headlinefont":
                Elem.from("#subheadline").style("font-family", (t.checked ? Elem.from("#headline").style("font-family") : "inherit"));
                break;
            case "header-subheadline-font-size":
                Elem.from("#subheadline").style("font-size", v);
                break;
            case "header-subheadline-inverse":
                Elem.from("#subheadline").switchClass("inverse", t.checked);
                break;
            case "header-subheadline-style":
                Elem.from("#subheadline").toggleClass(
                    v,
                    [
                        "hands",
                        "yin-yang",
                        "wine-glass",
                        "venus",
                        "venus-mars",
                        "mars",
                        "mars-venus",
                        "user",
                        "trophy",
                        "tree",
                        "theater",
                        "stethoscope",
                        "star",
                        "spider",
                        "skull",
                        "skull-bones",
                        "mask",
                        "futbol",
                        "fire",
                        "compass",
                        "lightbulb",
                        "horsehead",
                        "tabletennis",
                        "painting",
                        "magnificent-glass",
                        "writings"
                    ]
                );
                break;
            case "header-show":
                Elem.from("#header").style("display", (t.checked ? "block" : "none"));
                Elem.from("#form-article-thin").checked(t.checked).trigger("change", {"bubbles": true});
                break;
            // Titulek & datum:
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
            // Perex:
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
            // Obrázek:
            case "image-url":
                Elem.from(t).removeClass("error");
                if (v) {
                    LoadImage.fromUrl(
                        v,
                        CanvasImage.imageLoad,
                        (err) => Elem.from(t).addClass("error"),
                        null,
                        {
                            "imageElem": Elem.from("#canvas-image .image"),
                            "pictureElem": Elem.from("#canvas-image .image .picture"),
                            "formElem": Elem.from("#form-image-height"),
                            "event": e
                        }
                    );
                    Elem.from("#form-image").value("");
                }
                break;
            case "image":
                LoadImage.fromInputElement(
                    t,
                    CanvasImage.imageLoad,
                    null,
                    null,
                    {
                        "imageElem": Elem.from("#canvas-image .image"),
                        "pictureElem": Elem.from("#canvas-image .image .picture"),
                        "formElem": Elem.from("#form-image-height")
                    }
                );
                Elem.from("#form-image-url").value("");
                break;
            case "image-height":
                Elem.from("#canvas-image .image").style("height", v);
                break;
            case "image-width":
                Elem.from("#canvas").toggleClass(v, ["fullwidth", "halfwidth"]);
                CanvasImage.imageResize(
                    Elem.from("#canvas-image .image"),
                    Elem.from("#canvas-image .image .picture"),
                    Elem.from("#form-image-height")
                );
                switch (v) {
                    case "halfwidth":
                        Elem.from("#form-perex-position").val("before").attr("disabled", "true");
                        break;
                    case "fullwidth":
                    default:
                        Elem.from("#form-perex-position").attrRemove("disabled");
                        break;
                }
                break;
            case "image-align-vertical":
            case "image-align-horizontal":
                Elem.from("#canvas-image .image .picture").style(
                    "backgroundPosition",
                    Elem.valueById("form-image-align-horizontal") + " " + Elem.valueById("form-image-align-vertical")
                );
                break;
            case "image-flip-horizontally":
                Elem.from("#canvas-image .image .picture").switchClass("flipped", t.checked);
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
            // Článek:
            case "article-align":
                Elem.from("#canvas .article").style("textAlign", v);
                break;
            case "article-thin":
                Elem.from("#article").switchClass("thin", t.checked);
                CanvasImage.imageResize(
                    Elem.from("#canvas-image .image"),
                    Elem.from("#canvas-image .image .picture"),
                    Elem.from("#form-image-height")
                );
                break;
            // Šablona:
            case "template":
                Elem.from("#canvas").toggleClass(v, ["web", "press-bask", "press", "retro", "vintage", "vintage2", "historic"]);
                break;
        }
    }
});

Evnt.on("#form-main", {
    "keyup": (e) => {
        e.preventDefault();
        let t = e.target;
        let v = Elem.from(t).value();
        switch (t.getAttribute("name")) {
            case "header-text":
                var headline = StringConvert.line(v);
                Elem.from("#headline").html(headline);
                if (headline) {
                    document.title = `${headline} [Fakenews]`
                    .replace(/\&[^;]*;/g, "")
                    .replace(/\<[^\>]*\>/g, "")
                    .trim();
                }
                Elem.from("#form-header-show").checked(headline).trigger("change", {"bubbles": true});
                break;
            case "header-subheadline-text":
                Elem.from("#subheadline").html(StringConvert.line(v));
                break;
            case "title":
                Elem.from("#canvas-title").html(StringConvert.line(v));
                break;
            case "perex":
                Elem.from("#canvas .perex").html(StringConvert.multiline(v));
                break;
            case "image-description":
            case "image-author":
                let text = StringConvert.line(Elem.valueById("form-image-description").trim());
                let author = Elem.valueById("form-image-author").trim();
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
        }
    }
});

// Automatický výpočet výšky obrázku:
Evnt.on("#form-image-height-auto", "click", (e) => {
    e.preventDefault();
    CanvasImage.imageResize(
        Elem.from("#canvas-image .image"),
        Elem.from("#canvas-image .image .picture"),
        Elem.from("#form-image-height")
    );
});

// Označení celého textu v image URL inputu:
Evnt.on("#form-image-url", "focus", (e) => {
    e.currentTarget.selectionStart = 0;
    e.currentTarget.selectionEnd = e.currentTarget.value.length;
});

// Download image:
function downloadImage (dataUrl) {
    let link = document.createElement("a");
    let filename = Elem.valueById("form-filename");
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
                LoadImage.fromUrl(
                    e.target.result,
                    CanvasImage.imageLoad,
                    null,
                    function (params) {
                        Elem.from("#form-image-url").value("[Obrázek ze schránky]");
                    },
                    {
                        "imageElem": Elem.from("#canvas-image .image"),
                        "pictureElem": Elem.from("#canvas-image .image .picture"),
                        "formElem": Elem.from("#form-image-height"),
                        "event": e
                    }
                );
            };
            reader.readAsDataURL(blob);
        }
    }
});

// Source code download.
Evnt.on("#source-download", "click", (e) => {
    FileDownload.downloadJson(
        Elem.from("#form-filename").val() + ".json",
        (new SourceCodeFakeNews()).get()
    );
});

// Source code upload.
Evnt.on("#source-upload", "click", (e) => {
    (new FileUploadText(""))
        .onLoad(SourceCodeFakeNews.applySource)
        .upload();
});

// Načíst a zobrazit příklady.
Evnt.onAll("button.example", "click", (e) => {
    e.preventDefault();
    Examples.show(e.currentTarget.getAttribute("data-example"));
});