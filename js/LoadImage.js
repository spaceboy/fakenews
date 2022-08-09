class LoadImage {
    static #getImage (onSuccess, onError) {
        if (!onError) {
            onError = function (e) {
                console.log(e);
            };
        }
        var image = new Image();
        Evnt.on(image, {
            "load": (e) => {onSuccess(e.srcElement);},
            "error": (e) => {onError(e);}
        });
        return image;
    }

    static fromUrl (url, onSuccess, onError) {
        LoadImage.#getImage(onSuccess, onError).src = url;
    }

    static fromInputElement (el, onSuccess, onError) {
        var fr = new FileReader;
        fr.addEventListener("load", (e) => {
            LoadImage.#getImage(onSuccess, onError).src = e.target.result;
        });
        fr.readAsDataURL(el.files[0]);
    }
}
