function runAccidentReleaseRulesTests() {
    describe("AccidentReleaseRules", function () {
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
}
