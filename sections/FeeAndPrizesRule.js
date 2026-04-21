const FeeAndPrizesRule = {

    sectionName: "Quote squadre e premi finali",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiQuotaSquadra());
        rules.push(this.estraiDivisionePremi());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiQuotaSquadra: function () {
        let etQuota = Utils.retrieveDomElement("etQuota");
        let feeValue = etQuota.value;
        FieldValidation.validateInt(this.sectionName, "Quota", feeValue, false);
        return "La quota di partecipazione prevista per ciascuna squadra è di " + feeValue + " euro.";
    },

    estraiDivisionePremi: function () {
        return "I premi totali saranno cosi suddivisi: \n\n" + Utils.retrieveAdditionalNotes("taPremi");
    }
};