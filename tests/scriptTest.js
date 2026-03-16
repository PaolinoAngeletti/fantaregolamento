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
            realDomDoc.getElementById('etNumSostituzioni').value = "3";

            const html = createHTMLCode();
            expect(html).toContain("<!DOCTYPE html>");
            expect(html).toContain("<html>");
            expect(html).toContain("<head>");
            expect(html).toContain("<title>Regolamento creato</title>");
            expect(html).toContain("<body");
            expect(html).toContain("<h1>Regolamento Fantacalcio</h1>");
            expect(html).toContain("<h2>1. Tipologia competizione</h2>");
            expect(html).toContain("<h2>2. Struttura rose</h2>");
            expect(html).toContain("<h2>3. Gestione mercato</h2>");
            expect(html).toContain("<h2>4. Gestione svincoli</h2>");
            expect(html).toContain("<h2>5. Gestione scambi</h2>");
            expect(html).toContain("<h2>6. Gestione infortuni</h2>");
            expect(html).toContain("<h2>7. Inserimento formazione</h2>");
            expect(html).toContain("<h2>8. Gestione sostituzioni</h2>");
            expect(html).toContain("<h2>9. Calcolo giornate</h2>");
            expect(html).toContain("<h2>10. Classifica</h2>");
            expect(html).toContain("<h2>11. Quote squadre e premi finali</h2>");
            expect(html).toContain("Documento stilato con");
            expect(html).toContain("</html>");
        });
    });

    describe("HTML ↔ JSON fields", function () {

        describe("from-HTML-to-JSON-tests", function () {

            let test_cases = [
                {field: "cbCalendario", value: true},
                {field: "cbCalendario", value: false},
                {field: "cbFormulaUno", value: true},
                {field: "cbFormulaUno", value: false},
                {field: "cbListone", value: true},
                {field: "cbListone", value: false},
                {field: "etInizio", value: "45"},
                {field: "etFine", value: "10"},
                {field: "etPortieri", value: "5"},
                {field: "etDifensori", value: "47"},
                {field: "etCentrocampisti", value: "51"},
                {field: "etAttaccanti", value: "12"},
            ];

            test_cases.forEach(test => {
                it(`${test.field} value = ${test.value}`, () => {

                    // field setup.
                    let element = realDomDoc.getElementById(test.field);
                    if ("radio" === element.type || "checkbox" === element.type) {
                        element.checked = test.value;
                    } else {
                        element.value = test.value;
                    }

                    // test assertion.
                    const json = buildLoadJson(realDomDoc);
                    expect(json[test.field]).toBe(test.value);
                });
            });
        })

        describe("from-JSON-to-HTML-tests", function () {

            let test_cases = [
                {field: "cbCalendario", start_value: false, final_value: true},
                {field: "cbCalendario", start_value: true, final_value: false},
                {field: "cbFormulaUno", start_value: false, final_value: true},
                {field: "cbFormulaUno", start_value: true, final_value: false},
                {field: "cbListone", start_value: false, final_value: true},
                {field: "cbListone", start_value: true, final_value: false},
                {field: "etInizio", start_value: "5", final_value: "20"},
                {field: "etFine", start_value: "10", final_value: "4"},
                {field: "etPortieri", start_value: "5", final_value: "10"},
                {field: "etDifensori", start_value: "47", final_value: "10"},
                {field: "etCentrocampisti", start_value: "51", final_value: "3"},
                {field: "etAttaccanti", start_value: "12", final_value: "102"},
            ];

            test_cases.forEach(test => {
                it(`${test.field} loading = ${test.final_value} from = ${test.start_value}`, () => {
                    let field = test.field;
                    let start_value = test.start_value;
                    let final_value = test.final_value;

                    // field setup.
                    let element = realDomDoc.getElementById(test.field);
                    if ("radio" === element.type || "checkbox" === element.type) {
                        element.checked = start_value;
                        expect(element.checked).toBe(start_value);
                    } else {
                        element.value = start_value;
                        expect(element.value).toBe(start_value);
                    }

                    // invoke configuration import.
                    loadRegulationFromJson({
                        [field]: final_value
                    }, realDomDoc);

                    // test assertions.
                    if ("radio" === element.type || "checkbox" === element.type) {
                        expect(element.checked).toBe(final_value);
                    } else {
                        expect(element.value).toBe(final_value);
                    }
                });
            });

        })

    });
}