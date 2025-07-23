const InsertTeamRules = {
    sectionName: "Inserimento formazione",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiMinutiTolleranza(sectionIndex);
        toReturn = toReturn + this.estraiModuliConsentiti(sectionIndex);
        toReturn = toReturn + this.estraiGestioneFormazioneNonInserita(sectionIndex);
        toReturn = toReturn + this.estraiStrutturaPanchina(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneFormazioniInvisibili(sectionIndex);
        return toReturn;
    },

    estraiMinutiTolleranza: function (sectionIndex) {
        var toReturn = "";
        let etTolleranza = Utils.retrieveDomElement("etTolleranza");
        let numeroMinuti = etTolleranza.value;
        FieldValidation.validateInt(this.sectionName, "Tolleranza ritardo", numeroMinuti, false, false);

        if (numeroMinuti <= 1) {
            toReturn = "Le formazioni devono essere inserite entro un minuto dall’inizio della giornata reale del campionato italiano.";
        } else {
            toReturn = "Le formazioni devono essere inserite entro " + numeroMinuti + " minuti dall’inizio della giornata reale del campionato italiano.";
        }
        return Utils.addTextRow(sectionIndex, 1, toReturn);
    },

    estraiModuliConsentiti: function (sectionIndex) {
        var toReturn = Utils.addTextRow(sectionIndex, 2, "I moduli consentiti per le formazioni sono:");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxOne", "4-4-2");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxTwo", "4-3-3");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxThree", "4-5-1");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxFour", "3-4-3");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxFive", "3-5-2");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxSix", "5-3-2");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxSeven", "5-4-1");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxEight", "6-3-1");
        toReturn = this.verificaSingoloModulo(toReturn, "checkboxNine", "6-2-2");
        return toReturn;
    },

    verificaSingoloModulo: function (toReturn, idModulo, descrizione) {
        let etModulo = Utils.retrieveDomElement(idModulo);
        if (etModulo.checked) {
            toReturn = toReturn + descrizione + "<br>";
        }
        return toReturn;
    },

    estraiGestioneFormazioneNonInserita: function (sectionIndex) {
        var toReturn = "";
        let cbVuota = Utils.retrieveDomElement("cbMancataNulla");
        if (cbVuota.checked) {
            toReturn = "Se la formazione, per qualsiasi motivo, non viene inserita, NON viene recuperata quella della giornata precedente, ma verrà usata una formazione nulla con punteggio totale pari a ZERO. Se io mi preoccupo di mettere la squadra, non è bello perdere contro chi si dimentica.";
        } else {
            toReturn = "Se la formazione, per qualsiasi motivo, non viene inserita, verrà recuperata la formazione della giornata precedente.";
        }
        return Utils.addTextRow(sectionIndex, 3, toReturn);
    },

    estraiStrutturaPanchina: function (sectionIndex) {
        let etStruttura = Utils.retrieveDomElement("etPanchina");
        return Utils.addTextRow(sectionIndex, 4, "La panchina dovrà avere la seguente struttura: " + etStruttura.value + ".");;
    },

    estraiAbilitazioneFormazioniInvisibili: function (sectionIndex) {
        var toReturn = "";
        let cbInvisibiliSi = Utils.retrieveDomElement("cbInvisibiliSi");
        if (cbInvisibiliSi.checked) {
            toReturn = "Sono ammesse le formazioni invisibili.";
        } else {
            toReturn = "Non sono ammesse le formazioni invisibili.";
        }
        return Utils.addTextRow(sectionIndex, 5, toReturn);
    }
};