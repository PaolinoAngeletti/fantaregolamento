const SubstitutionRules = {
    sectionName: "Gestione sostituzioni",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiNumeroCambi(sectionIndex);
        toReturn = toReturn + this.estraiGestioneAmmonizioneSenzaVoto(sectionIndex);
        toReturn = toReturn + this.estraiEventualiNoteAggiuntive(sectionIndex);
        return toReturn;
    },

    estraiNumeroCambi: function (sectionIndex) {
        var toReturn = "";
        let etNrSubstitutions = Utils.retrieveDomElement("etNumSostituzioni");
        let nrSubstituions = etNrSubstitutions.value;
        FieldValidation.validateInt(this.sectionName, "Numero sostituzioni", nrSubstituions, false);

        if (nrSubstituions == 0) {
            toReturn = "Non vi è nessun limite sul numero di sostituzioni, per cui tutta la panchina può entrare.";
        } else {
            toReturn = "Sono previste " + nrSubstituions + " sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.";
        }
        return Utils.addTextRow(sectionIndex, 1, toReturn);
    },

    estraiGestioneAmmonizioneSenzaVoto: function (sectionIndex) {
        var toReturn = "";
        let cbAmmIgnorata = Utils.retrieveDomElement("cbAmmIgnorata");
        if (cbAmmIgnorata.checked) {
            toReturn = "Nel caso in cui un giocatore SV (senza voto) venga ammonito, quella ammonizione non avrà alcun impatto né sul giocatore stesso né sul giocatore subentrato; quindi, il subentrato accederà al suo voto in maniera regolare.";
        } else {
            let cbAmmScalata = Utils.retrieveDomElement("cbAmmScalata");
            if (cbAmmScalata.checked) {
                toReturn = "Nel caso in cui un giocatore SV (senza voto) venga ammonito il malus della ammonizione ricevuta verrà riflesso sul giocatore subentrato, che dunque entrerà con la sua votazione minorata.";
            }
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    },

    estraiEventualiNoteAggiuntive: function (sectionIndex) {
        var toReturn = "";
        let etNote = Utils.retrieveDomElement("etNoteSostituzioni");
        if (etNote != null) {
            var noteText = etNote.value;
            if (noteText.trim() !== "") {
                toReturn = Utils.addTextRow(sectionIndex, 3, Utils.resolveEscapes(noteText));
            }
        }
        return toReturn;
    }
};