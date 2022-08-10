class Menu {

    static init (menuQuery) {

        // Aktivace menu:
        Evnt.onAll(`${menuQuery} [data-menu-target]`, "click", (e) => {
            let menuItem = e.currentTarget;
            let menu = menuItem.closest(menuQuery);

            // Pokud neexistuje cílový panel, zruš akci:
            var panel = (
                menuItem.hasAttribute("data-menu-target")
                ? Elem.sel(menuItem.getAttribute("data-menu-target"))
                : false
            );
            if (!panel) {
                return;
            }

            // Skrýt panely navázané na menu:
            Each
                .all(
                    menu.hasAttribute("data-menu-name")
                    ? `.menu-panel[data-menu-name="${menu.getAttribute("data-menu-name")}"]`
                    : ".menu-panel"
                )
                .do((el) => Elem.from(el).removeClass("menu-active"));

            // Skrýt položky menu:
            Each.all(menu, "[data-menu-target]").do((el) => Elem.from(el).removeClass("menu-active"));

            // Kliknuté položce menu nastavit class active:
            Elem.from(menuItem).addClass("menu-active");

            // Zobrazit content navázaný na aktivní položku:
            Elem.from(panel).addClass("menu-active");

            // Provést akci navázanou na data-menu-onclick (na položce menu):
            if (menuItem.hasAttribute("data-menu-onclick")) {
                if (typeof eval(this.name)[menuItem.getAttribute("data-menu-onclick")] === "function") {
                    eval(this.name)[menuItem.getAttribute("data-menu-onclick")]();
                }
            }

            // Provést akci navázanou na data-menu-onselect (na panelu):
            if (panel.hasAttribute("data-menu-onselect")) {
                if (typeof eval(this.name)[panel.getAttribute("data-menu-onselect")] === "function") {
                    eval(this.name)[mepanelnuItem.getAttribute("data-menu-onselect")]();
                }
            }
        });

        // Menu: Otvírání defaultních panelů:
        Each.all(menuQuery).do((el) => {
            if (el.hasAttribute("data-menu-default")) {
                Evnt.trigger(el.querySelector(`[data-menu-target="${el.getAttribute("data-menu-default")}"]`), "click");
            }
        });

    }
}
