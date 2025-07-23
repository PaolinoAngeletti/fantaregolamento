function runCompetitionTypeTests() {
    describe("CompetitionType with real DOM from iframe", function () {
        beforeEach(function () {
            realDomDoc.getElementById("cbListone").checked = false;
            realDomDoc.getElementById("cbCalendario").checked = false;
            realDomDoc.getElementById("cbFormulaUno").checked = false;
            realDomDoc.getElementById("etInizio").value = "1";
            realDomDoc.getElementById("etFine").value = "38";
        });

        it("estraiTipoCompetizione con Calendario checked", function () {
            realDomDoc.getElementById("cbCalendario").checked = true;
            const result = CompetitionType.estraiTipoCompetizione();
            expect(result).toContain("classica competizione a calendario");
        });

        it("estraiTipoCompetizione con FormulaUno checked", function () {
            realDomDoc.getElementById("cbFormulaUno").checked = true;
            const result = CompetitionType.estraiTipoCompetizione();
            expect(result).toContain("competizione con stile Formula Uno");
        });

        it("estraiTipoCompetizione con Listone checked", function () {
            realDomDoc.getElementById("cbListone").checked = true;
            const result = CompetitionType.estraiTipoCompetizione();
            expect(result).toContain("competizione a listone");
        });

        it("estraiDurataCompetizione returns the correct text", function () {
            realDomDoc.getElementById("etInizio").value = "3";
            realDomDoc.getElementById("etFine").value = "8";
            const result = CompetitionType.estraiDurataCompetizione(23);
            expect(result).toBe("<p>23.2. L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata 3 e con la giornata 8 del campionato reale.</p>");
        });

        it("competition start cannot be negative", function () {
            realDomDoc.getElementById("etInizio").value = "-1";
            try {
                CompetitionType.estraiDurataCompetizione(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("competition start cannot be zero", function () {
            realDomDoc.getElementById("etInizio").value = "0";
            try {
                CompetitionType.estraiDurataCompetizione(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });

        it("competition start cannot exceed its max value", function () {
            realDomDoc.getElementById("etInizio").value = "39";
            try {
                CompetitionType.estraiDurataCompetizione(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.EXCEED_MAX_ERR);
            }
        });

        it("competition end cannot be negative", function () {
            realDomDoc.getElementById("etFine").value = "-2";
            try {
                CompetitionType.estraiDurataCompetizione(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
            }
        });

        it("competition end cannot be zero", function () {
            realDomDoc.getElementById("etFine").value = "0";
            try {
                CompetitionType.estraiDurataCompetizione(0);
                fail("Should be thrown an exception");
            } catch (error) {
                expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
            }
        });

        it("competition end cannot exceed its max value", function () {
            realDomDoc.getElementById("etFine").value = "42";
            try {
                CompetitionType.estraiDurataCompetizione(12);
                fail("Should be thrown an exception");
            } catch (error) {
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
                expect(error.message).toContain(FieldValidation.SHOULD_BE_MINOR);
            }
        });

        it("produce build correctly the entire string", function () {
            realDomDoc.getElementById("cbListone").checked = true;
            realDomDoc.getElementById("etInizio").value = "2";
            realDomDoc.getElementById("etFine").value = "6";

            const result = CompetitionType.produce(4);
            expect(result).toContain("<h2>4. Tipologia competizione</h2>");
            expect(result).toContain("competizione a listone");
            expect(result).toContain("giornata 2");
            expect(result).toContain("giornata 6");
        });
    });
}