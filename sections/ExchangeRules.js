const ExchangeRules = {
    sectionName: "Gestione scambi",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.retrieveExchangeEnabling());
        if (this.exchangeAreAllowed()) {
            rules.push(this.estraiAbilitazioneScambioCrediti());
            rules.push(this.estraiSceltaScambioQuotazioneDopoScambio());
            rules.push(this.estraiEventualiNoteAggiuntive());
        }
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    exchangeAreAllowed: function () {
        let cbExchangeYes = Utils.retrieveDomElement("cbScambiSi");
        return cbExchangeYes.checked;
    },

    expectedRecoveryCreditsFromTransfer: function () {
        let cbNoCreditNormalRelease = Utils.retrieveDomElement("cbSvincoloNessun");
        if (cbNoCreditNormalRelease.checked) {
            let cbInteraQuotazioneAltroCampionato = Utils.retrieveDomElement("cbPreMercatoQuotazioneIntera");
            return cbInteraQuotazioneAltroCampionato.checked;
        } else {
            return true;
        }
    },

    retrieveExchangeEnabling: function () {
        var toReturn = "";
        if (this.exchangeAreAllowed()) {
            toReturn = "Sono previsti gli scambi di giocatori tra squadre.";
        } else {
            toReturn = "Non sono previsti gli scambi di giocatori tra squadre.";
        }
        return toReturn;
    },

    estraiAbilitazioneScambioCrediti: function () {
        var toReturn = "";
        let campoVerifica = Utils.retrieveDomElement("cbScambioCreditiSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi gli scambi di crediti tra i partecipanti, esempio si potrà fare Totti per Del Piero + 100 crediti.";
        } else {
            toReturn = "Non sono permessi gli scambi di crediti tra i partecipanti, esempio non si potrà fare Totti per Del Piero + 100 crediti.";
        }
        return toReturn;
    },

    estraiSceltaScambioQuotazioneDopoScambio: function () {
        var toReturn = "";
        if (this.expectedRecoveryCreditsFromTransfer()) {
            let sceltaA = Utils.retrieveDomElement("cbScambioQuotazioneA");
            if (sceltaA.checked) {
                toReturn = "In caso di scambio tra squadre viene scambiato solo il calciatore, non le quotazioni di acquisto. Esempio: supponiamo che uno svincolo faccia recuperare l'intera quotazione di acquisto. La Roma compra Totti a 10, la Juventus compra Del Piero a 20. Se si fa uno scambio Totti con Del Piero, avremo che la Roma ha Del Piero e la Juventus ha Totti. Se entrambi vengono svincolati, allora la Roma recupererà 10 crediti (quotazione di acquisto di Totti, non di Del Piero), la Juventus 20 crediti (quotazione di acquisto di Del Piero, non di Totti). Ovviamente il discorso vale per qualsiasi tipo di svincolo.";
            } else {
                toReturn = "In caso di scambio tra squadre viene scambiato, oltre ai calciatori, anche le relative quotazioni di acquisto. Esempio: supponiamo che uno svincolo faccia recuperare l'intera quotazione di acquisto. La Roma compra Totti a 10, la Juventus compra Del Piero a 20. Se si fa uno scambio Totti con Del Piero, avremo che la Roma ha Del Piero e la Juventus ha Totti. Se entrambi vengono svincolati, allora la Roma recupererà 20 crediti (quotazione di acquisto di Del Piero, non di Totti), la Juventus 10 crediti (quotazione di acquisto di Totti, non di Del Piero). Ovviamente il discorso vale per qualsiasi tipo di svincolo.";
            }
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteScambi");
    }
};