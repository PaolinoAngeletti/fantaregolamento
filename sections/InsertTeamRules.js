const InsertTeamRules = {
    sectionName: "Inserimento formazione",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiMinutiTolleranza(sectionIndex);
        toReturn = toReturn + this.estraiModuliConsentiti(sectionIndex);
        toReturn = toReturn + this.estraiGestioneFormazioneNonInserita(sectionIndex);
        toReturn = toReturn + this.estraiStrutturaPanchina(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneFormazioniInvisibili(sectionIndex);
        toReturn = toReturn + this.estraiEventualiNoteAggiuntive(sectionIndex);
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
        var modulesString = "";
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

        let toReturn = Utils.addTextRow(sectionIndex, 2, "I moduli consentiti per le formazioni sono:");
        return toReturn + "<ul>" + modulesString + "</ul>";
    },

    verificaSingoloModulo: function (toReturn, idModulo, descrizione) {
        let etModulo = Utils.retrieveDomElement(idModulo);
        if (etModulo.checked) {
            toReturn = toReturn + "<li>" + descrizione + "</li>";
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
    },

    estraiEventualiNoteAggiuntive: function (sectionIndex) {
        var toReturn = "";
        let etNote = Utils.retrieveDomElement("etNoteFormazione");
        if (etNote != null) {
            var noteText = etNote.value;
            if (noteText.trim() !== "") {
                toReturn = Utils.addTextRow(sectionIndex, 6, Utils.resolveEscapes(noteText));
            }
        }
        return toReturn;
    }
};