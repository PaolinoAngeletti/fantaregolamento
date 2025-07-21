const FeeAndPrizesRule = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Quote squadre e premi finali");
        toReturn = toReturn + this.estraiQuotaSquadra();
        toReturn = toReturn + this.estraiDivisionePremi();
        return toReturn;
    },

    estraiQuotaSquadra: function () {
        var toReturn = "";
        let etQuota = Utils.retrieveDomElement("etQuota");
        toReturn = Utils.addTextRow("La quota di partecipazione prevista per ciascuna squadra è di " + etQuota.value + " euro.");
        return toReturn;
    },

    estraiDivisionePremi: function () {
        var toReturn = "";
        let etPremi = Utils.retrieveDomElement("taPremi");
        if (etPremi != null) {
            let prizesValue = Utils.resolveEscapes(etPremi.value);
            if (Utils.isValidString(prizesValue)) {
                toReturn = Utils.addTextRow("I premi totali inoltre saranno cosi suddivisi:");
                toReturn = toReturn + prizesValue;
            }
        }
        return toReturn;
    }
};