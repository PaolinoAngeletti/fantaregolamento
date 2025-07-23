const CompetitionType = {
    sectionName: "Tipologia competizione",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiTipoCompetizione(sectionIndex);
        toReturn = toReturn + this.estraiDurataCompetizione(sectionIndex);
        return toReturn;
    },

    estraiTipoCompetizione: function (sectionIndex) {
        var toReturn = "";
        let cbListone = Utils.retrieveDomElement("cbListone");
        let cbCalendario = Utils.retrieveDomElement("cbCalendario");
        let cbFormulaUno = Utils.retrieveDomElement("cbFormulaUno");
        if (cbCalendario.checked) {
            tipo = "La competizione sarà una classica competizione a calendario.";
        } else if (cbFormulaUno.checked) {
            tipo = "La competizione sarà una competizione con stile Formula Uno, in cui ad ogni giornata ci saranno una griglia dei migliori punteggi da cui trarre i punti da aggiungere in classifica.";
        } else if (cbListone.checked) {
            tipo = "La competizione sarà una competizione a listone, in cui ogni squadra potrà comporre la propria rosa usando i crediti massimi previsti.";
        }
        toReturn = toReturn + Utils.addTextRow(sectionIndex, 1, tipo);
        return toReturn;
    },

    estraiDurataCompetizione: function (sectionIndex) {
        var toReturn = "";
        var etFine = Utils.retrieveDomElement("etFine");
        var etInizio = Utils.retrieveDomElement("etInizio");

        let endValue = parseInt(etFine.value);
        let startValue = parseInt(etInizio.value);
        FieldValidation.validateInt(this.sectionName, "Fine competizione", endValue, false, false, 38);
        FieldValidation.validateInt(this.sectionName, "Inizio competizione", startValue, false, false, 38);
        FieldValidation.compareMinorToMajor(this.sectionName, "Inizio competizione", "Fine competizione", startValue, endValue);

        toReturn = "L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata " + startValue + " e con la giornata " + endValue + " del campionato reale.";
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    }
};