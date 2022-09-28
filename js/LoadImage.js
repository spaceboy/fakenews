class LoadImage {
    static #getImage (onSuccess, onError, onFinally, params) {
        if (!onError) {
            onError = function (e, params) {
                console.log(e, params);
            };
        }
        var image = new Image();
        Evnt.on(image, {
            "load": (e) => {
                onSuccess(e.srcElement, params);
                if (onFinally) {
                    onFinally(params);
                }
            },
            "error": (e) => {
                onError(e, params);
                if (onFinally) {
                    onFinally(params);
                }
            }
        });
        return image;
    }

    static fromUrl (url, onSuccess, onError, onFinally, params) {
        LoadImage.#getImage(onSuccess, onError, onFinally, params).src = url;
    }

    static fromInputElement (el, onSuccess, onError, onFinally, params) {
        var fr = new FileReader;
        fr.addEventListener("load", (e) => {
            LoadImage.#getImage(onSuccess, onError, onFinally, params).src = e.target.result;
        });
        fr.readAsDataURL(el.files[0]);
    }
}
