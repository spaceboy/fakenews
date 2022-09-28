class Examples {
    static #example = {
        "vrsovice": {
            "form-header-show": false,
            "form-title": "Kdo nebyl v sobotu v Ďolíčku, žije zbytečně, shodují se učenci",
            "form-perex": "Nejuznávanější znalci z mezinárodní společnosti životního stylu a(_)vol(-)ného času promluvili jasnou řečí. To nejlepší, co člověk může v(_)Pra(-)ze přes neděli udělat, je návštěva vršovického Ďolíčku.",
            "form-image-url": "gfx/praha-1905.jpg",
            "form-image-description": "Plny očekávání kráčejí přední pražské dámy do proslulého Ďolíčku",
            "form-image-author": "foto archiv autora",
            "form-image-width": "halfwidth",
            "form-image-raster": true,
            "form-image-raster-opacity": ".25",
            "form-image-raster-light": true,
            "form-agency": "Vršovice (od našeho zvláštního zpravo(-)daje)",
            "form-article": "Kulturně-společenská akce roku. Takové přízvisko si ve Vr(-)šo(-)vi(-)cích zaslouží každé představení zeleno-bílých Klokanů.\nVěru to není označení nadnesené. Skvělá přátelská atmosféra vábí na stadion jak protřelé tygřice a lvy salonů, tak i(_)di(-)voké rebely z řad pražské bohémy, kapitány našeho průmyslu, studenty, dělníky i fabričky a(_)v(_)ne(-)pos(-)led(-)ní řadě též nesmělé hosty z venkova, kteří touží nalézti v(_)hlav(-)ním městě přátele.\nHned po vstupu na návštěvníkovy smysly útočí celá řada podnětů. Odvážné takty dechové hudby roznášené dovedně rozmístěnými ampliony po celém areálu. Lákavá vůně opékaných uzenek, pro(-)slu(-)lých \"klokaních klo(-)bás\" v(_)oby(-)čej(-)ném, pi(-)kant(-)ním a(_)bílém pro(-)ve(-)de(-)ní. Šumění čepovaného piva. Věru, není toho málo a(_)ne(-)ní divu, že se občas některým hostům z(_)té vší nabídky až zatočí hlava!\nPak se ozve ostré hvízdnutí -- neklamná známka toho, že konečně začíná to hlavní představení. Na čerstvě střižený svěží pažit zkrášlený sněhobílými liniemi vbíhají pestře odění hráči. Ti domácí v(_)tra(-)dič(-)ních zeleno-bílých uniformách se zdraví s(_)pub(-)likem; čiší z(_)nich odhodlání a(_)dych(-)tivost boje. Hosté přicházejí obvykle v(_)o(_)poz(-)nání zasmušilejší náladě; vědomi si toho, co je čeká. Novodobí gladiátoři se pozdraví s(_)trojicí sudích i(_)mezi sebou navzájem. Zápas začíná.\nNe, nebudeme se rozplývati nad atletickými výkony jednotlivců, ani jejich souhrou, jež si v ničem nezadá s(_)těmi nejvydařenějšími představeními baletních mistrů ze Zlaté kapličky, našeho Národního divadla. Nebudeme líčiti pěvecké výkony sboru umístěného za horní branou, jež v(_)širém světě sluje \"Die Meistersinger von Verschowitz\". Nenacházíme dostatek slov pro popis tak strhující podívané, tak dechberoucí krásy. Nebudeme ani jmenovat pány, kteří v(_)ex(-)ta(-)si po vstřelené brance zahazovali klobouky i(_)sklenice piva, a(_)už vůbec ne dámy s nadšením vrhající své korzety a(_)spod(-)ničky úspěšným sportsmanům. Nebudeme ani popisovat truchlivý odchod pokořeného soupeře zpět na domovskou Letnou. Místo toho se budeme raději držet hesla \"co se seběhlo v(_)Ďo(-)líč(-)ku, v(_)Ďo(-)líč(-)ku i(_)zůs(-)ta(-)ne.\nKoneckonců, již příště můžete být součástí tohoto dění i(_)vy sami.",
            "form-template": "retro"
        },
        "mars": {
            "form-header-show": false,
            "form-title": "Zdražují nejen aerolinky. Cestování na Mars podražilo o(_)miliony procent",
            "form-perex": "Náročnější cestovatelé, kteří vyhledávají méně obvyklé turistické des(-)ti(-)na(-)ce, musejí letos do peněženky sáhnout poněkud hlouběji. Alespoň pokud zatouží podívat se s(_)Elonem Muskem na Mars.",
            "form-perex-position": "before",
            "form-image-url": "gfx/trip-to-mars.jpg",
            "form-image-width": "fullwidth",
            "form-image-height": "440",
            "form-image-align-vertical": "bottom",
            "form-image-filter-contrast": 200,
            "form-image-filter-grayscale": 100,
            "form-image-raster": true,
            "form-image-raster-light": true,
            "form-image-description": "V roce 1911 se výlet na Mars dal pořídit za deset amerických centů. Nyní vyjde na statisíce dolarů",
            "form-image-author": "",
            "form-article": "",
            "form-template": "press",
        }
    };

    static #applyValues (data) {
        var change = new Event("change", {"bubbles": true});
        Each.of("#form-main", "input, select, textarea").do((el) => {
            if (el.id === "form-image") {
                return;
            }
            if (el.id === "form-image-url") {
                return;
            }
            if (data.hasOwnProperty(el.id)) {
                Elem.from(el).value(data[el.id]).trigger(change);
                return;
            }
            if (el.hasAttribute("data-default-value")) {
                Elem.from(el).value(el.getAttribute("data-default-value")).trigger(change);
                return;
            }
            if (el.tagName === "SELECT") {
                var elem = Elem.from(el);
                Elem.from(el).value(elem.options(0).value).trigger(change);
                return;
            }
            Elem.from(el).value("").trigger(change);
        });
        // Oprava pro speciální případy (např. přepsané změnou další položky):
        Each.for(["form-image-height"]).do((id) => {
            if (!data.hasOwnProperty(id)) {
                return;
            }
            Elem.from(document.getElementById(id)).value(data[id]).post(change);
        });
    }

    static show (label) {
        if (!Examples.#example.hasOwnProperty(label)) {
            return;
        }
        Evnt.trigger('li[data-menu-target="#panel-editor"]', "click");
        if (Examples.#example[label].hasOwnProperty("form-image-url")) {
            LoadImage.fromUrl(
                Examples.#example[label]["form-image-url"],
                (srcElement, onSuccess, onError, onFinally, params) => {
                    CanvasImage.imageLoad(srcElement, params);
                    Examples.#applyValues(Examples.#example[label]);
                },
                (err) => Elem.from("#form-image-url").addClass("error"),
                null,
                {
                    "imageElem": Elem.from("#canvas-image .image"),
                    "pictureElem": Elem.from("#canvas-image .image .picture"),
                    "formElem": Elem.from("#form-image-height")
                }
            );
        } else {
            Examples.#applyValues(Examples.#example[label]);
        }
    }
}

