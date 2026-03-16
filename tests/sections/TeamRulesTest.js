function runTeamRulesTests() {
    describe("TeamRules", function () {
        describe("produce", function () {
            it("produce correctly the entire string", function () {
                realDomDoc.getElementById("cbListone").checked = true;
                realDomDoc.getElementById("etPortieri").value = "33";
                realDomDoc.getElementById("etDifensori").value = "8";
                realDomDoc.getElementById("etCentrocampisti").value = "18";
                realDomDoc.getElementById("etAttaccanti").value = "16";
                realDomDoc.getElementById("cbCondivisiSi").checked = true;

                const result = TeamRules.produce(6);
                expect(result[0].text).toContain("6. Struttura rose");
                expect(result[0].type).toBe("h2");
                expect(result[1].text).toContain("6.1. Le rose dovranno essere cosi composte");
                expect(result[1].text).toContain("33 portieri");
                expect(result[1].text).toContain("8 difensori");
                expect(result[1].text).toContain("18 centrocampisti");
                expect(result[1].text).toContain("16 attaccanti");
                expect(result[1].type).toBe("paragraph");
                expect(result[2].text).toContain("6.2. Le rose potranno avere giocatori condivisi");
                expect(result[2].type).toBe("paragraph");
            });
        });

        describe("team composition test", function () {
            beforeEach(function () {
                realDomDoc.getElementById("etPortieri").value = "3";
                realDomDoc.getElementById("etDifensori").value = "8";
                realDomDoc.getElementById("etCentrocampisti").value = "8";
                realDomDoc.getElementById("etAttaccanti").value = "6";
            });

            it("goalkeeper number cannot be negative", function () {
                realDomDoc.getElementById("etPortieri").value = "-1";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa(12);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Portieri");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("goalkeeper number cannot be zero", function () {
                realDomDoc.getElementById("etPortieri").value = "0";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa(4);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Portieri");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it("defensors number cannot be negative", function () {
                realDomDoc.getElementById("etDifensori").value = "-1";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa(3);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Difensori");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("defensors number cannot be zero", function () {
                realDomDoc.getElementById("etDifensori").value = "0";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Difensori");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it("midfielders number cannot be negative", function () {
                realDomDoc.getElementById("etCentrocampisti").value = "-1";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Centrocampisti");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("midfielders number cannot be zero", function () {
                realDomDoc.getElementById("etCentrocampisti").value = "0";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Centrocampisti");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it("attackers number cannot be negative", function () {
                realDomDoc.getElementById("etAttaccanti").value = "-1";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Attaccanti");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("attackers number cannot be zero", function () {
                realDomDoc.getElementById("etAttaccanti").value = "0";
                try {
                    TeamRules.estraiNumeroGiocatoriRosa(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Struttura rose");
                    expect(error.message).toContain("Attaccanti");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });
        });

        describe("shared players test", function () {
            it("correctly produces squad structure with shared players enabled", function () {
                realDomDoc.getElementById("cbCondivisiSi").checked = true;
                const html = TeamRules.estraiAbilitazioneGiocatoriCondivisi();
                expect(html.text).toContain("potranno avere giocatori condivisi");
                expect(html.type).toBe("paragraph");
            });

            it("correctly produces squad structure with shared players disabled", function () {
                realDomDoc.getElementById("cbCondivisiSi").checked = false;
                const html = TeamRules.estraiAbilitazioneGiocatoriCondivisi();
                expect(html.text).toContain("NON potranno avere giocatori condivisi");
                expect(html.type).toBe("paragraph");
            });
        });
    });
}
