pdf_exporter_path = "./exporters/pdf_exporter.js"

/*
Document on-load procedures.
*/

window.addEventListener('DOMContentLoaded', setup);

function setup() {
    loadRequiredScripts();
}

function loadRequiredScripts() {
    loadScript("utils/Utils.js", () => {
        loadImages();
        loadSectionsScripts();
        setupDefaultPrizesValue();
        loadScript("utils/FieldValidation.js");
        loadScript("exception/FieldValidationException.js");
    });
}

function loadImages() {
    loadScript("images/logoBase64.js");
}

function loadSectionsScripts() {
    loadScript("sections/CompetitionType.js");
    loadScript("sections/TeamRules.js");
    loadScript("sections/TransferMarketRules.js");
    loadScript("sections/PlayerReleaseRules.js");
    loadScript("sections/AccidentRules.js");
    loadScript("sections/InsertTeamRules.js");
    loadScript("sections/SubstitutionsRules.js");
    loadScript("sections/ResultsCalculationRules.js");
    loadScript("sections/RankingDataRules.js");
    loadScript("sections/FeeAndPrizesRule.js");
    loadScript("sections/ExchangeRules.js", () => {
        verifyCreditsRecoverOnPlayerRelease();
    });
}

function loadScript(fileName, callback) {
    const script = document.createElement('script');
    script.src = fileName;
    script.onload = () => {
        console.log("File " + fileName + " correctly loaded");
        if (typeof callback === 'function') {
            callback();
        }
    };
    document.head.appendChild(script);
}

function setupDefaultPrizesValue() {
    const taPremi = Utils.retrieveDomElement("taPremi");
    const defaultValue = [
        "Primo posto: - euro",
        "Secondo posto: - euro",
        "Terzo posto: - euro"
    ].join('\n');
    taPremi.value = defaultValue;
}

/*
Regulation creation.
*/

function avviaAnteprimaDocumento() {
    try {
        let content = retrieveRegulationContent();
        let metadata = buildLoadJson();

        // todo qui factory
        import(pdf_exporter_path).then(async module => {
            await module.showPreview(content, metadata);
        });

        //PDFExporter.show(content);

        //const pdf = new window.jspdf.jsPDF();
//var doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
//doc.text("Regolamento Fantacalcio", 20, 30);

        //var doc = createHTMLCodePDF();
        //import('./scripts/pdf_handler.js').then(async module => {
        //await module.show(doc);
        //});


        //let htmlCode = createHTMLCode();
        //let blob = new Blob([htmlCode], {
        //  type: "text/html; charset=utf-8"
        //});

        //let metadati = buildLoadJson();
        //console.log(metadati);

        // genera anteprima PDF direttamente


        //import('./scripts/pdf_handler.js').then(async module => {
        //  await module.avviaAnteprimaPDF(metadati, htmlCode);
        //});


        //let url = URL.createObjectURL(blob);
        //window.open(url, "_blank");

        hideErrorSection();
    } catch (errorMessage) {
        showErrorSection(errorMessage.message);
    }
}

function createHTMLCode() {
    var toReturn = "<!DOCTYPE html>";
    toReturn = toReturn + "<html>";
    toReturn += this.buildTabTitle();

    toReturn = toReturn + "<body style='font-family:sans-serif'>";
    toReturn = toReturn + "<h1>Regolamento Fantacalcio</h1>";

    let sectionsList = retrieveSections();
    sectionsList.forEach((section, index) => {
        toReturn = toReturn + section.produce(index + 1);
    });

    toReturn = toReturn + "</br></br>";
    toReturn += this.buildAdvertiseSection();

    toReturn = toReturn + "</body>";
    toReturn = toReturn + "</html>";
    return toReturn;
}

