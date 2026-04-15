function selectLocalPDF() {
    import("../exporters/pdf_exporter.js")
        .then(module => module.loadJSONFromPDF())
        .then(dati => {
            loadRegulationFromJson(dati);
        })
        .catch(error => {
            console.error("Error during import PDF:", error);
        });
}

function loadRegulationFromJson(json, domDoc = document) {
    let rulesImportedNr = 0;

    // updating only elements with loadable tag.
    const domElements = domDoc.querySelectorAll("[loadable]");
    domElements.forEach(el => {
        const key = el.id;
        if (key in json) {
            const value = json[key];
            if (el.type === "radio") {
                el.checked = value;
            } else if (el.type === "checkbox") {
                el.checked = value;
            } else {
                el.value = value;
            }
            rulesImportedNr += 1;
        }
    });

    // import feedback.
    let importElement = Utils.retrieveDomElement("importMessage");
    if (importElement) {
        importElement.innerText = "Caricati " + rulesImportedNr + " elementi";
    }
}