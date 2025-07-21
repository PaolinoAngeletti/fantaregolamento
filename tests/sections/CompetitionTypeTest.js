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

        it("estraiDurataCompetizione restituisce testo corretto", function () {
            realDomDoc.getElementById("etInizio").value = "3";
            realDomDoc.getElementById("etFine").value = "8";
            const result = CompetitionType.estraiDurataCompetizione(23);
            expect(result).toBe("<p>23.2. L'inizio e la fine della competizione corrisponderanno rispettivamente con la giornata 3 e con la giornata 8 del campionato reale.</p>");
        });

        it("produce costruisce stringa completa", function () {
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