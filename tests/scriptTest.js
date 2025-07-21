function runMainScriptTests() {
    describe("RegulationCreationTest", function () {
        it("generate a valid and complete HTML document", function () {
            const html = creaCodiceHTML();
            expect(html).toContain("<!DOCTYPE html>");
            expect(html).toContain("<html>");
            expect(html).toContain("<head>");
            expect(html).toContain("<title>Regolamento creato</title>");
            expect(html).toContain("<body");
            expect(html).toContain("<h1>Regolamento Fantacalcio</h1>");
            expect(html).toContain("<h2>Tipologia competizione</h2>");
            expect(html).toContain("<h2>Struttura rose</h2>");
            expect(html).toContain("<h2>Gestione mercato</h2>");
            expect(html).toContain("<h2>Gestione infortuni e svincoli</h2>");
            expect(html).toContain("<h2>Inserimento formazione</h2>");
            expect(html).toContain("<h2>Gestione sostituzioni</h2>");
            expect(html).toContain("<h2>Calcolo giornate</h2>");
            expect(html).toContain("<h2>Classifica</h2>");
            expect(html).toContain("<h2>Quote squadre e premi finali</h2>");
            expect(html).toContain("</html>");
        });
    });
}