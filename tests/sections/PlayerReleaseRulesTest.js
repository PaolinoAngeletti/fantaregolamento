function runReleaseRulesTests() {
    describe("Release rules", function () {
        describe("produce test", function () {
            it("produce test", function () {
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;
                realDomDoc.getElementById("cbSvincoloNessun").checked = true;
                realDomDoc.getElementById("cbPreMercatoPrestito").checked = true;
                realDomDoc.getElementById("etNoteSvincoli").value = "additional-notes!";

                const html = PlayerReleaseRules.produce(10);

                expect(html).toContain("<h2>10. Gestione svincoli");
                expect(html).toContain("<p>10.1. Prevista l'applicazione dello svincolo su acquisto");
                expect(html).toContain("<p>10.2. In caso di svincolo di giocatori acquistati in mercati precedenti");
                expect(html).toContain("<p>10.3. Se, durante la competizione, un calciatore viene ceduto in altri campionati");
                expect(html).toContain("<p>10.4. additional-notes!");
            });
        });

        describe("release modes test", function () {
            it("generates the option correctly svincoloInizioSi", function () {
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = false;
                realDomDoc.getElementById("cbSvincoloInizioSi").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoliMercato();
                expect(html).toContain("potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso");
            });

            it("generates the option correctly svincoloInizioNo", function () {
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = false;
                realDomDoc.getElementById("cbSvincoloInizioSi").checked = false;
                realDomDoc.getElementById("cbSvincoloInizioNo").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoliMercato();
                expect(html).toContain("NON potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso");
            });
        });

        describe("player release tests", function () {
            it("generated correctly release with: Nessun credito", function () {
                realDomDoc.getElementById("cbSvincoloNessun").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("non verrà recuperato alcun credito");
            });

            it("generated correctly release with: un solo credito", function () {
                realDomDoc.getElementById("cbSvincoloUno").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("riceverà un solo credito");
            });

            it("generated correctly release with: metà quotazione", function () {
                realDomDoc.getElementById("cbSvincoloMeta").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla metà della quotazione");
            });

            it("generated correctly release with: quotazione di acquisto", function () {
                realDomDoc.getElementById("cbSvincoloQuotazione").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla quotazione di acquisto");
            });

            it("generated correctly release with: quotazione attuale", function () {
                realDomDoc.getElementById("cbSvincoloAttuale").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla quotazione attuale");
            });

            it("generated correctly release with: media tra attuale e acquisto", function () {
                realDomDoc.getElementById("cbSvincoloMedia").checked = true;

                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("media tra la quotazione attuale");
            });
        });

        describe("open market tests", function () {
            it("manage correctly the checkbox pre-mercato: svincolo", function () {
                realDomDoc.getElementById("cbPreMercatoSvincolo").checked = true;

                const html = PlayerReleaseRules.estraiGestioneCessioniAltroCampionato();
                expect(html).toContain("svincolo generico");
            });

            it("manage correctly the checkbox pre-mercato: prestito", function () {
                realDomDoc.getElementById("cbPreMercatoPrestito").checked = true;

                const html = PlayerReleaseRules.estraiGestioneCessioniAltroCampionato();
                expect(html).toContain("possibilità di acquisire un calciatore svincolato");
            });

            it("manage correctly the checkbox pre-mercato: recupero crediti interi", function () {
                realDomDoc.getElementById("cbPreMercatoQuotazioneIntera").checked = true;

                const html = PlayerReleaseRules.estraiGestioneCessioniAltroCampionato();
                expect(html).toContain("recuperati i crediti spesi");
            });
        });

        describe("additional notes tests", function () {
            it("not add rows for notes empty", function () {
                realDomDoc.getElementById("etNoteSvincoli").value = "";

                const html = PlayerReleaseRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("");
            });

            it("correctly add rows for notes inserted", function () {
                realDomDoc.getElementById("etNoteSvincoli").value = "hello1 hello12-hello4";

                const html = PlayerReleaseRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("hello1 hello12-hello4");
            });
        });
    });
}