class Accordeon {
    constructor (parent, openerQuerySelector, displayShow) {
        if (!openerQuerySelector) {
            openerQuerySelector = "h3";
        }
        if (!displayShow) {
            displayShow = "block";
        }
        for (var title of parent.querySelectorAll(openerQuerySelector)) {
            var id = title.getAttribute("data-accordeon");
            if (!id) {
                continue;
            }
            var el = document.getElementById(id);
            if (!el) {
                continue;
            }
            el.style.display = "none";
            title.addEventListener(
                "click",
                function (e) {
                    var body = document.getElementById(e.currentTarget.getAttribute("data-accordeon"));
                    var display = (body.style.display === "none" ? displayShow : "none");
                    for (var el of parent.querySelectorAll(openerQuerySelector)) {
                        var elem = document.getElementById(el.getAttribute("data-accordeon"));
                        if (elem) {
                            elem.style.display = "none";
                            el.querySelector("i").setAttribute("class", "fas fa-chevron-down");
                        }
                    }
                    body.style.display = display;
                    e.currentTarget.querySelector("i").setAttribute(
                        "class",
                        (
                            display == "none"
                            ? "fas fa-chevron-down"
                            : "fas fa-chevron-up"
                        )
                    );
                }
            );
            title.setAttribute("class", "accordeon");
            title.innerHTML = title.innerHTML + '<i class="fas fa-chevron-down"></i>';
        }
    }
}