// TEMP!!!!
function retrieveRegulationContent() {
    let toReturn = [];

    // main title
    toReturn.push(Utils.addText("Regolamento Fantacalcio", "h1"));

    let sectionsList = retrieveSections();
    sectionsList.forEach((section, index) => {
        toReturn.push(...section.produce(index + 1));
    });

    // TODO: advertising
    //toReturn = toReturn + "</br></br>";
    //toReturn += this.buildAdvertiseSection();

    //toReturn = toReturn + "</body>";
    //toReturn = toReturn + "</html>";
    return toReturn;
}

// SOLO PER HTML!!!
function buildTabTitle() {
    var toReturn = "<head>";
    toReturn = toReturn + "<title>Regolamento creato</title>";
    if (typeof logoBase64 != "undefined") {
        toReturn += "<link rel='icon' type='image/svg+xml' href='" + logoBase64 + "' />";
    }
    toReturn = toReturn + "</head>";
    return toReturn;
}

function retrieveSections() {
    return [
        CompetitionType,
        TeamRules,
        TransferMarketRules,
        //PlayerReleaseRules,
        //ExchangeRules,
        //AccidentRules,
        //InsertTeamRules,
        //SubstitutionRules,
        //ResultCalculationRules,
        //RankingDataRules,
        //FeeAndPrizesRule
    ];
}

function buildLoadJson(domDoc = document) {
    const result = {};
    const loadableElements = domDoc.querySelectorAll("[loadable]");
    loadableElements.forEach(el => {
        const key = el.id;
        if (!key) return;

        if (el.type === "checkbox" || el.type === "radio") {
            result[key] = el.checked;
        } else {
            result[key] = el.value;
        }
    });
    return result;
}

function selectLocalPDF() {
    import(pdf_exporter_path)
        .then(module => module.loadPDFDocument())
        .then(dati => {
            loadRegulationFromJson(dati);
        })
        .catch(error => {
            console.error("Error during import PDF:", error);
        });
}

function loadRegulationFromJson(json, domDoc = document) {
    const domElements = domDoc.querySelectorAll("[loadable]");
    domElements.forEach(el => {
        const key = el.id;
        if (!(key in json)) return;

        const value = json[key];
        if (el.type === "radio") {
            el.checked = value;
        } else if (el.type === "checkbox") {
            el.checked = value;
        } else {
            el.value = value;
        }
    });
}

function showExchangeSection(toShow) {
    if (toShow) {
        Utils.showDomElement("exchangeSection");
    } else {
        Utils.setElementDisplay("exchangeSection", "none");
    }
}

function applicaModificatore(daApplicare) {
    var x = document.getElementById("punti_modificatore");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function showPenaltySection(toShow) {
    if (toShow) {
        Utils.showDomElement("penaltySection");
    } else {
        Utils.setElementDisplay("penaltySection", "none");
    }
}

function showErrorSection(message) {
    Utils.setElementDisplay("errorSection", "block");
    Utils.retrieveDomElement("errorMessage").innerHTML = message;
}

function hideErrorSection() {
    Utils.setElementDisplay("errorSection", "none");
}

function manageRoleMaxChangeNumber(etMaxScambiRuolo) {
    let rolesNumber = 4;
    let maxChangeNr = etMaxScambiRuolo.value;
    Utils.retrieveDomElement("etMaxScambiSessione").value = maxChangeNr * rolesNumber;
}

function verifyCreditsRecoverOnPlayerRelease() {
    let result = ExchangeRules.expectedRecoveryCreditsFromTransfer();
    Utils.setElementVisibility("creditsExchangeWithPlayersSection", result);
}

function buildAdvertiseSection() {
    var toReturn = "<div style='text-align: center;'>";

    // icon
    if (typeof logoBase64 != "undefined") {
        toReturn = toReturn + "<img src='" + logoBase64 + "' style='max-width:10%; height:auto;' />";
        toReturn += "<br>";
    }

    // link
    toReturn = toReturn + "<i style='font-size:13px;'>Documento stilato con <a href='https://paolinoangeletti.github.io/fantaregolamento' target='_blank'>Fanta Regolamento<a></i>";

    return toReturn + "</div>";
}