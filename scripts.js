/*
Document on-load procedures.
*/

window.addEventListener('DOMContentLoaded', setup);

function setup() {
	loadRequiredScripts();
}

function loadRequiredScripts() {
	loadScript("utils/Utils.js", () => {
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

function applicaModificatore(daApplicare) {
	var x = document.getElementById("punti_modificatore");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function avviaAnteprimaDocumento() {
	var tab = window.open('', '_blank');
	tab.document.write(creaCodiceHTML());
	tab.document.close();
}

function creaCodiceHTML() {
	var toReturn = "<!DOCTYPE html>";
	toReturn = toReturn + "<html>";

	toReturn = toReturn + "<head>";
	toReturn = toReturn + "<title>Regolamento creato</title>";
	toReturn = toReturn + "</head>";

	toReturn = toReturn + "<body style='font-family:sans-serif'>";
	toReturn = toReturn + "<h1>Regolamento Fantacalcio</h1>";

	toReturn = toReturn + CompetitionType.produce();
	toReturn = toReturn + TeamRules.produce();
	toReturn = toReturn + TransferMarketRules.produce();
	toReturn = toReturn + AccidentReleaseRules.produce();
	toReturn = toReturn + InsertTeamRules.produce();
	toReturn = toReturn + SubstitutionRules.produce();
	toReturn = toReturn + ResultCalculationRules.produce();
	toReturn = toReturn + RankingDataRules.produce();
	toReturn = toReturn + FeeAndPrizesRule.produce();

	toReturn = toReturn + "</br>";
	toReturn = toReturn + "</body>";
	toReturn = toReturn + "</html>";

	return toReturn;
}

function inviaMailSupporto() {
	var link = "mailto:paolinoangeletti@gmail.com?subject=FantaRegolamento | Richiesto supporto&body=Hai bisogno di supporto oppure vuoi aiutarci a completare la pagina? Scrivi qui quello di cui hai bisogno!";
	window.location.href = link;
}
