function runMainScriptTests() {
    describe("RegulationCreationTest", function () {
        it("generate a valid and complete HTML document", function () {

            //setting correct values from verified fields.
            realDomDoc.getElementById("etInizio").value = "1";
            realDomDoc.getElementById("etFine").value = "30";
            realDomDoc.getElementById("etPortieri").value = "3";
            realDomDoc.getElementById("etDifensori").value = "8";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etAttaccanti").value = "6";
            realDomDoc.getElementById("etCrediti").value = "300";
            realDomDoc.getElementById("etCreditiSessione").value = "0";
            realDomDoc.getElementById("etMaxScambiCompetizione").value = "2";
            realDomDoc.getElementById("etMaxScambiSessione").value = "0";
            realDomDoc.getElementById("etMaxScambiRuolo").value = "0";
            realDomDoc.getElementById("etTolleranza").value = "10";
            realDomDoc.getElementById('etSoglie').value = "5";
            realDomDoc.getElementById("etQuota").value = "50";
            realDomDoc.getElementById("cbPenalitaNo").checked = true;
            realDomDoc.getElementById("cb442").checked = true;
            
            const html = creaCodiceHTML();
            expect(html).toContain("<!DOCTYPE html>");
            expect(html).toContain("<html>");
            expect(html).toContain("<head>");
            expect(html).toContain("<title>Regolamento creato</title>");
            expect(html).toContain("<body");
            expect(html).toContain("<h1>Regolamento Fantacalcio</h1>");
            expect(html).toContain("<h2>1. Tipologia competizione</h2>");
            expect(html).toContain("<h2>2. Struttura rose</h2>");
            expect(html).toContain("<h2>3. Gestione mercato</h2>");
            expect(html).toContain("<h2>4. Gestione infortuni e svincoli</h2>");
            expect(html).toContain("<h2>5. Inserimento formazione</h2>");
            expect(html).toContain("<h2>6. Gestione sostituzioni</h2>");
            expect(html).toContain("<h2>7. Calcolo giornate</h2>");
            expect(html).toContain("<h2>8. Classifica</h2>");
            expect(html).toContain("<h2>9. Quote squadre e premi finali</h2>");
            expect(html).toContain("</html>");
        });
    });
}