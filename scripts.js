function applicaModificatore(daApplicare)
{
	var x = document.getElementById("punti_modificatore");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function avviaAnteprimaDocumento()
{
		var tab = window.open('', '_blank');
		tab.document.write(creaCodiceHTML());
		tab.document.close();
}

function creaCodiceHTML()
{
	var toReturn = "<!DOCTYPE html>";
	toReturn = toReturn + "<html>";

	toReturn = toReturn + "<head>";
	toReturn = toReturn + "<title>Regolamento creato</title>";
	toReturn = toReturn + "</head>";

	toReturn = toReturn + "<body style='font-family:sans-serif'>";
	toReturn = toReturn + "<h1>Regolamento Fantacalcio</h1>";

	toReturn = toReturn + estraiInformazioneCompetizione();
	toReturn = toReturn + estraiInformazioneRose();
	toReturn = toReturn + estraiInformazioniMercato();
	toReturn = toReturn + estraiInformazioniInfortuniSvincoli();
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

function estraiInformazioneCompetizione()
{
	var tipo = "";
	var toReturn = creaNuovoTitoloParagrafo("Tipologia competizione");
	var cbCalendario = estraiElementoDom("cbCalendario");
	var cbFormulaUno = estraiElementoDom("cbFormulaUno");
	if(cbCalendario.checked){
			tipo = "La competizione sarà una classica competizione a calendario, con inizio che verrà stabilito dai partecipanti ogni anno e con fine combaciante alla conclusione del campionato italiano reale. L’inizio sarebbe ideale dopo la conclusione del calcio mercato, ma, come detto sopra, tale decisione sarà presa dai partecipanti alla competizione.";
	} else {
			tipo = "La competizione sarà una competizione con stile Formula Uno, in cui ad ogni giornata ci saranno una griglia dei migliori punteggi da cui trarre i punti da aggiungere in classifica.";
	}
	toReturn = toReturn + aggiungiRigaTesto(tipo);
	return toReturn;
}

function estraiInformazioneRose()
{
	var toReturn = creaNuovoTitoloParagrafo("Struttura rose");
	toReturn = toReturn + estraiNumeroGiocatoriRosa();
	toReturn = toReturn + estraiAbilitazioneGiocatoriCondivisi();
	return toReturn;
}

function estraiNumeroGiocatoriRosa()
{
	var toReturn = "";
	let etPortieri = estraiElementoDom("etPortieri");
	let etDifensori = estraiElementoDom("etDifensori");
	let etCentrocampisti = estraiElementoDom("etCentrocampisti");
	let etAttaccanti = estraiElementoDom("etAttaccanti");
	toReturn = toReturn + aggiungiRigaTesto("Le rose dovranno essere cosi composte:");
	toReturn = toReturn + etPortieri.value + " portieri";
	toReturn = toReturn + "<br>";
	toReturn = toReturn + etDifensori.value + " difensori";
	toReturn = toReturn + "<br>";
	toReturn = toReturn + etCentrocampisti.value + " centrocampisti";
	toReturn = toReturn + "<br>";
	toReturn = toReturn + etAttaccanti.value + " attaccanti";
	toReturn = toReturn + "<br>";
	return toReturn;
}

function estraiAbilitazioneGiocatoriCondivisi()
{
	var toReturn = "";
	let cbCondivisiSi = estraiElementoDom("cbCondivisiSi");
	if (cbCondivisiSi.checked) {
		toReturn = aggiungiRigaTesto("Le rose composte potranno avere giocatori condivisi (stessi giocatori per più squadre).");
	} else {
		toReturn = aggiungiRigaTesto("Le rose composte NON potranno avere giocatori condivisi (stessi giocatori per più squadre).");
	}
	return toReturn;
}

function estraiInformazioniMercato()
{
	var toReturn = creaNuovoTitoloParagrafo("Gestione mercato");
	toReturn = toReturn + estraiNumeroCrediti();
	toReturn = toReturn + estraiAbilitazioneScambioCrediti();
	toReturn = toReturn + estraiAbilitazioneCambioRuolo();
	return toReturn;
}

function estraiNumeroCrediti()
{
	var toReturn = "";
	let etCrediti = estraiElementoDom("etCrediti");
	let etCreditiSessione = estraiElementoDom("etCreditiSessione");
	toReturn = toReturn + aggiungiRigaTesto("Per il mercato iniziale sono previsti " + etCrediti.value + " fantamilioni, utili a comporre la rosa iniziale.");
	let numeroCreditiSessione = etCreditiSessione.value;
	if(numeroCreditiSessione > 0){
		toReturn = toReturn + aggiungiRigaTesto("Per le successive sessioni di mercato invece sono previsti " + numeroCreditiSessione + " fantamilioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.");
	} else {
		toReturn = toReturn + aggiungiRigaTesto("Per le successive sessioni di mercato invece non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.");
	}
	return toReturn;
}

function estraiAbilitazioneScambioCrediti()
{
	var toReturn = "";
	let campoVerifica = estraiElementoDom("cbScambioCreditiSi");
	if (campoVerifica.checked) {
		toReturn = aggiungiRigaTesto("Sono permessi gli scambi di crediti tra i partecipanti, esempio si potrà fare Totti per Del Piero + 100 crediti.");
	} else {
		toReturn = aggiungiRigaTesto("Non sono permessi gli scambi di crediti tra i partecipanti, esempio non si potrà fare Totti per Del Piero + 100 crediti.");
	}
	return toReturn;
}

function estraiAbilitazioneCambioRuolo()
{
	var toReturn = "";
	let campoVerifica = estraiElementoDom("cbCambioRuoloSi");
	if (campoVerifica.checked) {
		toReturn = aggiungiRigaTesto("Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.");
	} else {
		toReturn = aggiungiRigaTesto("Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.");
	}
	return toReturn;
}

function estraiInformazioniInfortuniSvincoli()
{
	var toReturn = creaNuovoTitoloParagrafo("Gestione infortuni e svincoli");
	toReturn = toReturn + estraiGestioneSvincoli();
	toReturn = toReturn + estraiGestioneInfortuni();
	toReturn = toReturn + estraiGestoneCovid();
	return toReturn;
}

function estraiGestioneSvincoli()
{
	var toReturn = "";
	let cbNessunCredito = estraiElementoDom("cbSvincoloNessun");
	if (cbNessunCredito.checked) {
		toReturn = aggiungiRigaTesto("In caso di svincolo di giocatori acquistati in mercati precedenti, non verrà recuperato alcun credito.");
	} else {
		let cbUnCredito = estraiElementoDom("cbSvincoloUno");
		if (cbUnCredito.checked) {
			toReturn = aggiungiRigaTesto("In caso di svincolo di giocatori acquistati in mercati precedenti, la squadra riceverà un solo credito in ogni caso, solamente per permettere eventuali acquisti a quotazione uno di svincolati.");
		} else {
			let cbMeta = estraiElementoDom("cbSvincoloMeta");
			if (cbMeta.checked) {
				toReturn = aggiungiRigaTesto("In caso di svincolo di giocatori acquistati in mercati precedenti, la squadra riceverà crediti pari alla metà della quotazione di acquisto.");
			} else {
				let cbQuotazione = estraiElementoDom("cbSvincoloQuotazione");
				if (cbQuotazione.checked) {
					toReturn = aggiungiRigaTesto("In caso di svincolo di giocatori acquistati in mercati precedenti, la squadra riceverà crediti pari alla quotazione di acquisto.");
				}
			}
		}
	}
	return toReturn;
}

function estraiGestioneInfortuni()
{
	var toReturn = "";
	let cbInfortunioNessunPrestito = estraiElementoDom("cbInfortunioNessun");
	if (cbInfortunioNessunPrestito.checked) {
		toReturn = aggiungiRigaTesto("Se un calciatore subisce un infortunio, indipendentemente dal periodo di durata, NON ci saranno prestiti di nessun tipo. Il Fantacalcio si basa anche su fortuna e variabili non prevedibili, e gli infortuni appartengono a questa categoria.");
	} else {
		let cbInfortunioPrestito = estraiElementoDom("cbInfortunioPrestito");
		if (cbInfortunioPrestito.checked) {
			toReturn = aggiungiRigaTesto("Se un calciatore subisce un infortunio con durata maggiore ai sei mesi, la squadra proprietaria avrà diritto ad un prestito di un giocatore svincolato fino alla prossima sessione di mercato. Nota che tale regola ha senso solo se mancano almeno dieci giornate, altrimenti anche un infortunio di poche settimane porterebbe il calciatore a concludere la stagione.");
		}
	}
	return toReturn;
}

function estraiGestoneCovid()
{
	var toReturn = "";
	let cbCovidPolitico = estraiElementoDom("cbCovidPolitico");
	if (cbCovidPolitico.checked) {
		toReturn = aggiungiRigaTesto("In caso di calciatore schierato in formazione risultante positivo al COVID-19, si accederà alla votazione politica.");
	} else {
		let cbCovidPanchina = estraiElementoDom("cbCovidPanchina");
		if (cbCovidPanchina.checked) {
			toReturn = aggiungiRigaTesto("In caso di calciatore schierato in formazione risultante positivo al COVID-19, esso verrà semplicemente sostituito dal panchinaro in maniera classica. Nota che questa situazione può essere però pericolosa in caso di positività multiple.");
		}
	}
	return toReturn;
}

function estraiInformazioniInserimentoFormazione()
{
	var toReturn = creaNuovoTitoloParagrafo("Inserimento formazione");
	toReturn = toReturn + estraiMinutiTolleranza();
	toReturn = toReturn + estraiModuliConsentiti();
	toReturn = toReturn + estraiGestioneFormazioneNonInserita();
	toReturn = toReturn + estraiStrutturaPanchina();
	toReturn = toReturn + estraiAbilitazioneFormazioniInvisibili();
	return toReturn;
}

function estraiMinutiTolleranza()
{
	var toReturn = "";
	let etTolleranza = estraiElementoDom("etTolleranza");
	let numeroMinuti = etTolleranza.value;
	if (numeroMinuti <= 1) {
		toReturn = aggiungiRigaTesto("Le formazioni devono essere inserite entro un minuto dall’inizio della giornata reale del campionato italiano.");
	} else {
		toReturn = aggiungiRigaTesto("Le formazioni devono essere inserite entro " + numeroMinuti + " minuti dall’inizio della giornata reale del campionato italiano.");
	}
	return toReturn;
}

function estraiModuliConsentiti()
{
	var toReturn = "";
	toReturn = toReturn + aggiungiRigaTesto("I moduli consentiti per le formazioni sono:");
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

function verificaSingoloModulo(toReturn, idModulo, descrizione)
{
	let etModulo = estraiElementoDom(idModulo);
	if(etModulo.checked){
		toReturn = toReturn + descrizione + "<br>";
	}
	return toReturn;
}

function estraiGestioneFormazioneNonInserita()
{
	var toReturn = "";
	let cbVuota = estraiElementoDom("cbMancataNulla");
	if(cbVuota.checked) {
		toReturn = aggiungiRigaTesto("Se la formazione, per qualsiasi motivo, non viene inserita, NON viene recuperata quella della giornata precedente, ma verrà usata una formazione nulla con punteggio totale pari a ZERO. Se io mi preoccupo di mettere la squadra, non è bello perdere contro chi si dimentica.");
	} else {
		toReturn = aggiungiRigaTesto("Se la formazione, per qualsiasi motivo, non viene inserita, verrà recuperata la formazione della giornata precedente.");
	}
	return toReturn;
}

function estraiStrutturaPanchina()
{
	var toReturn = "";
	let etStruttura = estraiElementoDom("etPanchina");
	toReturn = aggiungiRigaTesto("La panchina dovrà avere la seguente struttura: " + etStruttura.value + ".");
	return toReturn;
}

function estraiAbilitazioneFormazioniInvisibili()
{
	var toReturn = "";
	let cbInvisibiliSi = estraiElementoDom("cbInvisibiliSi");
	if(cbInvisibiliSi.checked){
		toReturn = aggiungiRigaTesto("Sono ammesse le formazioni invisibili.");
	} else {
		toReturn = aggiungiRigaTesto("Non sono ammesse le formazioni invisibili.");
	}
	return toReturn;
}

function estraiGestioneSostituzioni()
{
	var toReturn = creaNuovoTitoloParagrafo("Gestione sostituzioni");
	toReturn = toReturn + estraiNumeroCambi();
	toReturn = toReturn + estraiGestioneAmmonizioneSenzaVoto();
	return toReturn;
}

function estraiNumeroCambi()
{
	var toReturn = "";
	let cbNessunLimite = estraiElementoDom("cbNessunLimite");
	if(cbNessunLimite.checked){
		toReturn = aggiungiRigaTesto("Non vi è nessun limite sul numero di sostituzioni, per cui tutta la panchina può entrare.");
	} else {
		let cbTreCambi = estraiElementoDom("cbTreCambi");
		if(cbTreCambi.checked){
			toReturn = aggiungiRigaTesto("Sono previste 3 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
		} else {
			let cbCinqueCambi = estraiElementoDom("cbCinqueCambi");
			if(cbCinqueCambi.checked){
				toReturn = aggiungiRigaTesto("Sono previste 5 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
			}
		}
	}
	return toReturn;
}

function estraiGestioneAmmonizioneSenzaVoto()
{
	var toReturn = "";
	let cbAmmIgnorata = estraiElementoDom("cbAmmIgnorata");
	if(cbAmmIgnorata.checked){
		toReturn = aggiungiRigaTesto("Nel caso in cui un giocatore SV (senza voto) venga ammonito, quella ammonizione non avrà alcun impatto né sul giocatore stesso né sul giocatore subentrato; quindi, il subentrato accederà al suo voto in maniera regolare.");
	} else {
		let cbAmmScalata = estraiElementoDom("cbAmmScalata");
		if(cbAmmScalata.checked){
			toReturn = aggiungiRigaTesto("Nel caso in cui un giocatore SV (senza voto) venga ammonito il malus della ammonizione ricevuta verrà riflesso sul giocatore subentrato, che dunque entrerà con la sua votazione minorata.");
		}
	}
	return toReturn;
}

function estraiDatiCalcoloGiornate()
{
	var toReturn = creaNuovoTitoloParagrafo("Calcolo giornate");
	toReturn = toReturn + estraiPunteggiVittoriaPareggio();
	toReturn = toReturn + estraiBonusMalus();
	toReturn = toReturn + estraiLarghezzaSoglie();
	toReturn = toReturn + estraiAbilitazioneFattoreCampo();
	toReturn = toReturn + estraiGestioneRinvio();
	toReturn = toReturn + estraiGestioneModificatore();
	return toReturn;
}

function estraiPunteggiVittoriaPareggio()
{
	var toReturn = "";
	let etVittoria = estraiElementoDom("etVittoria");
	let etPareggio = estraiElementoDom("etPareggio");
	let etSconfitta = estraiElementoDom("etSconfitta");
	toReturn = toReturn + aggiungiRigaTesto("I punteggi rilevati da una singola partita saranno:");
	toReturn = toReturn + "Vittoria: " + etVittoria.value + " punti.<br>";
	toReturn = toReturn + "Pareggio: " + etPareggio.value + " punti.<br>";
	toReturn = toReturn + "Sconfitta: " + etSconfitta.value + " punti.<br>";
	return toReturn;
}

function estraiBonusMalus()
{
	var toReturn = "";
	toReturn = toReturn + aggiungiRigaTesto("I bonus e malus previsti dalla competizione saranno:");
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
	return toReturn;
}

function verificaSingoloBonus(toReturn, idBonus, descrizione)
{
	let etElemento = estraiElementoDom(idBonus);
	toReturn = toReturn + descrizione + ": " + etElemento.value + " punti.<br>";
	return toReturn;
}

function estraiLarghezzaSoglie()
{
	var toReturn = "";
	let etSoglie = estraiElementoDom("etSoglie");
	toReturn = aggiungiRigaTesto("Le soglie per il calcolo del numero di gol saranno ciascuna da " + etSoglie.value + " punti.");
	return toReturn;
}

function estraiAbilitazioneFattoreCampo()
{
	var toReturn = "";
	let etFattoreSi = estraiElementoDom("cbFattoreSi");
	if(etFattoreSi.checked){
		toReturn = aggiungiRigaTesto("E' previsto un fattore campo, ossia giocare in casa oppure fuori casa ha influenza sul calcolo della giornata.");
	} else {
		toReturn = aggiungiRigaTesto("Non verrà applicato mai nessun fattore campo, ossia giocare in casa oppure fuori casa non ha influenza sul calcolo della giornata.");
	}
	return toReturn;
}

function estraiGestioneRinvio()
{
	var toReturn = "";
	let cbRinvioMai = estraiElementoDom("cbRinvioMai");
	if(cbRinvioMai.checked) {
		toReturn = aggiungiRigaTesto("Nel caso in cui una o più partite vengano rinviate per qualsiasi motivo, NON si attenderà MAI la sua conclusione, ma si accederà sempre alle votazioni politiche.");
	} else {
			let cbRinvioProssima = estraiElementoDom("cbRinvioProssima");
			if(cbRinvioProssima.checked){
				toReturn = aggiungiRigaTesto("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che essa venga recuperata al massimo fino alla prossima giornata, dopodichè si ricorrerà alle votazioni politiche. Questa decisione viene presa nell’ottica di evitare accavvallamenti di calcoli giornate, che, in caso di coppe aggiuntive, porterebbero ad ulteriori difficoltà di gestione.");
			} else {
					let cbRinvioPolitico = estraiElementoDom("cbRinvioPolitico");
					if(cbRinvioPolitico.checked){
						toReturn = aggiungiRigaTesto("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, accederà in ogni caso alla votazione politica.");
					} else {
						let cbRinvioPanchina = estraiElementoDom("cbRinvioPanchina");
						if(cbRinvioPanchina.checked){
							toReturn = aggiungiRigaTesto("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, entrerà in ogni caso il panchinaro previsto.");
						}
					}
			}
	}
	return toReturn;
}

function estraiGestioneModificatore()
{
	var toReturn = "";
	let cbModificatoreNo = estraiElementoDom("cbModificatoreNo");
	if(cbModificatoreNo.checked){
		toReturn = aggiungiRigaTesto("Il calcolo della giornata non prevede nessun modificatore di difesa");
	} else {
		let cbModificatoreSi = estraiElementoDom("cbModificatoreSi");
		if(cbModificatoreSi.checked){
			toReturn = aggiungiRigaTesto("Il calcolo della giornata prevede il modificatore di difesa, con i seguenti scaglioni:");
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

function estraiDatiClassifica()
{
	var toReturn = creaNuovoTitoloParagrafo("Classifica");
	toReturn = toReturn + aggiungiRigaTesto("La classifica verrà calcolata in base al seguente criterio:");
	toReturn = toReturn + "1. Punti in classifica" + "<br>";
	toReturn = toReturn + "2. Somma punti totale" + "<br>";
	toReturn = toReturn + "3. Differenza reti" + "<br>";
	toReturn = toReturn + "4. Gol fatti" + "<br>";
	toReturn = toReturn + "5. Gol subiti" + "<br>";
	toReturn = toReturn + "6. Classifica avulsa" + "<br>";
	toReturn = toReturn + aggiungiRigaTesto("In caso di parità perfetta, verrano sommati i premi previsti e divisi per le squadre che rilevano la perfetta parità.");
	return toReturn;
}

function estraiQuotePremiFinali()
{
	var toReturn = creaNuovoTitoloParagrafo("Quote squadre e premi finali");
	toReturn = toReturn + estraiQuotaSquadra();
	toReturn = toReturn + estraiDivisionePremi();
	return toReturn;
}

function estraiQuotaSquadra()
{
	var toReturn = "";
	let etQuota = estraiElementoDom("etQuota");
	toReturn = aggiungiRigaTesto("La quota di partecipazione prevista per ciascuna squadra è di " + etQuota.value + " euro.");
	return toReturn;
}

function estraiDivisionePremi()
{
	var toReturn = "";
	let etPremi = estraiElementoDom("etPremi");
	if(etPremi != null){
		toReturn = aggiungiRigaTesto("I premi totali inoltre saranno cosi suddivisi:");
		toReturn = toReturn + etPremi.textContent.replace(/newline/g, "<br>");
	}
	return toReturn;
}

function creaNuovoTitoloParagrafo(titolo)
{
	return "<h2>" + titolo + "</h2>";
}

function aggiungiRigaTesto(testo)
{
	return "<p>" + testo + "</p>";
}

function estraiElementoDom(idElemento)
{
	return document.getElementById(idElemento);
}

function inviaMailSupporto()
{
    var link = "mailto:paolinoangeletti@gmail.com?subject=FantaRegolamento | Richiesto supporto&body=Hai bisogno di supporto oppure vuoi aiutarci a completare la pagina? Scrivi qui quello di cui hai bisogno!";
    window.location.href = link;
}
