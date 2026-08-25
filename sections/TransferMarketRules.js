const TransferMarketRules = {
    sectionName: "Gestione mercato",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiTipologiaMercato());
        rules.push(this.estraiNumeroCrediti());
        rules.push(this.estraiOffertaMinima());
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

    estraiTipologiaMercato: function () {
        const noRuoloRule = "Inoltre, non ci saranno vincoli di ruolo, ossia si potrà acquistare un attaccante prima di un portiere.";
        const ruoloRule = "E' previsto però un vincolo di ruolo, ossia i calciatori dovranno essere acquistati in ordine di ruolo, ossia P-D-C-A.";

        const randomRule = "L'asta verrà eseguita estraendo i calciatori in maniera random, ossia non ci sarà nessun ordine prefissato. ";
        const chiamataRule = "L'asta verrà eseguita estraendo i calciatori a chiamata, ossia ogni squadra, a turno, deciderà su quale giocatore effettuare l'asta. ";

        let valueId = Utils.getSelectedRadioId("fTipoMercato");
        if ("cbAlfabetico" === valueId) {
            return "L'asta verrà eseguita estraendo i calciatori in ordine alfabetico crescente, ossia dalla A alla Z.";
        } else if ("cbChiamata" === valueId) {
            return chiamataRule + noRuoloRule;
        } else if ("cbChiamataRuolo" === valueId) {
            return chiamataRule + ruoloRule;
        } else if ("cbTornata" === valueId) {
            return "L'asta verrà eseguita con la modalità a tornate. In ogni tornata, ogni squadra potrà offrire per qualsiasi giocatore voglia, indipendentemente dal ruolo. Alla fine della tornata, verranno assegnati i calciatori, e si proseguirà con la successiva tornata con i giocatori che risultano ancora svincolati dopo le tornate precedenti. Il numero di tornate dipenderà dal completamento di tutte le squadre.";
        } else if ("cbRandom" === valueId) {
            return randomRule + noRuoloRule;
        } else {
            // default: random ruolo
            return randomRule + ruoloRule;
        }
    },

    estraiNumeroCrediti: function () {
        let etCrediti = Utils.retrieveDomElement("etCrediti");
        let creditsNumber = etCrediti.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti", creditsNumber, false, false);
        return "Per il mercato iniziale sono previsti " + creditsNumber + " fanta-milioni, utili a comporre la rosa iniziale.";
    },

    estraiOffertaMinima: function () {
        let valueId = Utils.getSelectedRadioId("fOffertaMinima");
        if ("cbOffMinValAtt" === valueId) {
            return "Prevista una offerta minima per i calciatori pari alla quotazione attuale di quel momento.";
        } else {
            return "Non è prevista nessuna offerta minima per i calciatori, per cui le aste potranno partire dal valore 1.";
        }
    },

    estraiNumeroCreditiSuccessivi: function () {
        let etCreditiSessione = Utils.retrieveDomElement("etCreditiSessione");
        let numeroCreditiSessione = etCreditiSessione.value;
        FieldValidation.validateInt(this.sectionName, "Numero crediti per sessione", numeroCreditiSessione, false);

        let toReturn;
        if (numeroCreditiSessione > 0) {
            toReturn = "Per le successive sessioni di mercato sono previsti " + numeroCreditiSessione + " fanta-milioni da aggiungere ad ogni squadra, in modo da permettere transazioni per tutti.";
        } else {
            toReturn = "Per le successive sessioni di mercato non sono previste aggiunte di crediti, quindi si opererà sempre con il residuo del mercato precedente o comunque risultante da altre operazioni.";
        }
        return toReturn;
    },

    retrieveFinishedCreditsManagement: function () {
        let toReturn;
        let taFinishedCredits = Utils.retrieveDomElement("taCreditiFiniti");
        let finishedCreditsValue = taFinishedCredits.value;
        if (Utils.isValidString(finishedCreditsValue)) {
            toReturn = "Nel caso in cui una squadra superi il numero di crediti spendibili, verrà applicata la seguente strategia: " + finishedCreditsValue;
        } else {
            toReturn = "Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili per il mercato, per cui questo comportamento verrà deciso il giorno stesso del mercato.";
        }
        return toReturn;
    },

    retrieveResidualCreditsManagements: function () {
        let toReturn;
        let etResidualEnabled = Utils.retrieveDomElement("cbResiduiSi");
        if (etResidualEnabled.checked) {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno utilizzati come base di partenza per la successiva sessione di mercato.";
        } else {
            toReturn = "Alla fine di una sessione di mercato, gli eventuali crediti residui verranno ignorati, per cui non verranno utilizzati per le successive sessioni di mercato.";
        }
        return toReturn;
    },

    estraiAbilitazioneCambioRuolo: function () {
        let toReturn;
        let campoVerifica = Utils.retrieveDomElement("cbCambioRuoloSi");
        if (campoVerifica.checked) {
            toReturn = "Sono permessi i cambi ruolo dei giocatori, ossia tutti i partecipanti possono decidere la modifica del ruolo di uno o più calciatori ignorando quelli messi a disposizione dalla piattaforma usata.";
        } else {
            toReturn = "Non verranno applicati cambi ruolo dei giocatori, ma verranno utilizzati quelli forniti dalla piattaforma su cui verrà applicata la competizione.";
        }
        return toReturn;
    },

    estraiNumeroMassimoCambiCompetizione: function () {
        let toReturn;
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
        let toReturn;
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
        let toReturn;
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
        return Utils.retrieveAdditionalNotes("etNoteMercato");
    }
};