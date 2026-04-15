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
        loadScript("exporters/exporter_factory.js");
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
    taPremi.value = [
        "Primo posto: - euro",
        "Secondo posto: - euro",
        "Terzo posto: - euro"
    ].join('\n');
}

/*
Regulation creation.
*/

function avviaAnteprimaDocumento(documentType) {
    try {
        let content = retrieveRegulationContent();
        let metadata = retrieveMetadataForReload();
        let advertise = retrieveAdvertisingContent();
        retrieveDocumentModule(documentType, content, metadata, advertise);
        hideErrorSection();
    } catch (errorMessage) {
        showErrorSection(errorMessage.message);
    }
}

function retrieveDocumentModule(documentType, content, metadata, advertise) {
    ExporterFactory.getExporter(documentType).then(exporter => {
        // noinspection JSUnresolvedFunction
        exporter.createAndOpenDocument(content, metadata, advertise);
    }).catch(err => {
        console.error(err);
        showErrorSection(err.message);
    });
}

function retrieveRegulationContent() {
    let toReturn = [];

    // main title
    toReturn.push(Utils.addText("Regolamento Fantacalcio", "h1"));

    let sectionsList = retrieveSections();
    sectionsList.forEach((section, index) => {
        toReturn.push(...section.produce(index + 1));
    });
    return toReturn;
}

function retrieveSections() {
    return [
        CompetitionType,
        TeamRules,
        TransferMarketRules,
        PlayerReleaseRules,
        ExchangeRules,
        AccidentRules,
        //InsertTeamRules,
        //SubstitutionRules,
        //ResultCalculationRules,
        //RankingDataRules,
        //FeeAndPrizesRule
    ];
}

function retrieveMetadataForReload(domDoc = document) {
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

// TODO valutare di aggiungere in QR code della pagina web invece del link
function retrieveAdvertisingContent() {
    return Utils.addText([
        Utils.addText(logoBase64, "image"),
        Utils.addText("Documento stilato con FantaRegolamento", "italic")
    ], "center");
}

function showExchangeSection(toShow) {
    if (toShow) {
        Utils.showDomElement("exchangeSection");
    } else {
        Utils.setElementDisplay("exchangeSection", "none");
    }
}

// TODO fix unused.
function applicaModificatore(daApplicare) {
    let x = document.getElementById("punti_modificatore");
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