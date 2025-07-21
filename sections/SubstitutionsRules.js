const SubstitutionRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Gestione sostituzioni");
        toReturn = toReturn + this.estraiNumeroCambi();
        toReturn = toReturn + this.estraiGestioneAmmonizioneSenzaVoto();
        return toReturn;
    },

    estraiNumeroCambi: function () {
        var toReturn = "";
        let cbNessunLimite = Utils.retrieveDomElement("cbNessunLimite");
        if (cbNessunLimite.checked) {
            toReturn = Utils.addTextRow("Non vi è nessun limite sul numero di sostituzioni, per cui tutta la panchina può entrare.");
        } else {
            let cbTreCambi = Utils.retrieveDomElement("cbTreCambi");
            if (cbTreCambi.checked) {
                toReturn = Utils.addTextRow("Sono previste 3 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
            } else {
                let cbCinqueCambi = Utils.retrieveDomElement("cbCinqueCambi");
                if (cbCinqueCambi.checked) {
                    toReturn = Utils.addTextRow("Sono previste 5 sostituzioni massime, dopodichè si otterrà per le eccedenze un punteggio nullo. L'ordine di entrata sarà dal portiere agli attaccanti.");
                }
            }
        }
        return toReturn;
    },

    estraiGestioneAmmonizioneSenzaVoto: function () {
        var toReturn = "";
        let cbAmmIgnorata = Utils.retrieveDomElement("cbAmmIgnorata");
        if (cbAmmIgnorata.checked) {
            toReturn = Utils.addTextRow("Nel caso in cui un giocatore SV (senza voto) venga ammonito, quella ammonizione non avrà alcun impatto né sul giocatore stesso né sul giocatore subentrato; quindi, il subentrato accederà al suo voto in maniera regolare.");
        } else {
            let cbAmmScalata = Utils.retrieveDomElement("cbAmmScalata");
            if (cbAmmScalata.checked) {
                toReturn = Utils.addTextRow("Nel caso in cui un giocatore SV (senza voto) venga ammonito il malus della ammonizione ricevuta verrà riflesso sul giocatore subentrato, che dunque entrerà con la sua votazione minorata.");
            }
        }
        return toReturn;
    }
};