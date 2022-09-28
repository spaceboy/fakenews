class FileDownload {
    static fileName = "file.txt";

    static content;

    static mime = "text/plain";

    static charset = "utf-8";

    static uriEncoded = true;

    static setFileName (fileName) {
        FileDownload.fileName = fileName;
        return FileDownload;
    }

    static setContent (content) {
        FileDownload.content = content;
        return FileDownload;
    }

    static setMime (mime) {
        FileDownload.mime = mime;
        return FileDownload;
    }

    static setCharset (charset) {
        FileDownload.charset = charset;
    }

    static setUriEncoded (uriEncoded) {
        FileDownload.uriEncoded = uriEncoded;
        return FileDownload;
    }

    static download (fileName) {
        if (fileName !== undefined) {
            FileDownload.setFileName = fileName;
        }

        var content = (FileDownload.uriEncoded ? encodeURIComponent(FileDownload.content) : FileDownload.content);
        var href = [];
        if (FileDownload.mime) {
            href.push(`data:${FileDownload.mime}`);
        }
        if (FileDownload.charset) {
            href.push(`charset=${FileDownload.charset}`);
        }

        (Elem.create("a"))
            .attr({
                "download": fileName,
                "href": (
                    href.length
                    ? [href.join(";"), content].join(",")
                    : content
                )
            })
            .get()
            .click();
        return FileDownload;
    }

    static downloadText (fileName, content) {
        if (content !== undefined) {
            FileDownload.setContent(content);
        }
        return FileDownload
            .setMime("text/plain")
            .setUriEncoded(false)
            .download(fileName);
    }

    static downloadJson (fileName, content) {
        if (content !== undefined) {
            FileDownload.setContent(content);
        }
        return FileDownload
            .setMime("text/json")
            .setUriEncoded(true)
            .download(fileName);
    }

    static downloadJpg (fileName, content) {
        if (content !== undefined) {
            FileDownload.setContent(content);
        }
        return FileDownload
            .setMime("image/jpeg")
            .setUriEncoded(true)
            .download(fileName);
    }

    static downloadPng (fileName, content) {
        if (content !== undefined) {
            FileDownload.setContent(content);
        }
        return FileDownload
            .setMime("image/png")
            .setUriEncoded(true)
            .download(fileName);
    }
}
