const TransferMarketRules = {
    sectionName: "Gestione mercato",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiNumeroCrediti(sectionIndex);
        toReturn = toReturn + this.retrieveFinishedCreditsManagement(sectionIndex);
        toReturn = toReturn + this.retrieveResidualCreditsManagements(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneScambioCrediti(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneCambioRuolo(sectionIndex);
        toReturn = toReturn + this.estraiGestioneSvincoliMercato(sectionIndex);
        toReturn = toReturn + this.estraiNumeroMassimoCambiCompetizione(sectionIndex);
        toReturn = toReturn + this.estraiNumeroMassimoCambiSessione(sectionIndex);
        toReturn = toReturn + this.estraiNumeroMassimoCambiRuolo(sectionIndex);
        toReturn = toReturn + this.estraiEventualiNoteAggiuntiveMercato(sectionIndex);
        return toReturn;
    },

    estraiNumeroCrediti: function (sectionIndex) {
        let etCrediti = Utils.retrieveDomElement("etCrediti");
        let creditsNumber = etCrediti.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti", creditsNumber, false, false);

        var toReturn = Utils.addTextRow(sectionIndex, 1, "Per il mercato iniziale sono previsti " + creditsNumber + " fantamilioni, utili a comporre la rosa iniziale.");
        return toReturn + this.estraiNumeroCreditiSuccessivi(sectionIndex);
    },

    estraiNumeroCreditiSuccessivi: function (sectionIndex) {
        let etCreditiSessione = Utils.retrieveDomElement("etCreditiSessione");
        let numeroCreditiSessione = etCreditiSessione.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti per sessione", numeroCreditiSessione, false);

        if (numeroCreditiSessione > 0) {
            toReturn = "Per le successive sessioni di mercato invece sono previsti " + numeroCreditiSessione + " fantamilioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.";
        } else {
            toReturn = "Per le successive sessioni di mercato invece non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.";
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    },

    retrieveFinishedCreditsManagement: function (sectionIndex) {
        var toReturn = "";
        let taFinishedCredits = Utils.retrieveDomElement("taCreditiFiniti");
        let finishedCredistValue = taFinishedCredits.value;
        if(Utils.isValidString(finishedCredistValue)){
            toReturn = "Nel caso in cui una squadra superi il numero di crediti spendibili, verrà applicata la seguente strategia: " + finishedCredistValue;
        } else {
            toReturn = "Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili per il mercato, per cui questo comportamento verrà deciso il giorno stesso del mercato.";
        }
        return Utils.addTextRow(sectionIndex, 3, toReturn);
    },

    retrieveResidualCreditsManagements: function (sectionIndex) {
        var toReturn = null;
        let etResidualEnabled = Utils.retrieveDomElement("cbResiduiSi");
        if (etResidualEnabled.checked) {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno utilizzati come base di partenza per la successiva sessione di mercato.";
        } else {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno ignorati, per cui non verranno utilizzati per le successive sessioni di mercato.";
        }
        return Utils.addTextRow(sectionIndex, 4, toReturn);
    },

    estraiAbilitazioneScambioCrediti: function (sectionIndex) {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbScambioCreditiSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi gli scambi di crediti tra i partecipanti, esempio si potrà fare Totti per Del Piero + 100 crediti.";
        } else {
            toReturn = "Non sono permessi gli scambi di crediti tra i partecipanti, esempio non si potrà fare Totti per Del Piero + 100 crediti.";
        }
        return Utils.addTextRow(sectionIndex, 5, toReturn);
    },

    estraiAbilitazioneCambioRuolo: function (sectionIndex) {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbCambioRuoloSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.";
        } else {
            toReturn = "Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.";
        }
        return Utils.addTextRow(sectionIndex, 6, toReturn);
    },

    estraiGestioneSvincoliMercato: function (sectionIndex) {
        var toReturn = "";
        var campoSvincolo = Utils.retrieveDomElement("cbSvincoloAcquisto");
        if (campoSvincolo.checked) {
            toReturn = "Prevista l'applicazione dello svincolo su acquisto, ossia ogni partecipante dovrà comunicare lo svincolo solamente dopo aver eseguito un acquisto. Per la gestione del singolo svincolo invece vi è una regola specifica.";
        } else {
            campoSvincolo = Utils.retrieveDomElement("cbSvincoloInizioSi");
            if (campoSvincolo.checked) {
                toReturn = "Ad ogni sessione di mercato, una squadra interessata ad acquistare dovrà comunicare in anticipo i giocatori da svincolare, potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso.";
            } else {
                campoSvincolo = Utils.retrieveDomElement("cbSvincoloInizioNo");
                if (campoSvincolo.checked) {
                    toReturn = "Ad ogni sessione di mercato, una squadra interessata ad acquistare dovrà comunicare in anticipo i giocatori da svincolare, NON potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso.";
                }
            }
        }
        return Utils.addTextRow(sectionIndex, 7, toReturn);
    },

    estraiNumeroMassimoCambiCompetizione: function (sectionIndex) {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMaxScambiCompetizione");
        let numeroCambi = campoCambiMassimi.value;
        FieldValidation.validateInt(this.sectionName, "Scambi massimi per competizione", numeroCambi, false);

        if (numeroCambi > 0) {
            toReturn = "Previsto limite di cambi massimi per l'intera competizione, per cui potranno essere cambiati massimo " + numeroCambi + " giocatori per l'intera durata della competizione.";
        } else {
            toReturn = "Non ci sono limiti relativi al massimo numero di giocatori modificabili per la competizione, per cui ogni squadra potrà cambiare tutti i giocatori che vuole durante la competizione.";
        }
        return Utils.addTextRow(sectionIndex, 8, toReturn);
    },

    estraiNumeroMassimoCambiSessione: function (sectionIndex) {
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
        return Utils.addTextRow(sectionIndex, 9, toReturn);
    },

    estraiNumeroMassimoCambiRuolo: function (sectionIndex) {
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
        return Utils.addTextRow(sectionIndex, 10, toReturn);
    },

    estraiEventualiNoteAggiuntiveMercato: function (sectionIndex) {
        var toReturn = "";
        let etNoteMercato = Utils.retrieveDomElement("etNoteMercato");
        if (etNoteMercato != null) {
            var testoNote = etNoteMercato.value;
            if (testoNote.trim() !== "") {
                toReturn = Utils.addTextRow(sectionIndex, 11, Utils.resolveEscapes(testoNote));
            }
        }
        return toReturn;
    }
};