const RankingDataRules = {

    sectionName: "Classifica",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.retrieveRankingRules());
        rules.push(this.retrievePerfectDrawRules());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    retrieveRankingRules: function () {
        let toReturn = "La classifica verrà calcolata in base al seguente criterio: \n\n";
        toReturn = toReturn + "1. Punti in classifica \n";
        toReturn = toReturn + "2. Somma punti totale \n";
        toReturn = toReturn + "3. Differenza reti \n";
        toReturn = toReturn + "4. Gol fatti \n";
        toReturn = toReturn + "5. Gol subiti \n";
        toReturn = toReturn + "6. Classifica avulsa";
        return toReturn;
    },

    retrievePerfectDrawRules: function () {
        return "In caso di parità perfetta, verranno sommati i premi previsti e divisi per le squadre che rilevano la perfetta parità.";
    }
};