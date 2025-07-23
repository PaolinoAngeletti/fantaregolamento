const FeeAndPrizesRule = {
    sectionName: "Quote squadre e premi finali",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
        toReturn = toReturn + this.estraiQuotaSquadra(sectionIndex);
        toReturn = toReturn + this.estraiDivisionePremi(sectionIndex);
        return toReturn;
    },

    estraiQuotaSquadra: function (sectionIndex) {
        let etQuota = Utils.retrieveDomElement("etQuota");
        let feeValue = etQuota.value;
        FieldValidation.validateInt(this.sectionName, "Quota", feeValue, false);
        return Utils.addTextRow(sectionIndex, 1, "La quota di partecipazione prevista per ciascuna squadra è di " + feeValue + " euro.");;
    },

    estraiDivisionePremi: function (sectionIndex) {
        var toReturn = "";
        let etPremi = Utils.retrieveDomElement("taPremi");
        if (etPremi != null) {
            let prizesValue = Utils.resolveEscapes(etPremi.value);
            if (Utils.isValidString(prizesValue)) {
                toReturn = Utils.addTextRow(sectionIndex, 2, "I premi totali saranno cosi suddivisi:");
                toReturn = toReturn + prizesValue;
            }
        }
        return toReturn;
    }
};