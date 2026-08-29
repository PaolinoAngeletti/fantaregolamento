const FeeAndPrizesRule = {

    sectionName: "Quote squadre e premi finali",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiQuotaSquadra());
        rules.push(this.estraiDivisionePremi());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiQuotaSquadra: function () {
        let valueId = Utils.getSelectedRadioId("fPrizeType");
        if ("cbQuotaVariabile" === valueId) {
            return this.estraiQuotaSquadraVariabile();
        } else {
            return this.estraiQuotaSquadraFissa();
        }
    },

    estraiQuotaSquadraFissa: function () {
        let etQuota = Utils.retrieveDomElement("etQuota");
        let feeValue = etQuota.value;
        FieldValidation.validateInt(this.sectionName, "Quota", feeValue, false);
        return "La quota di partecipazione prevista per ciascuna squadra è di " + feeValue + " euro.";
    },

    estraiQuotaSquadraVariabile: function () {
        let result = Utils.retrieveAdditionalNotes("taQuotaVariabile");
        FieldValidation.isValidString(this.sectionName, "Quota variabile", result);
        return result;
    },

    estraiDivisionePremi: function () {
        return "I premi totali saranno cosi suddivisi: \n\n" + Utils.retrieveAdditionalNotes("taPremi");
    }
};