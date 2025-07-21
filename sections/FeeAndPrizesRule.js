const FeeAndPrizesRule = {
    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, "Quote squadre e premi finali");
        toReturn = toReturn + this.estraiQuotaSquadra(sectionIndex);
        toReturn = toReturn + this.estraiDivisionePremi(sectionIndex);
        return toReturn;
    },

    estraiQuotaSquadra: function (sectionIndex) {
        let etQuota = Utils.retrieveDomElement("etQuota");
        return Utils.addTextRow(sectionIndex, 1, "La quota di partecipazione prevista per ciascuna squadra è di " + etQuota.value + " euro.");;
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