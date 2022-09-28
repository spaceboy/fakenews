class Version {

    static #parsePrimary (version) {
        var a = version.split(".");
        switch (a.length) {
            case 3:
                break;
            case 1:
                a.push(0);
            case 2:
                a.push(0);
                break;
            default:
                a = a.slice(-3);
        }
        console.log(a);
        Each.for(a).do((n, i) => {
            a[i] = parseInt(n);
        });
        return a;
    }

    static parseVersion (version) {
        var a = Version.#parsePrimary(version);
        return a;
    }

    static matchExact (expected, actual) {

    }

    static match (expected, actual) {
        return;
    }
}