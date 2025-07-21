const InsertTeamRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Inserimento formazione");
        toReturn = toReturn + this.estraiMinutiTolleranza();
        toReturn = toReturn + this.estraiModuliConsentiti();
        toReturn = toReturn + this.estraiGestioneFormazioneNonInserita();
        toReturn = toReturn + this.estraiStrutturaPanchina();
        toReturn = toReturn + this.estraiAbilitazioneFormazioniInvisibili();
        return toReturn;
    },

    estraiMinutiTolleranza: function () {
        var toReturn = "";
        let etTolleranza = Utils.retrieveDomElement("etTolleranza");
        let numeroMinuti = etTolleranza.value;
        if (numeroMinuti <= 1) {
            toReturn = Utils.addTextRow("Le formazioni devono essere inserite entro un minuto dall’inizio della giornata reale del campionato italiano.");
        } else {
            toReturn = Utils.addTextRow("Le formazioni devono essere inserite entro " + numeroMinuti + " minuti dall’inizio della giornata reale del campionato italiano.");
        }
        return toReturn;
    },

    estraiModuliConsentiti: function () {
        var toReturn = "";
        toReturn = toReturn + Utils.addTextRow("I moduli consentiti per le formazioni sono:");
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

    estraiGestioneFormazioneNonInserita: function () {
        var toReturn = "";
        let cbVuota = Utils.retrieveDomElement("cbMancataNulla");
        if (cbVuota.checked) {
            toReturn = Utils.addTextRow("Se la formazione, per qualsiasi motivo, non viene inserita, NON viene recuperata quella della giornata precedente, ma verrà usata una formazione nulla con punteggio totale pari a ZERO. Se io mi preoccupo di mettere la squadra, non è bello perdere contro chi si dimentica.");
        } else {
            toReturn = Utils.addTextRow("Se la formazione, per qualsiasi motivo, non viene inserita, verrà recuperata la formazione della giornata precedente.");
        }
        return toReturn;
    },

    estraiStrutturaPanchina: function () {
        var toReturn = "";
        let etStruttura = Utils.retrieveDomElement("etPanchina");
        toReturn = Utils.addTextRow("La panchina dovrà avere la seguente struttura: " + etStruttura.value + ".");
        return toReturn;
    },

    estraiAbilitazioneFormazioniInvisibili: function () {
        var toReturn = "";
        let cbInvisibiliSi = Utils.retrieveDomElement("cbInvisibiliSi");
        if (cbInvisibiliSi.checked) {
            toReturn = Utils.addTextRow("Sono ammesse le formazioni invisibili.");
        } else {
            toReturn = Utils.addTextRow("Non sono ammesse le formazioni invisibili.");
        }
        return toReturn;
    }
};