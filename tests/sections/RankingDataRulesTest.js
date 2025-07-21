function runRankingRulesTests() {
    describe("RankingDataRules", function () {
        describe("produce", function () {
            it("should generate correct ranking explanation text", function () {
                const result = RankingDataRules.produce(10);

                expect(result).toContain("<h2>10. Classifica");
                expect(result).toContain("La classifica verrà calcolata in base al seguente criterio:");
                expect(result).toContain("1. Punti in classifica<br>");
                expect(result).toContain("2. Somma punti totale<br>");
                expect(result).toContain("3. Differenza reti<br>");
                expect(result).toContain("4. Gol fatti<br>");
                expect(result).toContain("5. Gol subiti<br>");
                expect(result).toContain("6. Classifica avulsa<br>");
                expect(result).toContain("In caso di parità perfetta, verrano sommati i premi previsti e divisi");
            });
        });
    });

}