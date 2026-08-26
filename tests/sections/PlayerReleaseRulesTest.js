function runReleaseRulesTests() {
    describe("Release rules", function () {

        describe("produce test", function () {
            it("produce test", function () {
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;
                realDomDoc.getElementById("cbRiacquistoNo").checked = true;
                realDomDoc.getElementById("cbSvincoloMeta").checked = true;
                realDomDoc.getElementById("cbPreMercatoPrestito").checked = true;
                realDomDoc.getElementById("etNoteSvincoli").value = "additional-notes!";

                const html = PlayerReleaseRules.produce(10);

                expect(html[0].text).toContain("10. Gestione svincoli");
                expect(html[0].type).toBe("h2");
                expect(html[1].text).toContain("10.1. Prevista l'applicazione dello svincolo su acquisto");
                expect(html[1].type).toBe("paragraph");
                expect(html[2].text).toContain("10.2. Durante una sessione di mercato, NON sarà possibile ri-acquistare");
                expect(html[2].type).toBe("paragraph");
                expect(html[3].text).toContain("10.3. In caso di svincolo di giocatori acquistati in mercati precedenti");
                expect(html[3].type).toBe("paragraph");
                expect(html[4].text).toContain("10.4. In caso di svincoli che generano valori decimali");
                expect(html[4].type).toBe("paragraph");
                expect(html[5].text).toContain("10.5. Se, durante la competizione, un calciatore viene ceduto in altri campionati");
                expect(html[5].type).toBe("paragraph");
                expect(html[6].text).toContain("10.6. additional-notes!");
                expect(html[6].type).toBe("paragraph");
            });
        });

        describe("release modes test", function () {

            it("generates the option correctly svincoloInizio", function () {
                realDomDoc.getElementById("cbSvincoloInizio").checked = true;
                const html = PlayerReleaseRules.estraiGestioneSvincoliMercato();
                expect(html).toContain("dovrà comunicare in anticipo i giocatori da svincolare");
            });

            it("generates the option correctly cbSvincoloAcquisto", function () {
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;
                const html = PlayerReleaseRules.estraiGestioneSvincoliMercato();
                expect(html).toContain("lo svincolo solamente dopo aver eseguito un acquisto");
            });

            it("generates the option correctly cbSvincoloFine", function () {
                realDomDoc.getElementById("cbSvincoloFine").checked = true;
                const html = PlayerReleaseRules.estraiGestioneSvincoliMercato();
                expect(html).toContain("solamente a fine mercato");
            });

        });

        describe("ri-acquisto giocatori options tests", function () {

            it("under test = cbRiacquistoSi", function () {
                realDomDoc.getElementById("cbRiacquistoSi").checked = true;
                const html = PlayerReleaseRules.estraiAbilitazioneRiacquisto();
                expect(html).not.toContain("NON");
                expect(html).toContain("sarà possibile ri-acquistare giocatori precedentemente svincolati");
            });

            it("under test = cbRiacquistoNo", function () {
                realDomDoc.getElementById("cbRiacquistoNo").checked = true;
                const html = PlayerReleaseRules.estraiAbilitazioneRiacquisto();
                expect(html).toContain("NON sarà possibile ri-acquistare giocatori precedentemente svincolati");
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

            it("generated correctly release with: metà quotazione attuale", function () {
                realDomDoc.getElementById("cbSvincoloMetaAttuale").checked = true;
                const html = PlayerReleaseRules.estraiGestioneSvincoli();
                expect(html).toContain("crediti pari alla metà della quotazione attuale");
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

        describe("decimal values tests", function () {
            it("defect radio test", function () {
                realDomDoc.getElementById("cbSvincoloMeta").checked = true;
                realDomDoc.getElementById("cbEccesso").checked = true;

                const html = PlayerReleaseRules.estraiGestioneDecimali();
                expect(html).toContain("per eccesso, esempio");
            });

            it("excess radio test", function () {
                realDomDoc.getElementById("cbSvincoloMedia").checked = true;
                realDomDoc.getElementById("cbDifetto").checked = true;

                const html = PlayerReleaseRules.estraiGestioneDecimali();
                expect(html).toContain("per difetto, esempio");
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