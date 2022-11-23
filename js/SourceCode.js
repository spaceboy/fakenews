class SourceCode {
    headerJsonX = ""

    application = {
        "name": "ApplicationName",
        "url": "https://application.public.url",
        "version": "1.0.0",
        "authors": []
    };

    versionRequired = "^1.0.0";

    inputField = [];

    filterGet = {};

    filterApply = {};

    setApplicationName (appName) {
        this['application']['name'] = appName;
        return this;
    }

    setApplicationUrl (appUrl) {
        this['application']['url'] = appUrl;
        return this;
    }

    setApplicationVersion (appVer) {
        this['application']['version'] = appVer;
        return this;
    }

    addApplicationAuthor (name, email, homepage, role) {
        if (name === undefined) {
            return this;
        }
        var author = {
            "name": name
        };
        if (email !== undefined) {
            author['email'] = email;
        }
        if (homepage !== undefined) {
            author['homepage'] = homepage;
        }
        if (role !== undefined) {
            author['role'] = role;
        }
        this['application']['authors'].push(author);
        return this;
    }

    onError (e) {
        console.log("Error.");
    }

    get () {
        var data = {};
        Each
            .for(this.inputField)
            .do((id) => {
                data[id] = (
                    this.filterGet.hasOwnProperty(id)
                    ? this.filterGet[id](id)
                    : Elem.from(document.getElementById(id)).value()
                );
            });
        return (this.headerJsonX ? this.headerJsonX : "")
            + JSON.stringify(
                {
                    "application": this.application,
                    "data": data
                },
                null,
                4
            );
    }

    apply (source) {
        try {
            var data = JSON.parse(source);
        } catch (e) {
            this.onError(e);
            return;
        }
        Each
            .for(this.inputField)
            .do((id) => {
                var el = document.getElementById(id);
                if (this.filterApply.hasOwnProperty(id)) {
                    this.filterApply[id](data["data"][id]);
                } else {
                    Elem.from(el).val(data["data"][id]);
                    Evnt.trigger(el, "change", true);
                }
            });
        return this;
    }
};

class SourceCodeFakeNews extends SourceCode {
    /*
    headerJsonX = ""
        + "#  _____     _          _   _                   _\n"
        + "# |  ___|_ _| | _____  | \\ | | _____      _____| |\n"
        + "# | |_ / _` | |/ / _ \\ |  \\| |/ _ \\ \\ /\\ / / __| |\n"
        + "# |  _| (_| |   <  __/ | |\\  |  __/\\ V  V /\\__ \\_|\n"
        + "# |_|  \\__,_|_|\\_\\___| |_| \\_|\\___| \\_/\\_/ |___(_)\n"
        + "#\n"
        + "# Fake News! web application configuration file.\n"
        + "# Don't modify it, unless you understand its format.\n"
        + "#\n";
    */

    versionRequired = "^1.0.0";

    inputField = [
        "form-header-text",
        "form-header-font-family",
        "form-header-font-size",
        "form-header-text-align",
        "form-header-shadow",
        "form-header-margin-top",
        "form-header-margin-bottom",
        "form-header-margin-left",
        "form-header-margin-right",
        "form-header-subheadline-text",
        "form-header-subheadline-align",
        "form-header-subheadline-margin-bottom",
        "form-header-subheadline-headlinefont",
        "form-header-subheadline-font-size",
        "form-header-subheadline-inverse",
        "form-header-subheadline-style",
        "form-header-show",
        "form-title",
        "form-title-align",
        "form-date",
        "form-perex",
        "form-perex-align",
        "form-perex-position",
        "form-image-align-horizontal",
        "form-image-flip-horizontally",
        "form-image-filter-blur",
        "form-image-filter-grayscale",
        "form-image-filter-sepia",
        "form-image-filter-contrast",
        "form-image-blured-border",
        "form-image-raster",
        "form-image-raster-size",
        "form-image-raster-granularity",
        "form-image-raster-opacity",
        "form-image-raster-light",
        "form-image-description",
        "form-image-author",
        "form-agency",
        "form-article",
        "form-article-align",
        "form-template",
        "form-filename",
        "form-fileformat",
        "form-image-url",
        "form-image-width",
        "form-image-height"
    ]

    filterGet = {
        "form-image-url": (id) => Elem.from("#canvas-image .image .picture").style("background-image")
    }

    filterApply = {
        "form-image-url": (value) => {
            Elem.from("#form-image").val("");
            Elem.from("#form-image-url").val("[Obrázek načtený ze souboru]");
            Elem.from("#canvas-image .image .picture").style("background-image", value);
        }
    }

    static applySource (source) {
        return (new SourceCodeFakeNews).apply(source);
    }
}