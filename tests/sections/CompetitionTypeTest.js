function runCompetitionTypeTests() {
    describe("CompetitionType", function () {
        describe("produce tests", function () {
            it("produce build correctly the entire string", function () {
                realDomDoc.getElementById("cbListone").checked = true;
                realDomDoc.getElementById("cbCalendario").checked = false;
                realDomDoc.getElementById("cbFormulaUno").checked = false;
                realDomDoc.getElementById("etInizio").value = "2";
                realDomDoc.getElementById("etFine").value = "6";

                const result = CompetitionType.produce(4);

                expect(result[0].text).toContain("4. Tipologia competizione");
                expect(result[0].type).toBe("h2");
                expect(result[1].text).toContain("4.1. La competizione sarà una competizione");
                expect(result[1].type).toBe("paragraph");
                expect(result[2].text).toContain("4.2. L'inizio e la fine della competizione corrisponderanno");
                expect(result[2].text).toContain("giornata 2");
                expect(result[2].text).toContain("giornata 6");
                expect(result[2].type).toBe("paragraph");
            });
        });

        describe("competition type tests", function () {
            it("estraiTipoCompetizione con Calendario checked", function () {
                realDomDoc.getElementById("cbCalendario").checked = true;
                const result = CompetitionType.estraiTipoCompetizione();
                expect(result.text).toContain("classica competizione a calendario");
                expect(result.type).toBe("paragraph");
            });

            it("estraiTipoCompetizione con FormulaUno checked", function () {
                realDomDoc.getElementById("cbFormulaUno").checked = true;
                const result = CompetitionType.estraiTipoCompetizione();
                expect(result.text).toContain("competizione con stile Formula Uno");
                expect(result.type).toBe("paragraph");
            });

            it("estraiTipoCompetizione con Listone checked", function () {
                realDomDoc.getElementById("cbListone").checked = true;
                const result = CompetitionType.estraiTipoCompetizione();
                expect(result.text).toContain("competizione a listone");
                expect(result.type).toBe("paragraph");
            });
        });

        describe("start&end competition tests", function () {
            it("estraiDurataCompetizione returns the correct text", function () {
                realDomDoc.getElementById("etInizio").value = "3";
                realDomDoc.getElementById("etFine").value = "8";
                const result = CompetitionType.estraiDurataCompetizione(23);
                expect(result.text).toBe("23.2. L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata 3 e con la giornata 8 del campionato reale.");
                expect(result.type).toBe("paragraph");
            });

            it("competition start cannot be negative", function () {
                realDomDoc.getElementById("etInizio").value = "-1";
                realDomDoc.getElementById("etFine").value = "37";
                try {
                    CompetitionType.estraiDurataCompetizione(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Inizio competizione");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("competition start cannot be zero", function () {
                realDomDoc.getElementById("etInizio").value = "0";
                realDomDoc.getElementById("etFine").value = "38";
                try {
                    CompetitionType.estraiDurataCompetizione(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Inizio competizione");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it("competition start cannot exceed its max value", function () {
                realDomDoc.getElementById("etInizio").value = "39";
                realDomDoc.getElementById("etFine").value = "38";
                try {
                    CompetitionType.estraiDurataCompetizione(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Inizio competizione");
                    expect(error.message).toContain(FieldValidation.EXCEED_MAX_ERR);
                }
            });

            it("competition end cannot be negative", function () {
                realDomDoc.getElementById("etFine").value = "-2";
                try {
                    CompetitionType.estraiDurataCompetizione(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Fine competizione");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("competition end cannot be zero", function () {
                realDomDoc.getElementById("etFine").value = "0";
                try {
                    CompetitionType.estraiDurataCompetizione(0);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Fine competizione");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it("competition end cannot exceed its max value", function () {
                realDomDoc.getElementById("etFine").value = "42";
                try {
                    CompetitionType.estraiDurataCompetizione(12);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain("Fine competizione");
                    expect(error.message).toContain(FieldValidation.EXCEED_MAX_ERR);
                }
            });

            it("competition start cannot be greater then end", function () {
                realDomDoc.getElementById("etInizio").value = "10";
                realDomDoc.getElementById("etFine").value = "9";
                try {
                    CompetitionType.estraiDurataCompetizione(20);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Tipologia competizione");
                    expect(error.message).toContain(FieldValidation.SHOULD_BE_MINOR);
                }
            });
        });
    });
}