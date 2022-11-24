class Editor {
    textarea;

    syllableSeparator = "(-)";

    syllableLen = 7;

    constructor (el) {
        this.textarea = el;
        el.addEventListener("keydown", (e) => {
            // Preformat (Ctrl+Alt+P) - Prepare soft hyphenation:
            if (e.altKey && e.ctrlKey && "pP".indexOf(e.key) !== -1) {
                e.preventDefault();
                e.stopPropagation();
                this.hyphenate();
            }
        });
    }

    // Prepare hyphenation
    // Add hyphenation string (glue, default = this.syllableSeparator)
    // between syllables of words longer than (len, defualt = this.syllableLen)
    // and then trigger "keyup" and "change" events on textarea.
    hyphenate (len, glue) {
        if (!len) {
            len = this.syllableLen;
        }
        if (!glue) {
            glue = this.syllableSeparator;
        }
        this.textarea.value = this.textarea.value.split(" ").map((word) =>
            (word.length < len)
            ? word
            : word.match(/[^aáäeéěëiíoóöuúůüyý]*[aáäeéěëiíoóöuúůüyý]+(?:[^aáäeéěëiíoóöuúůüyý]*$|[^aáäeéěëiíoóöuúůüyý](?=[^aáäeéěëiíoóöuúůüyý]))?/gi).join(glue)
        ).join(" ");
        this.textarea.dispatchEvent(new Event("keyup"));
        this.textarea.dispatchEvent(new Event("change"));
    }
}
