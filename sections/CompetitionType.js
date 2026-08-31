const CompetitionType = {
    sectionName: "Tipologia competizione",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiTipoCompetizione());
        rules.push(this.estraiDurataCompetizione());
        rules.push(this.estraiSistemaRuoli());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiTipoCompetizione: function () {
        let cbListone = Utils.retrieveDomElement("cbListone");
        let cbCalendario = Utils.retrieveDomElement("cbCalendario");
        let cbFormulaUno = Utils.retrieveDomElement("cbFormulaUno");

        let toReturn = "";
        if (cbCalendario.checked) {
            toReturn = "La competizione sarà una classica competizione a calendario.";
        } else if (cbFormulaUno.checked) {
            toReturn = "La competizione sarà una competizione con stile Formula Uno, in cui ad ogni giornata ci saranno una griglia dei migliori punteggi da cui trarre i punti da aggiungere in classifica.";
        } else if (cbListone.checked) {
            toReturn = "La competizione sarà una competizione a listone, in cui ogni squadra potrà comporre la propria rosa usando i crediti massimi previsti.";
        }
        return toReturn;
    },

    estraiDurataCompetizione: function () {
        let etFine = Utils.retrieveDomElement("etFine");
        let etInizio = Utils.retrieveDomElement("etInizio");

        let endValue = parseInt(etFine.value);
        let startValue = parseInt(etInizio.value);
        FieldValidation.validateInt(this.sectionName, "Fine competizione", endValue, false, false, 38);
        FieldValidation.validateInt(this.sectionName, "Inizio competizione", startValue, false, false, 38);
        FieldValidation.compareMinorToMajor(this.sectionName, "Inizio competizione", "Fine competizione", startValue, endValue);

        return "L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata " + startValue + " e con la giornata " + endValue + " del campionato reale.";
    },

    estraiSistemaRuoli: function () {
        let valueId = Utils.getSelectedRadioId("fSistemaGioco");
        if ("cbMantra" === valueId) {
            return "La competizione verrà svolta applicando le regole della modalità Mantra.";
        } else {
            return "La competizione verrà svolta applicando le regole della modalità Classic, per cui verranno utilizzati i ruoli P-D-C-A.";
        }
    }
};