function save () {
    var data = {};
    Each
    .for([
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
        "form-header-subheadline-headlinefont",
        "form-header-subheadline-font-size",
        "form-header-subheadline-inverse",
        "form-header-subheadline-hands",
        "form-header-show",
        "form-title",
        "form-title-align",
        "form-date",
        "form-perex",
        "form-perex-align",
        "form-perex-position",
        "form-image-height",
        "form-image-width",
        "form-image-align-horizontal",
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
        "form-fileformat"
    ])
    .do((id) => {
        data[id] = Elem.from(document.getElementById(id)).value();
    });

    data["form-image"] = "";
    data["form-image-url"] = Elem.from("#canvas-image .image .picture").style("backgroundImage");

    data["form-header-image"] = "";
    data["form-header-image-url"] = "";

    return ""
        + "#  _____     _          _   _                   _\n"
        + "# |  ___|_ _| | _____  | \\ | | _____      _____| |\n"
        + "# | |_ / _` | |/ / _ \\ |  \\| |/ _ \\ \\ /\\ / / __| |\n"
        + "# |  _| (_| |   <  __/ | |\\  |  __/\\ V  V /\\__ \\_|\n"
        + "# |_|  \\__,_|_|\\_\\___| |_| \\_|\\___| \\_/\\_/ |___(_)\n"
        + "#\n"
        + "# Fake News! web application configuration file.\n"
        + "# Don't modify it, unless you understand its format.\n"
        + "#\n"
        + JSON.stringify(
            {
                "header": {
                    "application": {
                        "name": "FakeNews",
                        "url": "https://spaceboy.github.io/fakenews/",
                        "version": "1.0"
                    }
                },
                "data": data
            },
            null,
            4
        );
}
