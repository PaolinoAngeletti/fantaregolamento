const TransferMarketRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Gestione mercato");
        toReturn = toReturn + this.estraiNumeroCrediti();
        toReturn = toReturn + this.estraiAbilitazioneScambioCrediti();
        toReturn = toReturn + this.estraiAbilitazioneCambioRuolo();
        toReturn = toReturn + this.estraiGestioneSvincoliMercato();
        toReturn = toReturn + this.estraiNumeroMassimoCambiConsentiti();
        toReturn = toReturn + this.estraiEventualiNoteAggiuntiveMercato();
        return toReturn;
    },

    estraiNumeroCrediti: function () {
        var toReturn = "";
        let etCrediti = Utils.retrieveDomElement("etCrediti");
        let etCreditiSessione = Utils.retrieveDomElement("etCreditiSessione");
        toReturn = toReturn + Utils.addTextRow("Per il mercato iniziale sono previsti " + etCrediti.value + " fantamilioni, utili a comporre la rosa iniziale.");
        let numeroCreditiSessione = etCreditiSessione.value;
        if (numeroCreditiSessione > 0) {
            toReturn = toReturn + Utils.addTextRow("Per le successive sessioni di mercato invece sono previsti " + numeroCreditiSessione + " fantamilioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.");
        } else {
            toReturn = toReturn + Utils.addTextRow("Per le successive sessioni di mercato invece non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.");
        }
        return toReturn;
    },

    estraiAbilitazioneScambioCrediti: function () {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbScambioCreditiSi");
        if (campoVerifica.checked) {
            toReturn = Utils.addTextRow("Sono permessi gli scambi di crediti tra i partecipanti, esempio si potrà fare Totti per Del Piero + 100 crediti.");
        } else {
            toReturn = Utils.addTextRow("Non sono permessi gli scambi di crediti tra i partecipanti, esempio non si potrà fare Totti per Del Piero + 100 crediti.");
        }
        return toReturn;
    },

    estraiAbilitazioneCambioRuolo: function () {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbCambioRuoloSi");
        if (campoVerifica.checked) {
            toReturn = Utils.addTextRow("Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.");
        } else {
            toReturn = Utils.addTextRow("Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.");
        }
        return toReturn;
    },

    estraiGestioneSvincoliMercato: function () {
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
        return toReturn;
    },

    estraiNumeroMassimoCambiConsentiti: function () {
        var toReturn = "";
        let campoCambiMassimi = Utils.retrieveDomElement("etMassimoScambi");
        let numeroCambi = campoCambiMassimi.value;
        if (numeroCambi > 0) {
            toReturn = Utils.addTextRow("Ogni squadra potrà effettuare un numero massimo di cambio giocatori pari a " + numeroCambi + ".");
        } else {
            toReturn = Utils.addTextRow("Non ci sono limiti relativi al massimo numero di giocatori modificabili in una rosa.");
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntiveMercato: function () {
        var toReturn = "";
        let etNoteMercato = Utils.retrieveDomElement("etNoteMercato");
        if (etNoteMercato != null) {
            var testoNote = etNoteMercato.value;
            if (testoNote.trim() !== "") {
                toReturn = Utils.addTextRow(resolveEscapes(testoNote));
            }
        }
        return toReturn;
    }
};