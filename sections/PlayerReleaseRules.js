const PlayerReleaseRules = {
    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiGestioneSvincoliMercato());
        rules.push(this.estraiAbilitazioneRiacquisto());
        rules.push(this.estraiGestioneSvincoli());
        rules.push(this.estraiGestioneDecimali());
        rules.push(this.estraiGestioneCessioniAltroCampionato());
        rules.push(this.estraiEventualiNoteAggiuntive());
        return Utils.buildRuleSection(sectionIndex, "Gestione svincoli", rules);
    },

    estraiGestioneSvincoliMercato: function () {
        let valueId = Utils.getSelectedRadioId("fSvincolo");
        if ("cbSvincoloInizio" === valueId) {
            return "Ad ogni sessione di mercato, una squadra interessata ad acquistare dovrà comunicare in anticipo i giocatori da svincolare.";
        } else if ("cbSvincoloAcquisto" === valueId) {
            return "Prevista l'applicazione dello svincolo su acquisto, ossia ogni partecipante dovrà comunicare lo svincolo solamente dopo aver eseguito un acquisto. Per la gestione del singolo svincolo invece vi è una regola specifica.";
        } else {
            return "Durante una sessione di mercato sarà possibile svincolare i calciatori acquistati solo a fine mercato, dopo che tutti i partecipanti avranno completato le proprie rose.";
        }
    },

    estraiAbilitazioneRiacquisto: function () {
        let valueId = Utils.getSelectedRadioId("fRiacquisto");
        if ("cbRiacquistoSi" === valueId) {
            return "Durante una sessione di mercato, sarà possibile ri-acquistare giocatori precedentemente svincolati dalla squadra stessa.";
        } else {
            return "Durante una sessione di mercato, NON sarà possibile ri-acquistare giocatori precedentemente svincolati dalla squadra stessa. Ovviamente, in una successiva sessione di mercato, tali giocatori potranno essere ri-acquistati senza vincoli.";
        }
    },

    estraiGestioneSvincoli: function () {
        let toReturn = "In caso di svincolo di giocatori acquistati in mercati precedenti, ";

        let valueId = Utils.getSelectedRadioId("fCreditiSvincolo");
        if ("cbSvincoloUno" === valueId) {
            toReturn = toReturn + "la squadra riceverà un solo credito in ogni caso, solamente per permettere eventuali acquisti a quotazione uno di svincolati.";
        } else if ("cbSvincoloMeta" === valueId) {
            toReturn = toReturn + "la squadra riceverà crediti pari alla metà della quotazione di acquisto.";
        } else if ("cbSvincoloQuotazione" === valueId) {
            toReturn = toReturn + "la squadra riceverà crediti pari alla quotazione di acquisto.";
        } else if ("cbSvincoloMetaAttuale" === valueId) {
            toReturn = toReturn + "la squadra riceverà crediti pari alla metà della quotazione attuale del calciatore.";
        } else if ("cbSvincoloAttuale" === valueId) {
            toReturn = toReturn + "la squadra riceverà crediti pari alla quotazione attuale del calciatore.";
        } else if ("cbSvincoloMedia" === valueId) {
            toReturn = toReturn + "la squadra riceverà un numero di crediti pari alla media tra la quotazione attuale del giocatore e il suo valore di acquisto. Esempio se la quotazione attuale è 50 e la spesa per l'acquisto è stata di 10, allora i crediti ricevuti saranno 30 (50 + 10 / 2)";
        } else {
            toReturn = toReturn + "non verrà recuperato alcun credito.";
        }
        return toReturn;
    },

    estraiGestioneDecimali: function () {
        let toReturn = "";
        if (this.expectedDefectOrExcessRule()) {
            toReturn = "In caso di svincoli che generano valori decimali, verrà applicato un ritorno credito per ";
            let cbEccesso = Utils.retrieveDomElement("cbEccesso");
            if (cbEccesso.checked) {
                toReturn = toReturn + "eccesso, esempio: lo svincolo produce un recupero di 1,5 crediti, realmente ricevo 2 crediti.";
            } else {
                let cbDifetto = Utils.retrieveDomElement("cbDifetto");
                if (cbDifetto.checked) {
                    toReturn = toReturn + "difetto, esempio: lo svincolo produce un recupero di 1,5 crediti, realmente ricevo 1 credito.";
                }
            }
        }
        return toReturn;
    },

    expectedDefectOrExcessRule: function () {
        const halfReturn = Utils.retrieveDomElement("cbSvincoloMeta");
        const averageReturn = Utils.retrieveDomElement("cbSvincoloMedia");
        return halfReturn.checked || averageReturn.checked;
    },

    estraiGestioneCessioniAltroCampionato: function () {
        let toReturn = "Se, durante la competizione, un calciatore viene ceduto in altri campionati (siano essi internazionali e non), allora ";
        let cbPreMercatoSvincolo = Utils.retrieveDomElement("cbPreMercatoSvincolo");
        if (cbPreMercatoSvincolo.checked) {
            toReturn = toReturn + "verranno applicate le regole scelte per uno svincolo generico di calciatori.";
        } else {
            let cbPreMercatoPrestito = Utils.retrieveDomElement("cbPreMercatoPrestito");
            if (cbPreMercatoPrestito.checked) {
                toReturn = toReturn + "verrà prevista la possibilità di acquisire un calciatore svincolato fino alla prossima sessione di mercato.";
            } else {
                let cbPreMercatoQuotazioneIntera = Utils.retrieveDomElement("cbPreMercatoQuotazioneIntera");
                if (cbPreMercatoQuotazioneIntera.checked) {
                    toReturn = toReturn + "verranno recuperati i crediti spesi per il suo acquisto.";
                }
            }
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteSvincoli");
    }
};