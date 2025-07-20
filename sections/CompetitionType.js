const CompetitionType = {
    produce: function () {
        var toReturn = creaNuovoTitoloParagrafo("Tipologia competizione");
        toReturn = toReturn + this.estraiTipoCompetizione();
        toReturn = toReturn + this.estraiDurataCompetizione();
        return toReturn;
    },

    estraiTipoCompetizione: function () {
        var toReturn = "";
        let cbListone = Utils.estraiElementoDom("cbListone");
        let cbCalendario = Utils.estraiElementoDom("cbCalendario");
        let cbFormulaUno = Utils.estraiElementoDom("cbFormulaUno");
        if (cbCalendario.checked) {
            tipo = "La competizione sarà una classica competizione a calendario.";
        } else if (cbFormulaUno.checked) {
            tipo = "La competizione sarà una competizione con stile Formula Uno, in cui ad ogni giornata ci saranno una griglia dei migliori punteggi da cui trarre i punti da aggiungere in classifica.";
        } else if (cbListone.checked) {
            tipo = "La competizione sarà una competizione a listone, in cui ogni squadra potrà comporre la propria rosa usando i crediti massimi previsti.";
        }
        toReturn = toReturn + aggiungiRigaTesto(tipo);
        return toReturn;
    },

    estraiDurataCompetizione: function () {
        var toReturn = "";
        var etFine = estraiElementoDom("etFine");
        var etInizio = estraiElementoDom("etInizio");
        toReturn = "L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata " + etInizio.value + " e con la giornata " + etFine.value + " del campionato reale.";
        return toReturn;
    }
};