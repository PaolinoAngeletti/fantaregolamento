function runAccidentRulesTests() {
    describe("Accident rules", function () {
        describe("produce test", function () {
            it("produce test", function () {
                realDomDoc.getElementById("cbInfortunioPrestito").checked = true;
                realDomDoc.getElementById("cbCovidPanchina").checked = true;
                realDomDoc.getElementById("etNoteInfortuni").value = "additional-notes";

                const html = AccidentRules.produce(12);

                expect(html).toContain("<h2>12. Gestione infortuni");
                expect(html).toContain("<p>12.1. Se un calciatore subisce un infortunio con durata maggiore ai sei mesi");
                expect(html).toContain("<p>12.2. In caso di calciatore schierato in formazione risultante positivo al COVID-19");
                expect(html).toContain("<p>12.3. additional-notes");
            });
        });

        describe("accident mode tests", function () {
            it("manage correctly accident: nessun prestito", function () {
                realDomDoc.getElementById("cbInfortunioNessun").checked = true;

                const html = AccidentRules.estraiGestioneInfortuni();
                expect(html).toContain("NON ci saranno prestiti");
            });

            it("manage correctly accident: prestito per >6 mesi", function () {
                realDomDoc.getElementById("cbInfortunioPrestito").checked = true;

                const html = AccidentRules.estraiGestioneInfortuni();
                expect(html).toContain("prestito di un giocatore svincolato");
            });
        });

        describe("covid-19 tests", function () {
            it("manage correctly covid rules: votazione politica", function () {
                realDomDoc.getElementById("cbCovidPolitico").checked = true;

                const html = AccidentRules.estraiGestoneCovid();
                expect(html).toContain("votazione politica");
            });

            it("manage correctly covid rules: sostituzione classica", function () {
                realDomDoc.getElementById("cbCovidPanchina").checked = true;

                const html = AccidentRules.estraiGestoneCovid();
                expect(html).toContain("sostituito dal panchinaro");
            });

            it("manage correctly covid rules: voti a scaglioni", function () {
                realDomDoc.getElementById("cbCovidScaglioni").checked = true;

                const html = AccidentRules.estraiGestoneCovid();
                expect(html).toContain("voti d’ufficio");
                expect(html).toContain("PORTIERI");
                expect(html).toContain("GIOCATORI DI MOVIMENTO");
            });
        });

        describe("additional notes tests", function () {
            it("not add rows for notes empty", function () {
                realDomDoc.getElementById("etNoteInfortuni").value = "";
                const html = AccidentRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("");
            });

            it("correctly add rows for notes inserted", function () {
                realDomDoc.getElementById("etNoteInfortuni").value = "hello1 hello2-hello3";
                const html = AccidentRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("hello1 hello2-hello3");
            });
        });
    });
}
