/*
Document on-load procedures.
*/

function setupApplication() {
    loadRequiredScripts();
}

function loadRequiredScripts() {
    loadScript("utils/Utils.js", () => {
        loadImages();
        loadSectionsScripts();
        runUiScripts();
        loadScript("utils/FieldValidation.js");
        loadScript("exception/FieldValidationException.js");
        loadScript("exporters/exporter_factory.js");
        applyVersion();
    });
}

function loadImages() {
    loadScript("images/logoBase64.js");
    loadScript("scripts/qr-code-generator.js");
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

function runUiScripts() {
    handleBusteChiuseSelection()
    setupDefaultPrizesValue();
}

function setupDefaultPrizesValue() {
    const taPremi = Utils.retrieveDomElement("taPremi");
    taPremi.value = [
        "Primo posto: - euro",
        "Secondo posto: - euro",
        "Terzo posto: - euro"
    ].join('\n');
}

function applyVersion() {
    loadScript("config/config.js", () => {
        const versionLabel = Utils.retrieveDomElement("lb_version");
        if (versionLabel && window.APP_VERSION?.version) {
            versionLabel.innerText = "versione " + window.APP_VERSION.version;
        }
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
        InsertTeamRules,
        SubstitutionRules,
        ResultCalculationRules,
        RankingDataRules,
        FeeAndPrizesRule
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

function retrieveAdvertisingContent() {
    return Utils.addText([
        Utils.addText(logoBase64, "image"),
        Utils.addText("Documento stilato con FantaRegolamento", "italic"),
        Utils.addText("https://paolinoangeletti.github.io/fantaregolamento/", "qr-code"),
    ], "center");
}

function showExchangeSection(toShow) {
    if (toShow) {
        Utils.showDomElement("exchangeSection");
    } else {
        Utils.setElementDisplay("exchangeSection", "none");
    }
}

function handleBusteChiuseSelection() {
    let btnMode = Utils.retrieveDomElement("cbBusta");
    if (btnMode) {
        // show button only if specific competition mode is selected.
        Utils.setElementVisibility("btnTornata", btnMode.checked);

        // if button was previously selected, selection will be moved to default button.
        let btnTornata = Utils.retrieveDomElement("cbTornata");
        if (btnTornata.checked) {
            Utils.selectCheckbox("cbRandomRuolo");
        }
    }
}

function applicaModificatore(toShow) {
    if (toShow) {
        Utils.showDomElement("punti_modificatore");
    } else {
        Utils.setElementDisplay("punti_modificatore", "none");
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

function hideImportFeedbackSection() {
    Utils.setElementDisplay("importFeedbackSection", "none");
}

function hideErrorSection() {
    Utils.setElementDisplay("errorSection", "none");
}

/**
 * Keeps the maximum number of changes allowed in a market session aligned
 * with the maximum number allowed for each role.
 *
 * The session limit is calculated by multiplying the per-role value by the
 * four supported player roles (goalkeeper, defender, midfielder and striker).
 *
 * @param {HTMLInputElement} etMaxScambiRuolo Input containing the maximum
 *     number of changes allowed for a single role.
 * @returns {void}
 */
function manageRoleMaxChangeNumber(etMaxScambiRuolo) {
    let rolesNumber = 4;
    let maxChangeNr = etMaxScambiRuolo.value;
    Utils.retrieveDomElement("etMaxScambiSessione").value = maxChangeNr * rolesNumber;
}

/**
 * Updates the visibility of the player-release recovery section.
 *
 * The section is shown when the competition enables either half-value or
 * average-value credit recovery; otherwise, it remains hidden.
 *
 * @returns {void}
 */
function verifyCreditsRecoverOnPlayerRelease() {
    verificaAbilitazioneScambioCrediti();
    verificaPresenzaRecuperoCreditiDecimale();
}

function verificaAbilitazioneScambioCrediti() {
    let result = ExchangeRules.expectedRecoveryCreditsFromTransfer();
    Utils.setElementVisibility("creditsExchangeWithPlayersSection", result);
}

function verificaPresenzaRecuperoCreditiDecimale() {
    const halfReturn = Utils.retrieveDomElement("cbSvincoloMeta");
    const averageReturn = Utils.retrieveDomElement("cbSvincoloMedia");
    Utils.setElementVisibility("defectOrExcessSection", halfReturn.checked || averageReturn.checked);
}

function handlePrizeTypeValue(value) {
    const dFixedPrice = Utils.retrieveDomElement("dFixedPrice");
    const dVariablePrice = Utils.retrieveDomElement("dVariablePrice");
    if ("variable" === value) {
        switchContainer(dFixedPrice, dVariablePrice);
    } else if ("fixed" === value) {
        switchContainer(dVariablePrice, dFixedPrice);
    }
}

function switchContainer(hideElement, showElement) {
    hideElement.classList.add("hidden");
    setTimeout(() => {
        hideElement.style.display = "none";
        showElement.style.display = "block";
        requestAnimationFrame(() => {
            showElement.classList.remove("hidden");
        });
    }, 200);
}