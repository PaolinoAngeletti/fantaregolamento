/*
Document on-load procedures.
*/

window.addEventListener('DOMContentLoaded', setup);

function setup() {
	loadRequiredScripts();
}

function loadRequiredScripts() {
	loadScript("utils/Utils.js", () => {
		loadScript("utils/FieldValidation.js");
		loadScript("exception/FieldValidationException.js");
		setupDefaultPrizesValue();
	});
	loadSectionsScripts();
}

function loadSectionsScripts() {
	loadScript("sections/CompetitionType.js");
	loadScript("sections/TeamRules.js");
	loadScript("sections/TransferMarketRules.js");
	loadScript("sections/AccidentReleaseRules.js");
	loadScript("sections/InsertTeamRules.js");
	loadScript("sections/SubstitutionsRules.js");
	loadScript("sections/ResultsCalculationRules.js");
	loadScript("sections/RankingDataRules.js");
	loadScript("sections/FeeAndPrizesRule.js");
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
		let htmlCode = creaCodiceHTML();
		let blob = new Blob([htmlCode], {
			type: "text/html; charset=utf-8"
		});
		let url = URL.createObjectURL(blob);
		window.open(url, "_blank");
		hideErrorSection();
	} catch (errorMessage) {
		showErrorSection(errorMessage.message);
	}
}

function creaCodiceHTML() {
	var toReturn = "<!DOCTYPE html>";
	toReturn = toReturn + "<html>";

	toReturn = toReturn + "<head>";
	toReturn = toReturn + "<title>Regolamento creato</title>";
	toReturn = toReturn + "</head>";

	toReturn = toReturn + "<body style='font-family:sans-serif'>";
	toReturn = toReturn + "<h1>Regolamento Fantacalcio</h1>";

	let sectionsList = retrieveSections();
	sectionsList.forEach((section, index) => {
		toReturn = toReturn + section.produce(index + 1);
	});

	toReturn = toReturn + "</br></br>";
	toReturn = toReturn + this.buildAdvertiseLink();
	toReturn = toReturn + "</body>";
	toReturn = toReturn + "</html>";

	return toReturn;
}

function retrieveSections() {
	return [
		CompetitionType,
		TeamRules,
		TransferMarketRules,
		AccidentReleaseRules,
		InsertTeamRules,
		SubstitutionRules,
		ResultCalculationRules,
		RankingDataRules,
		FeeAndPrizesRule
	];
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
	let maxChangeForSession = maxChangeNr * rolesNumber;
	Utils.retrieveDomElement("etMaxScambiSessione").value = maxChangeForSession;
}

function buildAdvertiseLink() {
	var toReturn = "<div style='text-align: center;'>";
	toReturn = toReturn + "<i style='font-size:13px;'>Documento stilato con <a href='https://paolinoangeletti.github.io/fantaregolamento' target='_blank'>Fanta Regolamento<a></i>";
	return toReturn + "</div>";
}