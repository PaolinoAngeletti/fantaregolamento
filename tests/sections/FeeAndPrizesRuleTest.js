function runFeePrizesTests() {
    describe("Fee&Prizes section", function () {
        describe("produce test", function () {
            it("should produce correct output with quota and prizes", function () {
                realDomDoc.getElementById("etQuota").value = "100";
                realDomDoc.getElementById('taPremi').value = "price-list";

                const result = FeeAndPrizesRule.produce(7);
                expect(result[0].text).toContain("7. Quote squadre e premi finali");
                expect(result[0].type).toBe("h2");
                expect(result[1].text).toContain("7.1. La quota di partecipazione prevista per ciascuna squadra è di 100 euro.");
                expect(result[1].type).toBe("paragraph");
                expect(result[2].text).toContain("7.2. I premi totali saranno cosi suddivisi:");
                expect(result[2].text).toContain("price-list");
                expect(result[2].type).toBe("paragraph");
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
                expect(result[0].text).toContain("Quote squadre e premi finali");
                expect(result[1].text).toContain("La quota di partecipazione prevista per ciascuna squadra è di 0 euro.");
            });
        });

        describe("prizes textarea test", function () {
            it("should skip prize section if taPremi is null", function () {
                realDomDoc.getElementById("etQuota").value = "50";
                realDomDoc.getElementById('taPremi').value = "";
                const result = FeeAndPrizesRule.produce();
                expect(result[0].text).not.toContain("I premi totali");
            });
        });
    });
}