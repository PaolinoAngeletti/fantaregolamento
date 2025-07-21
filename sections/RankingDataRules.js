const RankingDataRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Classifica");
        toReturn = toReturn + Utils.addTextRow("La classifica verrà calcolata in base al seguente criterio:");
        toReturn = toReturn + "1. Punti in classifica" + "<br>";
        toReturn = toReturn + "2. Somma punti totale" + "<br>";
        toReturn = toReturn + "3. Differenza reti" + "<br>";
        toReturn = toReturn + "4. Gol fatti" + "<br>";
        toReturn = toReturn + "5. Gol subiti" + "<br>";
        toReturn = toReturn + "6. Classifica avulsa" + "<br>";
        toReturn = toReturn + Utils.addTextRow("In caso di parità perfetta, verrano sommati i premi previsti e divisi per le squadre che rilevano la perfetta parità.");
        return toReturn;
    }
};