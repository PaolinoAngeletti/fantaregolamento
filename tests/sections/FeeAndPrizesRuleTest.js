function runFeePrizesTests() {
    describe("FeeAndPrizesRule", function () {
        it("should produce correct output with quota and prizes", function () {
            realDomDoc.getElementById('taPremi').value = "price-list";

            const result = FeeAndPrizesRule.produce();
            expect(result).toContain("Quote squadre e premi finali");
            expect(result).toContain("La quota di partecipazione prevista per ciascuna squadra è di 100 euro.");
            expect(result).toContain("I premi totali saranno cosi suddivisi:");
            expect(result).toContain("price-list");
        });

        it("should skip prize section if taPremi is null", function () {
            realDomDoc.getElementById('taPremi').value = "";
            
            const result = FeeAndPrizesRule.produce();
            expect(result).not.toContain("I premi totali");
        });
    });

}