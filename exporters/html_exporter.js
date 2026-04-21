// noinspection JSUnusedGlobalSymbols
export function createAndOpenDocument(contentRows, metadata, advertise) {
    let blob = createDocument(contentRows, advertise);
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

function createDocument(content, advertise) {
    let htmlCode = createHTMLCode(content, advertise);
    return new Blob([htmlCode], {
        type: "text/html; charset=utf-8"
    });
}

function createHTMLCode(content, advertise) {
    let toReturn = "<!DOCTYPE html>";
    toReturn = toReturn + "<html lang='it'>";
    toReturn += buildTabTitle();
    toReturn = toReturn + "<body style='font-family:sans-serif'>";

    content.forEach((row) => {
        let text = manageRow(row);
        toReturn = toReturn + text;
    })

    toReturn = toReturn + "</br></br>";
    toReturn += manageRow(advertise);

    toReturn = toReturn + "</body>";
    toReturn = toReturn + "</html>";
    return toReturn;
}

function buildTabTitle() {
    let toReturn = "<head>";
    toReturn = toReturn + "<title>Regolamento creato</title>";
    if (typeof logoBase64 != "undefined") {
        toReturn += "<link rel='icon' type='image/svg+xml' href='" + logoBase64 + "' />";
    }
    toReturn = toReturn + "</head>";
    return toReturn;
}

function manageRow(row) {
    let result;
    let type = row.type;
    let text = manageNewLines(row.text);

    if ("center" === type) {
        // text will contains container's elements.
        result = "<div style='text-align: center;'>";
        text.forEach((row) => {
            result = result + manageRow(row) + "<br>";
        })
        result = result + "</div>";
    } else if ("h1" === type) {
        result = "<h1>" + text + "</h1>";
    } else if ("h2" === type) {
        result = "<h2>" + text + "</h2>";
    } else if ("paragraph" === type) {
        result = "<p>" + text + "</p>";
    } else if ("italic" === type) {
        result = "<i>" + text + "</i>";
    } else if ("image" === type && typeof text != "undefined") {
        result = "<img src='" + text + "' style='max-width:10%; height:auto;' alt='image'/>";
    } else {
        throw new Error("Invalid value type: " + type);
    }

    return result;
}

function manageNewLines(text) {
    if (typeof text !== "string") return text;
    return text.replace(/\n/g, "<br>");
}