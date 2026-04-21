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
                rulesImportedNr += reloadRadioValue(el, value);
            } else if (el.type === "checkbox") {
                rulesImportedNr += reloadRadioValue(el, value);
            } else {
                rulesImportedNr += reloadTextValue(el, value);
            }
        }
    });

    // import feedback.
    let importElement = Utils.retrieveDomElement("importFeedbackSection");
    if (importElement) {
        Utils.showDomElement("importFeedbackSection");
        let importMessage = Utils.retrieveDomElement("importMessage");
        importMessage.innerText = "Caricati " + rulesImportedNr + " elementi";
    }
}

function reloadRadioValue(domElement, newValue) {
    if (domElement.checked === newValue) {
        return 0;
    }
    logLoadedElement(domElement);
    domElement.checked = newValue;
    return 1;
}

function reloadTextValue(domElement, newValue) {
    if (domElement.value === newValue) {
        return 0;
    }
    logLoadedElement(domElement);
    domElement.value = newValue;
    return 1;
}

function logLoadedElement(domElement) {
    console.log("PDF element loaded: " + domElement.id);
}