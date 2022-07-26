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
