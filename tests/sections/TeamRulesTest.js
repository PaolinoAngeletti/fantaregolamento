function runTeamRulesTests() {
    describe("TeamRules", function () {
        beforeEach(function () {
            realDomDoc.getElementById("etPortieri").value = "3";
            realDomDoc.getElementById("etDifensori").value = "8";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etAttaccanti").value = "6";
        });

        it("correctly produces squad structure with shared players enabled", function () {
            realDomDoc.getElementById("cbCondivisiSi").checked = true;

            const html = TeamRules.produce();

            expect(html).toContain("Struttura rose");
            expect(html).toContain("3 portieri");
            expect(html).toContain("8 difensori");
            expect(html).toContain("8 centrocampisti");
            expect(html).toContain("6 attaccanti");
            expect(html).toContain("potranno avere giocatori condivisi");
        });

        it("correctly produces squad structure with shared players disabled", function () {
            realDomDoc.getElementById("cbCondivisiSi").checked = false;

            const html = TeamRules.produce();

            expect(html).toContain("NON potranno avere giocatori condivisi");
        });

        it("goalkeeper number cannot be negative", function () {
            realDomDoc.getElementById("etPortieri").value = "-1";
            try {
                TeamRules.estraiNumeroGiocatoriRosa(12);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("goalkeeper number cannot be zero", function () {
            realDomDoc.getElementById("etPortieri").value = "0";
            try {
                TeamRules.estraiNumeroGiocatoriRosa(4);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });

        it("defensors number cannot be negative", function () {
            realDomDoc.getElementById("etDifensori").value = "-1";
            try {
                TeamRules.estraiNumeroGiocatoriRosa(3);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("defensors number cannot be zero", function () {
            realDomDoc.getElementById("etDifensori").value = "0";
            try {
                TeamRules.estraiNumeroGiocatoriRosa();
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });

        it("midfielders number cannot be negative", function () {
            realDomDoc.getElementById("etCentrocampisti").value = "-1";
            try {
                TeamRules.estraiNumeroGiocatoriRosa();
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("midfielders number cannot be zero", function () {
            realDomDoc.getElementById("etCentrocampisti").value = "0";
            try {
                TeamRules.estraiNumeroGiocatoriRosa(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });

        it("attackers number cannot be negative", function () {
            realDomDoc.getElementById("etAttaccanti").value = "-1";
            try {
                TeamRules.estraiNumeroGiocatoriRosa();
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("attackers number cannot be zero", function () {
            realDomDoc.getElementById("etAttaccanti").value = "0";
            try {
                TeamRules.estraiNumeroGiocatoriRosa(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });
    });
}
