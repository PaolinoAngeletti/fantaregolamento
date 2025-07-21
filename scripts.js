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
	toReturn = toReturn + estraiInformazioniInserimentoFormazione();
	toReturn = toReturn + estraiGestioneSostituzioni();
	toReturn = toReturn + estraiDatiCalcoloGiornate();
	toReturn = toReturn + estraiDatiClassifica();
	toReturn = toReturn + estraiQuotePremiFinali();

	toReturn = toReturn + "</br>";
	toReturn = toReturn + "</body>";
	toReturn = toReturn + "</html>";

	return toReturn;
}

function estraiInformazioniInserimentoFormazione() {
	var toReturn = Utils.addSectionTitle("Inserimento formazione");
	toReturn = toReturn + estraiMinutiTolleranza();
	toReturn = toReturn + estraiModuliConsentiti();
	toReturn = toReturn + estraiGestioneFormazioneNonInserita();
	toReturn = toReturn + estraiStrutturaPanchina();
	toReturn = toReturn + estraiAbilitazioneFormazioniInvisibili();
	return toReturn;
}

function estraiMinutiTolleranza() {
	var toReturn = "";
	let etTolleranza = Utils.retrieveDomElement("etTolleranza");
	let numeroMinuti = etTolleranza.value;
	if (numeroMinuti <= 1) {
		toReturn = Utils.addTextRow("Le formazioni devono essere inserite entro un minuto dall’inizio della giornata reale del campionato italiano.");
	} else {
		toReturn = Utils.addTextRow("Le formazioni devono essere inserite entro " + numeroMinuti + " minuti dall’inizio della giornata reale del campionato italiano.");
	}
	return toReturn;
}

function estraiModuliConsentiti() {
	var toReturn = "";
	toReturn = toReturn + Utils.addTextRow("I moduli consentiti per le formazioni sono:");
	toReturn = verificaSingoloModulo(toReturn, "checkboxOne", "4-4-2");
	toReturn = verificaSingoloModulo(toReturn, "checkboxTwo", "4-3-3");
	toReturn = verificaSingoloModulo(toReturn, "checkboxThree", "4-5-1");
	toReturn = verificaSingoloModulo(toReturn, "checkboxFour", "3-4-3");
	toReturn = verificaSingoloModulo(toReturn, "checkboxFive", "3-5-2");
	toReturn = verificaSingoloModulo(toReturn, "checkboxSix", "5-3-2");
	toReturn = verificaSingoloModulo(toReturn, "checkboxSeven", "5-4-1");
	toReturn = verificaSingoloModulo(toReturn, "checkboxEight", "6-3-1");
	toReturn = verificaSingoloModulo(toReturn, "checkboxNine", "6-2-2");
	return toReturn;
}

function verificaSingoloModulo(toReturn, idModulo, descrizione) {
	let etModulo = Utils.retrieveDomElement(idModulo);
	if (etModulo.checked) {
		toReturn = toReturn + descrizione + "<br>";
	}
	return toReturn;
}

function estraiGestioneFormazioneNonInserita() {
	var toReturn = "";
	let cbVuota = Utils.retrieveDomElement("cbMancataNulla");
	if (cbVuota.checked) {
		toReturn = Utils.addTextRow("Se la formazione, per qualsiasi motivo, non viene inserita, NON viene recuperata quella della giornata precedente, ma verrà usata una formazione nulla con punteggio totale pari a ZERO. Se io mi preoccupo di mettere la squadra, non è bello perdere contro chi si dimentica.");
	} else {
		toReturn = Utils.addTextRow("Se la formazione, per qualsiasi motivo, non viene inserita, verrà recuperata la formazione della giornata precedente.");
	}
	return toReturn;
}

function estraiStrutturaPanchina() {
	var toReturn = "";
	let etStruttura = Utils.retrieveDomElement("etPanchina");
	toReturn = Utils.addTextRow("La panchina dovrà avere la seguente struttura: " + etStruttura.value + ".");
	return toReturn;
}

function estraiAbilitazioneFormazioniInvisibili() {
	var toReturn = "";
	let cbInvisibiliSi = Utils.retrieveDomElement("cbInvisibiliSi");
	if (cbInvisibiliSi.checked) {
		toReturn = Utils.addTextRow("Sono ammesse le formazioni invisibili.");
	} else {
		toReturn = Utils.addTextRow("Non sono ammesse le formazioni invisibili.");
	}
	return toReturn;
}

