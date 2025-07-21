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
	toReturn = toReturn + estraiDatiClassifica();
	toReturn = toReturn + estraiQuotePremiFinali();

	toReturn = toReturn + "</br>";
	toReturn = toReturn + "</body>";
	toReturn = toReturn + "</html>";

	return toReturn;
}

function estraiDatiClassifica() {
	var toReturn = Utils.addSectionTitle("Classifica");
	toReturn = toReturn + Utils.addTextRow("La classifica verrà calcolata in base al seguente criterio:");
	toReturn = toReturn + "1. Punti in classifica" + "<br>";
	toReturn = toReturn + "2. Somma punti totale" + "<br>";
	toReturn = toReturn + "3. Differenza reti" + "<br>";
	toReturn = toReturn + "4. Gol fatti" + "<br>";
	toReturn = toReturn + "5. Gol subiti" + "<br>";
	toReturn = toReturn + "6. Classifica avulsa" + "<br>";
	toReturn = toReturn + Utils.addTextRow("In caso di parità perfetta, verrano sommati i premi previsti e divisi per le squadre che rilevano la perfetta parità.");
	return toReturn;
}

function estraiQuotePremiFinali() {
	var toReturn = Utils.addSectionTitle("Quote squadre e premi finali");
	toReturn = toReturn + estraiQuotaSquadra();
	toReturn = toReturn + estraiDivisionePremi();
	return toReturn;
}

function estraiQuotaSquadra() {
	var toReturn = "";
	let etQuota = Utils.retrieveDomElement("etQuota");
	toReturn = Utils.addTextRow("La quota di partecipazione prevista per ciascuna squadra è di " + etQuota.value + " euro.");
	return toReturn;
}

function estraiDivisionePremi() {
	var toReturn = "";
	let etPremi = Utils.retrieveDomElement("taPremi");
	if (etPremi != null) {
		toReturn = Utils.addTextRow("I premi totali inoltre saranno cosi suddivisi:");
		toReturn = toReturn + resolveEscapes(etPremi.value);
	}
	return toReturn;
}

function inviaMailSupporto() {
	var link = "mailto:paolinoangeletti@gmail.com?subject=FantaRegolamento | Richiesto supporto&body=Hai bisogno di supporto oppure vuoi aiutarci a completare la pagina? Scrivi qui quello di cui hai bisogno!";
	window.location.href = link;
}

function resolveEscapes(stringWithEscapes) {
	stringWithEscapes.replace(/newline/g, "\n");
	return stringWithEscapes.replace(/\n/g, "<br>");
}
