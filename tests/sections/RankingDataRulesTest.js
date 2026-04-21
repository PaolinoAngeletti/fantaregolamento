function runRankingRulesTests() {
    describe("RankingDataRules", function () {

        describe("produce", function () {
            it("should generate correct ranking explanation text", function () {
                const result = RankingDataRules.produce(10);
                expect(result[0].text).toContain("10. Classifica");
                expect(result[0].type).toBe("h2");
                expect(result[1].text).toContain("10.1. La classifica verrà calcolata in base al seguente criterio:");
                expect(result[1].text).toContain("1. Punti in classifica");
                expect(result[1].text).toContain("2. Somma punti totale");
                expect(result[1].text).toContain("3. Differenza reti");
                expect(result[1].text).toContain("4. Gol fatti");
                expect(result[1].text).toContain("5. Gol subiti");
                expect(result[1].text).toContain("6. Classifica avulsa");
                expect(result[1].type).toBe("paragraph");
                expect(result[2].text).toContain("10.2. In caso di parità perfetta, verranno sommati i premi previsti e divisi");
                expect(result[2].type).toBe("paragraph");
            });
        });
    });
}