function estraiGestioneSostituzioni() {
	var toReturn = Utils.addSectionTitle("Gestione sostituzioni");
	toReturn = toReturn + estraiNumeroCambi();
	toReturn = toReturn + estraiGestioneAmmonizioneSenzaVoto();
	return toReturn;
}

function estraiNumeroCambi() {
	var toReturn = "";
	let cbNessunLimite = Utils.retrieveDomElement("cbNessunLimite");
	if (cbNessunLimite.checked) {
		toReturn = Utils.addTextRow("Non vi è nessun limite sul numero di sostituzioni, per cui tutta la panchina può entrare.");
	} else {
		let cbTreCambi = Utils.retrieveDomElement("cbTreCambi");
		if (cbTreCambi.checked) {
			toReturn = Utils.addTextRow("Sono previste 3 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
		} else {
			let cbCinqueCambi = Utils.retrieveDomElement("cbCinqueCambi");
			if (cbCinqueCambi.checked) {
				toReturn = Utils.addTextRow("Sono previste 5 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
			}
		}
	}
	return toReturn;
}

function estraiGestioneAmmonizioneSenzaVoto() {
	var toReturn = "";
	let cbAmmIgnorata = Utils.retrieveDomElement("cbAmmIgnorata");
	if (cbAmmIgnorata.checked) {
		toReturn = Utils.addTextRow("Nel caso in cui un giocatore SV (senza voto) venga ammonito, quella ammonizione non avrà alcun impatto né sul giocatore stesso né sul giocatore subentrato; quindi, il subentrato accederà al suo voto in maniera regolare.");
	} else {
		let cbAmmScalata = Utils.retrieveDomElement("cbAmmScalata");
		if (cbAmmScalata.checked) {
			toReturn = Utils.addTextRow("Nel caso in cui un giocatore SV (senza voto) venga ammonito il malus della ammonizione ricevuta verrà riflesso sul giocatore subentrato, che dunque entrerà con la sua votazione minorata.");
		}
	}
	return toReturn;
}

function estraiDatiCalcoloGiornate() {
	var toReturn = Utils.addSectionTitle("Calcolo giornate");
	toReturn = toReturn + estraiPunteggiVittoriaPareggio();
	toReturn = toReturn + estraiBonusMalus();
	toReturn = toReturn + estraiLarghezzaSoglie();
	toReturn = toReturn + estraiAbilitazioneFattoreCampo();
	toReturn = toReturn + estraiGestioneRinvio();
	toReturn = toReturn + estraiGestioneModificatore();
	return toReturn;
}

function estraiPunteggiVittoriaPareggio() {
	var toReturn = "";
	let etVittoria = Utils.retrieveDomElement("etVittoria");
	let etPareggio = Utils.retrieveDomElement("etPareggio");
	let etSconfitta = Utils.retrieveDomElement("etSconfitta");
	toReturn = toReturn + Utils.addTextRow("I punteggi rilevati da una singola partita saranno:");
	toReturn = toReturn + "Vittoria: " + etVittoria.value + " punti.<br>";
	toReturn = toReturn + "Pareggio: " + etPareggio.value + " punti.<br>";
	toReturn = toReturn + "Sconfitta: " + etSconfitta.value + " punti.<br>";
	return toReturn;
}

function estraiBonusMalus() {
	var toReturn = "";
	toReturn = toReturn + Utils.addTextRow("I bonus e malus previsti dalla competizione saranno:");
	toReturn = verificaSingoloBonus(toReturn, "etGol", "Gol segnato");
	toReturn = verificaSingoloBonus(toReturn, "etRigore", "Rigore segnato");
	toReturn = verificaSingoloBonus(toReturn, "etRigoreSbagliato", "Rigore sbagliato");
	toReturn = verificaSingoloBonus(toReturn, "etAssist", "Assist");
	toReturn = verificaSingoloBonus(toReturn, "etCleansheet", "Porta inviolata");
	toReturn = verificaSingoloBonus(toReturn, "etGolSubito", "Gol subito (portiere)");
	toReturn = verificaSingoloBonus(toReturn, "etRigoreParato", "Rigore parato (portiere)");
	toReturn = verificaSingoloBonus(toReturn, "etAmmonizione", "Ammonizione");
	toReturn = verificaSingoloBonus(toReturn, "etEspulsione", "Espulsione");
	toReturn = verificaSingoloBonus(toReturn, "etAutogol", "Autogol");
	toReturn = verificaSingoloBonus(toReturn, "etGolVittoria", "Gol decisivo per la vittoria");
	toReturn = verificaSingoloBonus(toReturn, "etGolPareggio", "Gol decisivo per il pareggio");
	return toReturn;
}

function verificaSingoloBonus(toReturn, idBonus, descrizione) {
	let etElemento = Utils.retrieveDomElement(idBonus);
	toReturn = toReturn + descrizione + ": " + etElemento.value + " punti.<br>";
	return toReturn;
}

function estraiLarghezzaSoglie() {
	var toReturn = "";
	let etSoglie = Utils.retrieveDomElement("etSoglie");
	toReturn = Utils.addTextRow("Le soglie per il calcolo del numero di gol saranno ciascuna da " + etSoglie.value + " punti.");
	return toReturn;
}

function estraiAbilitazioneFattoreCampo() {
	var toReturn = "";
	let etFattoreSi = Utils.retrieveDomElement("cbFattoreSi");
	if (etFattoreSi.checked) {
		toReturn = Utils.addTextRow("E' previsto un fattore campo, ossia giocare in casa oppure fuori casa ha influenza sul calcolo della giornata.");
	} else {
		toReturn = Utils.addTextRow("Non verrà applicato mai nessun fattore campo, ossia giocare in casa oppure fuori casa non ha influenza sul calcolo della giornata.");
	}
	return toReturn;
}

function estraiGestioneRinvio() {
	var toReturn = "";
	let cbRinvioMai = Utils.retrieveDomElement("cbRinvioMai");
	if (cbRinvioMai.checked) {
		toReturn = Utils.addTextRow("Nel caso in cui una o più partite vengano rinviate per qualsiasi motivo, NON si attenderà MAI la sua conclusione, ma si accederà sempre alle votazioni politiche.");
	} else {
		let cbRinvioProssima = Utils.retrieveDomElement("cbRinvioProssima");
		if (cbRinvioProssima.checked) {
			toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che essa venga recuperata al massimo fino alla prossima giornata, dopodichè si ricorrerà alle votazioni politiche. Questa decisione viene presa nell’ottica di evitare accavvallamenti di calcoli giornate, che, in caso di coppe aggiuntive, porterebbero ad ulteriori difficoltà di gestione.");
		} else {
			let cbRinvioPolitico = Utils.retrieveDomElement("cbRinvioPolitico");
			if (cbRinvioPolitico.checked) {
				toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, accederà in ogni caso alla votazione politica.");
			} else {
				let cbRinvioPanchina = Utils.retrieveDomElement("cbRinvioPanchina");
				if (cbRinvioPanchina.checked) {
					toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, entrerà in ogni caso il panchinaro previsto.");
				}
			}
		}
	}
	return toReturn;
}

function estraiGestioneModificatore() {
	var toReturn = "";
	let cbModificatoreNo = Utils.retrieveDomElement("cbModificatoreNo");
	if (cbModificatoreNo.checked) {
		toReturn = Utils.addTextRow("Il calcolo della giornata non prevede nessun modificatore di difesa");
	} else {
		let cbModificatoreSi = Utils.retrieveDomElement("cbModificatoreSi");
		if (cbModificatoreSi.checked) {
			toReturn = Utils.addTextRow("Il calcolo della giornata prevede il modificatore di difesa, con i seguenti scaglioni:");
			toReturn = verificaSingoloBonus(toReturn, "et0599", "Da 0 punti a 5,99 punti");
			toReturn = verificaSingoloBonus(toReturn, "et6624", "Da 6 punti a 6,24 punti");
			toReturn = verificaSingoloBonus(toReturn, "et625649", "Da 6,25 punti a 6,49 punti");
			toReturn = verificaSingoloBonus(toReturn, "et65674", "Da 6,5 punti a 6,74 punti");
			toReturn = verificaSingoloBonus(toReturn, "et675699", "Da 6,75 punti a 6,99 punti");
			toReturn = verificaSingoloBonus(toReturn, "et7724", "Da 7 punti a 7,24 punti");
			toReturn = verificaSingoloBonus(toReturn, "et725749", "Da 7,25 punti a 7,49 punti");
			toReturn = verificaSingoloBonus(toReturn, "et75", "Da 7,5 a salire");
		}
	}
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
