Evnt.on("#form-main", {
    "change": (e) => {
        e.preventDefault();
        let t = e.target;
        let v = Elem.from(t).value();
        switch (t.getAttribute("name")) {
            case "title":
                Elem.from("#canvas-title").html(StringConvert.line(v));
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
                (new ImageLoader()).fromUrl(v);
                break;
            case "image":
                (new ImageLoader()).fromInputElement(t);
                break;
            case "image-height":
                Elem.from("#canvas-image .image").style("height", v);
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
                let text = Elem.valueById("form-image-description").trim();
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
            case "template":
                Elem.from("#canvas").class(v);
                break;
        }
    },
    "click": (e) => {
        let t = e.target;
        switch (t.getAttribute("name")) {
            case "image-height-auto":
                e.preventDefault();
                var i = Elem.from("#form-image-height");
                var h = i.attr("data-auto-height");
                if (h) {
                    i.value(h);
                    Elem.from("#canvas-image .image").style("height", h + "px");
                }
                break;
        }
    }
});

Evnt.on("#btn-download", "click", (e) => {
    e.preventDefault();
    domtoimage
        .toJpeg(
            document.getElementById("canvas"),
            {
                quality: 0.9
            }
        )
        .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = "fakenews.jpg";
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            alert("ERROR\n" + error);
        });
});