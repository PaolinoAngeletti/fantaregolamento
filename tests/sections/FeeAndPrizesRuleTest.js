function runFeePrizesTests() {
    describe("produce test", function () {
        it("should produce correct output with quota and prizes", function () {
            realDomDoc.getElementById("etQuota").value = "100";
            realDomDoc.getElementById('taPremi').value = "price-list";

            const result = FeeAndPrizesRule.produce();
            expect(result).toContain("Quote squadre e premi finali");
            expect(result).toContain("La quota di partecipazione prevista per ciascuna squadra è di 100 euro.");
            expect(result).toContain("I premi totali saranno cosi suddivisi:");
            expect(result).toContain("price-list");
        });
    });

    describe("fee value unit test", function () {
        it('fee value cannot be negative', () => {
            realDomDoc.getElementById("etQuota").value = "-1";
            try {
                FeeAndPrizesRule.estraiQuotaSquadra();
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain("Quote squadre e premi finali");
                expect(error.message).toContain("Quota");
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it('fee value can be zero', () => {
            realDomDoc.getElementById("etQuota").value = "0";
            const result = FeeAndPrizesRule.produce();
            expect(result).toContain("Quote squadre e premi finali");
            expect(result).toContain("La quota di partecipazione prevista per ciascuna squadra è di 0 euro.");
        });
    });

    describe("prizes textarea test", function () {
        it("should skip prize section if taPremi is null", function () {
            realDomDoc.getElementById("etQuota").value = "50";
            realDomDoc.getElementById('taPremi').value = "";

            const result = FeeAndPrizesRule.produce();
            expect(result).not.toContain("I premi totali");
        });
    });
}