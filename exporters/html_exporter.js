// noinspection JSUnusedGlobalSymbols
export async function createAndOpenDocument(contentRows, metadata, advertise) {
    let blob = await createDocument(contentRows, advertise);
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

async function createDocument(content, advertise) {
    let htmlCode = await createHTMLCode(content, advertise);
    return new Blob([htmlCode], {
        type: "text/html; charset=utf-8"
    });
}

async function createHTMLCode(content, advertise) {
    let toReturn = "<!DOCTYPE html>";
    toReturn = toReturn + "<html lang='it'>";
    toReturn += buildTabTitle();
    toReturn = toReturn + "<body style='font-family:sans-serif'>";

    for (const row of content) {
        toReturn += await manageRow(row);
    }

    toReturn = toReturn + "</br></br>";
    toReturn += await manageRow(advertise);

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

async function manageRow(row) {
    let result;
    let type = row.type;
    let text = manageNewLines(row.text);

    if ("center" === type) {
        // text will contains container's elements.
        result = "<div style='text-align: center;'>";
        for (const r of text) {
            result += await manageRow(r) + "<br>";
        }
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
    } else if ("qr-code" === type) {
        const qrContent = await window.generateQrCode(text);
        result = "<img src='" + qrContent + "' style='max-width:10%; height:auto;' alt='image'/>";
    } else {
        throw new Error("Invalid value type: " + type);
    }

    return result;
}

function manageNewLines(text) {
    if (typeof text !== "string") return text;
    return text.replace(/\n/g, "<br>");
}