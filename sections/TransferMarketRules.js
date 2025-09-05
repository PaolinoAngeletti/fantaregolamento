const TransferMarketRules = {
    sectionName: "Gestione mercato",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiNumeroCrediti());
        rules.push(this.estraiNumeroCreditiSuccessivi());
        rules.push(this.retrieveFinishedCreditsManagement());
        rules.push(this.retrieveResidualCreditsManagements());
        rules.push(this.estraiAbilitazioneCambioRuolo());
        rules.push(this.estraiNumeroMassimoCambiCompetizione());
        rules.push(this.estraiNumeroMassimoCambiSessione());
        rules.push(this.estraiNumeroMassimoCambiRuolo());
        rules.push(this.estraiEventualiNoteAggiuntiveMercato());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiNumeroCrediti: function () {
        let etCrediti = Utils.retrieveDomElement("etCrediti");
        let creditsNumber = etCrediti.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti", creditsNumber, false, false);

        var toReturn = "Per il mercato iniziale sono previsti " + creditsNumber + " fantamilioni, utili a comporre la rosa iniziale.";
        return toReturn;
    },

    estraiNumeroCreditiSuccessivi: function () {
        let etCreditiSessione = Utils.retrieveDomElement("etCreditiSessione");
        let numeroCreditiSessione = etCreditiSessione.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti per sessione", numeroCreditiSessione, false);

        if (numeroCreditiSessione > 0) {
            toReturn = "Per le successive sessioni di mercato sono previsti " + numeroCreditiSessione + " fantamilioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.";
        } else {
            toReturn = "Per le successive sessioni di mercato non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.";
        }
        return toReturn;
    },

    retrieveFinishedCreditsManagement: function () {
        var toReturn = "";
        let taFinishedCredits = Utils.retrieveDomElement("taCreditiFiniti");
        let finishedCredistValue = taFinishedCredits.value;
        if (Utils.isValidString(finishedCredistValue)) {
            toReturn = "Nel caso in cui una squadra superi il numero di crediti spendibili, verrà applicata la seguente strategia: " + finishedCredistValue;
        } else {
            toReturn = "Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili per il mercato, per cui questo comportamento verrà deciso il giorno stesso del mercato.";
        }
        return toReturn;
    },

    retrieveResidualCreditsManagements: function () {
        var toReturn = null;
        let etResidualEnabled = Utils.retrieveDomElement("cbResiduiSi");
        if (etResidualEnabled.checked) {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno utilizzati come base di partenza per la successiva sessione di mercato.";
        } else {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno ignorati, per cui non verranno utilizzati per le successive sessioni di mercato.";
        }
        return toReturn;
    },

    estraiAbilitazioneCambioRuolo: function () {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbCambioRuoloSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.";
        } else {
            toReturn = "Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.";
        }
        return toReturn;
    },

    estraiNumeroMassimoCambiCompetizione: function () {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMaxScambiCompetizione");
        let numeroCambi = campoCambiMassimi.value;
        FieldValidation.validateInt(this.sectionName, "Scambi massimi per competizione", numeroCambi, false);

        if (numeroCambi > 0) {
            toReturn = "Previsto limite di cambi massimi per l'intera competizione, per cui potranno essere cambiati massimo " + numeroCambi + " giocatori per l'intera durata della competizione.";
        } else {
            toReturn = "Non ci sono limiti relativi al massimo numero di giocatori modificabili per la competizione, per cui ogni squadra potrà cambiare tutti i giocatori che vuole durante la competizione.";
        }
        return toReturn;
    },

    estraiNumeroMassimoCambiSessione: function () {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMaxScambiSessione");
        let numeroCambi = campoCambiMassimi.value;
        FieldValidation.validateInt(this.sectionName, "Scambi massimi per sessione", numeroCambi, false);

        let campoCambiCompetizione = Utils.retrieveDomElement("etMaxScambiCompetizione");
        let numeroCambiCompetizione = campoCambiCompetizione.value;
        FieldValidation.compareMinorToMajor(this.sectionName, "Scambi per sessione", "Scambi per competizione", numeroCambi, numeroCambiCompetizione);

        if (numeroCambi > 0) {
            toReturn = "Previsto limite di cambi massimi per una singola sessione di mercato, per cui potranno essere cambiati massimo " + numeroCambi + " giocatori in una singola sessione di mercato.";
        } else {
            toReturn = "Non ci sono limiti relativi al massimo numero di giocatori modificabili in una singola sessione di mercato, per cui ogni squadra potrà cambiare tutti i giocatori che vuole durante una singola sessione.";
        }
        return toReturn;
    },

    estraiNumeroMassimoCambiRuolo: function () {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMaxScambiRuolo");
        let numeroCambi = campoCambiMassimi.value;
        FieldValidation.validateInt(this.sectionName, "Scambi massimi per ruolo", numeroCambi, false);

        let campoCambiSessione = Utils.retrieveDomElement("etMaxScambiSessione");
        let numeroCambiSessione = campoCambiSessione.value;
        FieldValidation.compareMinorToMajor(this.sectionName, "Scambi per ruolo", "Scambi per sessione", numeroCambi, numeroCambiSessione);

        if (numeroCambi > 0) {
            toReturn = "Previsto limite di cambi massimi per ruolo, per cui potranno essere cambiati massimo " + numeroCambi + " giocatori con stesso ruolo durante una singola sessione di mercato.";
        } else {
            toReturn = "Non ci sono limiti relativi al massimo numero di giocatori modificabili per ruolo, per cui si farà riferimento solamente al numero massimo di cambi in singola sessione.";
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntiveMercato: function () {
        var toReturn = "";
        let etNoteMercato = Utils.retrieveDomElement("etNoteMercato");
        if (etNoteMercato != null) {
            var testoNote = etNoteMercato.value;
            if (testoNote.trim() !== "") {
                toReturn = Utils.resolveEscapes(testoNote);
            }
        }
        return toReturn;
    }
};