const InsertTeamRules = {

    sectionName: "Inserimento formazione",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiStrutturaPanchina());
        rules.push(this.estraiMinutiTolleranza());
        rules.push(this.estraiModuliConsentiti());
        rules.push(this.estraiGestioneFormazioneNonInserita());
        rules.push(this.estraiGestionePenalita());
        rules.push(this.estraiAbilitazioneFormazioniInvisibili());
        rules.push(this.estraiEventualiNoteAggiuntive());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiStrutturaPanchina: function () {
        let etStruttura = Utils.retrieveDomElement("etPanchina");
        return "La panchina dovrà avere la seguente struttura: " + etStruttura.value + ".";
    },

    estraiMinutiTolleranza: function () {
        let toReturn;
        let etTolleranza = Utils.retrieveDomElement("etTolleranza");
        let numeroMinuti = etTolleranza.value;
        FieldValidation.validateInt(this.sectionName, "Tolleranza ritardo", numeroMinuti, false, false);

        if (numeroMinuti <= 1) {
            toReturn = "Le formazioni devono essere inserite entro un minuto dall’inizio della giornata reale del campionato italiano.";
        } else {
            toReturn = "Le formazioni devono essere inserite entro " + numeroMinuti + " minuti dall’inizio della giornata reale del campionato italiano.";
        }
        return toReturn;
    },

    estraiModuliConsentiti: function () {
        let modulesString = "";
        modulesString = this.verificaSingoloModulo(modulesString, "cb442", "4-4-2");
        modulesString = this.verificaSingoloModulo(modulesString, "cb433", "4-3-3");
        modulesString = this.verificaSingoloModulo(modulesString, "cb451", "4-5-1");
        modulesString = this.verificaSingoloModulo(modulesString, "cb343", "3-4-3");
        modulesString = this.verificaSingoloModulo(modulesString, "cb352", "3-5-2");
        modulesString = this.verificaSingoloModulo(modulesString, "cb532", "5-3-2");
        modulesString = this.verificaSingoloModulo(modulesString, "cb541", "5-4-1");
        modulesString = this.verificaSingoloModulo(modulesString, "cb631", "6-3-1");
        modulesString = this.verificaSingoloModulo(modulesString, "cb622", "6-2-2");
        FieldValidation.isValidString(this.sectionName, "Moduli supportati", modulesString);
        return "I moduli consentiti per le formazioni sono: " + modulesString + ".";
    },

    verificaSingoloModulo: function (toReturn, idModulo, descrizione) {
        let etModulo = Utils.retrieveDomElement(idModulo);
        if (etModulo.checked) {
            if(toReturn.trim() === ""){
                toReturn = descrizione;
            } else {
                toReturn = toReturn + ", " + descrizione;
            }
        }
        return toReturn;
    },

    estraiGestioneFormazioneNonInserita: function () {
        let toReturn;
        let cbVuota = Utils.retrieveDomElement("cbMancataNulla");
        if (cbVuota.checked) {
            toReturn = "Se la formazione, per qualsiasi motivo, non viene inserita, NON viene recuperata quella della giornata precedente, ma verrà usata una formazione nulla con punteggio totale pari a ZERO. Se io mi preoccupo di mettere la squadra, non è bello perdere contro chi si dimentica.";
        } else {
            toReturn = "Se la formazione, per qualsiasi motivo, non viene inserita, verrà recuperata la formazione della giornata precedente.";
        }
        return toReturn;
    },

    estraiGestionePenalita: function () {
        let toReturn = "";
        let cbPenaltiesNo = Utils.retrieveDomElement("cbPenalitaNo");
        if (cbPenaltiesNo.checked) {
            toReturn = "Non è prevista nessuna penalità per il mancato inserimento della formazione.";
        } else {
            let cbPenaltiesYes = Utils.retrieveDomElement("cbPenalitaYes");
            if (cbPenaltiesYes.checked) {
                let penaltyArea = Utils.retrieveDomElement("taPenality");
                let penaltyValue = penaltyArea.value;
                FieldValidation.isValidString(this.sectionName, "Penalità", penaltyValue);
                toReturn = "Quando un giocatore non inserisce la formazione per una giornata, verrà applicata la seguente penalità: " + penaltyValue;
            }
        }
        return toReturn;
    },

    estraiAbilitazioneFormazioniInvisibili: function () {
        let toReturn;
        let cbInvisibiliSi = Utils.retrieveDomElement("cbInvisibiliSi");
        if (cbInvisibiliSi.checked) {
            toReturn = "Sono ammesse le formazioni invisibili.";
        } else {
            toReturn = "Non sono ammesse le formazioni invisibili.";
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteFormazione");
    }
};