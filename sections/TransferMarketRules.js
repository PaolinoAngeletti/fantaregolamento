const TransferMarketRules = {
    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, "Gestione mercato");
        toReturn = toReturn + this.estraiNumeroCrediti(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneScambioCrediti(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneCambioRuolo(sectionIndex);
        toReturn = toReturn + this.estraiGestioneSvincoliMercato(sectionIndex);
        toReturn = toReturn + this.estraiNumeroMassimoCambiConsentiti(sectionIndex);
        toReturn = toReturn + this.estraiEventualiNoteAggiuntiveMercato(sectionIndex);
        return toReturn;
    },

    estraiNumeroCrediti: function (sectionIndex) {
        let etCrediti = Utils.retrieveDomElement("etCrediti");
        var toReturn = Utils.addTextRow(sectionIndex, 1, "Per il mercato iniziale sono previsti " + etCrediti.value + " fantamilioni, utili a comporre la rosa iniziale.");
        return toReturn + this.estraiNumeroCreditiSuccessivi(sectionIndex);
    },

    estraiNumeroCreditiSuccessivi: function (sectionIndex) {
        let etCreditiSessione = Utils.retrieveDomElement("etCreditiSessione");
        let numeroCreditiSessione = etCreditiSessione.value;
        if (numeroCreditiSessione > 0) {
            toReturn = "Per le successive sessioni di mercato invece sono previsti " + numeroCreditiSessione + " fantamilioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.";
        } else {
            toReturn = "Per le successive sessioni di mercato invece non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.";
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    },

    estraiAbilitazioneScambioCrediti: function (sectionIndex) {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbScambioCreditiSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi gli scambi di crediti tra i partecipanti, esempio si potrà fare Totti per Del Piero + 100 crediti.";
        } else {
            toReturn = "Non sono permessi gli scambi di crediti tra i partecipanti, esempio non si potrà fare Totti per Del Piero + 100 crediti.";
        }
        return Utils.addTextRow(sectionIndex, 3, toReturn);
    },

    estraiAbilitazioneCambioRuolo: function (sectionIndex) {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbCambioRuoloSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.";
        } else {
            toReturn = "Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.";
        }
        return Utils.addTextRow(sectionIndex, 4, toReturn);
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
        return Utils.addTextRow(sectionIndex, 5, toReturn);
    },

    estraiNumeroMassimoCambiConsentiti: function (sectionIndex) {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMassimoScambi");
        let numeroCambi = campoCambiMassimi.value;
        if (numeroCambi > 0) {
            toReturn = "Ogni squadra potrà effettuare un numero massimo di cambio giocatori pari a " + numeroCambi + ".";
        } else {
            toReturn = "Non ci sono limiti relativi al massimo numero di giocatori modificabili in una rosa.";
        }
        return Utils.addTextRow(sectionIndex, 6, toReturn);
    },

    estraiEventualiNoteAggiuntiveMercato: function (sectionIndex) {
        var toReturn = "";
        let etNoteMercato = Utils.retrieveDomElement("etNoteMercato");
        if (etNoteMercato != null) {
            var testoNote = etNoteMercato.value;
            if (testoNote.trim() !== "") {
                toReturn = Utils.addTextRow(sectionIndex, 7, Utils.resolveEscapes(testoNote));
            }
        }
        return toReturn;
    }
};