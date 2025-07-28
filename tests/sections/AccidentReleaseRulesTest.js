function runAccidentReleaseRulesTests() {
    describe("Accident&Release rules", function () {
        describe("produce test", function () {
            it("produce test", function () {
                realDomDoc.getElementById("cbSvincoloNessun").checked = true;
                realDomDoc.getElementById("cbPreMercatoPrestito").checked = true;
                realDomDoc.getElementById("cbInfortunioPrestito").checked = true;
                realDomDoc.getElementById("cbCovidPanchina").checked = true;
                realDomDoc.getElementById("etNoteInfortuni").value = "additional-notes";

                const html = AccidentReleaseRules.produce(12);

                expect(html).toContain("<h2>12. Gestione infortuni e svincoli");
                expect(html).toContain("<p>12.1. In caso di svincolo di giocatori acquistati in mercati precedenti");
                expect(html).toContain("<p>12.2. In base all'inizio della competizione deciso, alcune");
                expect(html).toContain("<p>12.3. Se un calciatore subisce un infortunio con durata maggiore ai sei mesi");
                expect(html).toContain("<p>12.4. In caso di calciatore schierato in formazione risultante positivo al COVID-19");
                expect(html).toContain("<p>12.5. additional-notes");
            });
        });

        describe("player release tests", function () {
            it("generated correctly release with: Nessun credito", function () {
                realDomDoc.getElementById("cbSvincoloNessun").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("non verrà recuperato alcun credito");
            });

            it("generated correctly release with: un solo credito", function () {
                realDomDoc.getElementById("cbSvincoloUno").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("riceverà un solo credito");
            });

            it("generated correctly release with: metà quotazione", function () {
                realDomDoc.getElementById("cbSvincoloMeta").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla metà della quotazione");
            });

            it("generated correctly release with: quotazione di acquisto", function () {
                realDomDoc.getElementById("cbSvincoloQuotazione").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla quotazione di acquisto");
            });

            it("generated correctly release with: quotazione attuale", function () {
                realDomDoc.getElementById("cbSvincoloAttuale").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla quotazione attuale");
            });

            it("generated correctly release with: media tra attuale e acquisto", function () {
                realDomDoc.getElementById("cbSvincoloMedia").checked = true;

                const html = AccidentReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("media tra la quotazione attuale");
            });
        });

        describe("open market tests", function () {
            it("manage correctly the checkbox pre-mercato: svincolo", function () {
                realDomDoc.getElementById("cbPreMercatoSvincolo").checked = true;

                const html = AccidentReleaseRules.estraiGestioneInizioPreFineMercato();
                expect(html).toContain("svincolo generico");
            });

            it("manage correctly the checkbox pre-mercato: prestito", function () {
                realDomDoc.getElementById("cbPreMercatoPrestito").checked = true;

                const html = AccidentReleaseRules.estraiGestioneInizioPreFineMercato();
                expect(html).toContain("possibilità di acquisire un calciatore svincolato");
            });

            it("manage correctly the checkbox pre-mercato: recupero crediti interi", function () {
                realDomDoc.getElementById("cbPreMercatoQuotazioneIntera").checked = true;

                const html = AccidentReleaseRules.estraiGestioneInizioPreFineMercato();
                expect(html).toContain("recuperati i crediti spesi");
            });
        });

        describe("accident mode tests", function () {
            it("manage correctly accident: nessun prestito", function () {
                realDomDoc.getElementById("cbInfortunioNessun").checked = true;

                const html = AccidentReleaseRules.estraiGestioneInfortuni();
                expect(html).toContain("NON ci saranno prestiti");
            });

            it("manage correctly accident: prestito per >6 mesi", function () {
                realDomDoc.getElementById("cbInfortunioPrestito").checked = true;

                const html = AccidentReleaseRules.estraiGestioneInfortuni();
                expect(html).toContain("prestito di un giocatore svincolato");
            });
        });

        describe("covid-19 tests", function () {
            it("manage correctly covid rules: votazione politica", function () {
                realDomDoc.getElementById("cbCovidPolitico").checked = true;

                const html = AccidentReleaseRules.estraiGestoneCovid();
                expect(html).toContain("votazione politica");
            });

            it("manage correctly covid rules: sostituzione classica", function () {
                realDomDoc.getElementById("cbCovidPanchina").checked = true;

                const html = AccidentReleaseRules.estraiGestoneCovid();
                expect(html).toContain("sostituito dal panchinaro");
            });

            it("manage correctly covid rules: voti a scaglioni", function () {
                realDomDoc.getElementById("cbCovidScaglioni").checked = true;

                const html = AccidentReleaseRules.estraiGestoneCovid();
                expect(html).toContain("voti d’ufficio");
                expect(html).toContain("PORTIERI");
                expect(html).toContain("GIOCATORI DI MOVIMENTO");
            });
        });

        describe("additional notes tests", function () {
            it("not add rows for notes empty", function () {
                realDomDoc.getElementById("etNoteInfortuni").value = "";

                const html = AccidentReleaseRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("");
            });

            it("correctly add rows for notes inserted", function () {
                realDomDoc.getElementById("etNoteInfortuni").value = "hello1 hello2-hello3";

                const html = AccidentReleaseRules.estraiEventualiNoteAggiuntive(10);
                expect(html).toBe("<p>10.5. hello1 hello2-hello3</p>");
            });
        });
    });
}
