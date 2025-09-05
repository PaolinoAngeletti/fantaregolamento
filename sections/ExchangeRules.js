const ExchangeRules = {
    sectionName: "Gestione scambi",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.retrieveExchangeEnabling());
        if (this.exchangeAreAllowed()) {
            rules.push(this.estraiAbilitazioneScambioCrediti());
            rules.push(this.estraiEventualiNoteAggiuntive());
        }
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    exchangeAreAllowed: function () {
        let cbExchangeYes = Utils.retrieveDomElement("cbScambiSi");
        return cbExchangeYes.checked;
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

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteScambi");
    }
};