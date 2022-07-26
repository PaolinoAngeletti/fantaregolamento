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
		var tab = window.open('about:blank', '_blank');
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
	toReturn = verificaSingoloModulo(toReturn, "cb442", "4-4-2");
	toReturn = verificaSingoloModulo(toReturn, "cb433", "4-3-3");
	toReturn = verificaSingoloModulo(toReturn, "cb451", "4-5-1");
	toReturn = verificaSingoloModulo(toReturn, "cb343", "3-4-3");
	toReturn = verificaSingoloModulo(toReturn, "cb352", "3-5-2");
	toReturn = verificaSingoloModulo(toReturn, "cb532", "5-3-2");
	toReturn = verificaSingoloModulo(toReturn, "cb541", "5-4-1");
	toReturn = verificaSingoloModulo(toReturn, "cb631", "6-3-1");
	toReturn = verificaSingoloModulo(toReturn, "cb622", "6-2-2");
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
