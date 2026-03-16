const CompetitionType = {
    sectionName: "Tipologia competizione",

    produce: function (sectionIndex) {
        let toReturn = [];
        toReturn.push(Utils.addSectionTitle(sectionIndex, this.sectionName));
        toReturn.push(this.estraiTipoCompetizione(sectionIndex));
        toReturn.push(this.estraiDurataCompetizione(sectionIndex));
        return toReturn;
    },

    estraiTipoCompetizione: function (sectionIndex) {
        let toReturn = "";
        let cbListone = Utils.retrieveDomElement("cbListone");
        let cbCalendario = Utils.retrieveDomElement("cbCalendario");
        let cbFormulaUno = Utils.retrieveDomElement("cbFormulaUno");
        if (cbCalendario.checked) {
            toReturn = "La competizione sarà una classica competizione a calendario.";
        } else if (cbFormulaUno.checked) {
            toReturn = "La competizione sarà una competizione con stile Formula Uno, in cui ad ogni giornata ci saranno una griglia dei migliori punteggi da cui trarre i punti da aggiungere in classifica.";
        } else if (cbListone.checked) {
            toReturn = "La competizione sarà una competizione a listone, in cui ogni squadra potrà comporre la propria rosa usando i crediti massimi previsti.";
        }
        return Utils.addTextRow(sectionIndex, 1, toReturn);
    },

    estraiDurataCompetizione: function (sectionIndex) {
        let etFine = Utils.retrieveDomElement("etFine");
        let etInizio = Utils.retrieveDomElement("etInizio");

        let endValue = parseInt(etFine.value);
        let startValue = parseInt(etInizio.value);
        FieldValidation.validateInt(this.sectionName, "Fine competizione", endValue, false, false, 38);
        FieldValidation.validateInt(this.sectionName, "Inizio competizione", startValue, false, false, 38);
        FieldValidation.compareMinorToMajor(this.sectionName, "Inizio competizione", "Fine competizione", startValue, endValue);

        let toReturn = "L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata " + startValue + " e con la giornata " + endValue + " del campionato reale.";
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    }
};