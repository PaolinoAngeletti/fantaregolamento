const SubstitutionRules = {

    sectionName: "Gestione sostituzioni",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiNumeroCambi());
        rules.push(this.estraiGestioneAmmonizioneSenzaVoto());
        rules.push(this.estraiEventualiNoteAggiuntive());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiNumeroCambi: function () {
        let toReturn;
        let etNrSubstitutions = Utils.retrieveDomElement("etNumSostituzioni");
        let nrSubstitutions = etNrSubstitutions.value;
        FieldValidation.validateInt(this.sectionName, "Numero sostituzioni", nrSubstitutions, false);

        if (parseInt(nrSubstitutions) === 0) {
            toReturn = "Non vi è nessun limite sul numero di sostituzioni, per cui tutta la panchina può entrare.";
        } else {
            toReturn = "Sono previste " + nrSubstitutions + " sostituzioni massime, dopodiché si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.";
        }
        return toReturn;
    },

    estraiGestioneAmmonizioneSenzaVoto: function () {
        let toReturn = "";
        let cbAmmIgnorata = Utils.retrieveDomElement("cbAmmIgnorata");
        if (cbAmmIgnorata.checked) {
            toReturn = "Nel caso in cui un giocatore SV (senza voto) venga ammonito, quella ammonizione non avrà alcun impatto né sul giocatore stesso né sul giocatore subentrato; quindi, il subentrato accederà al suo voto in maniera regolare.";
        } else {
            let cbAmmScalata = Utils.retrieveDomElement("cbAmmCascade");
            if (cbAmmScalata.checked) {
                toReturn = "Nel caso in cui un giocatore SV (senza voto) venga ammonito il malus della ammonizione ricevuta verrà riflesso sul giocatore subentrato, che dunque entrerà con la sua votazione minorata.";
            }
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteSostituzioni");
    }
};