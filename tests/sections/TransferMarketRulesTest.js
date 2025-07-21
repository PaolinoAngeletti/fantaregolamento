function runTransferMarketRulesTests() {
    describe("TransferMarketRules", function () {
        beforeEach(function () {
            realDomDoc.getElementById("etCrediti").value = "100";
            realDomDoc.getElementById("etCreditiSessione").value = "30";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etMassimoScambi").value = "3";
            realDomDoc.getElementById("etNoteMercato").value = "";
        });

        it("generates correct HTML with all options enabled", function () {
            realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
            realDomDoc.getElementById("cbCambioRuoloSi").checked = true;
            realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;

            const html = TransferMarketRules.produce();

            expect(html).toContain("Gestione mercato");
            expect(html).toContain("100 fantamilioni");
            expect(html).toContain("scambi di crediti tra i partecipanti");
            expect(html).toContain("cambi ruolo dei giocatori");
            expect(html).toContain("svincolo su acquisto");
            expect(html).toContain("numero massimo di cambio giocatori pari a 3");
        });

        it("generates the option correctly svincoloInizioSi", function () {
            realDomDoc.getElementById("cbSvincoloAcquisto").checked = false;
            realDomDoc.getElementById("cbSvincoloInizioSi").checked = true;

            const html = TransferMarketRules.estraiGestioneSvincoliMercato();
            expect(html).toContain("potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso");
        });

        it("generates the option correctly svincoloInizioNo", function () {
            realDomDoc.getElementById("cbSvincoloAcquisto").checked = false;
            realDomDoc.getElementById("cbSvincoloInizioSi").checked = false;
            realDomDoc.getElementById("cbSvincoloInizioNo").checked = true;

            const html = TransferMarketRules.estraiGestioneSvincoliMercato();
            expect(html).toContain("NON potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso");
        });

        it("generates correctly etCreditiSessione = 0", function () {
            realDomDoc.getElementById("etCreditiSessione").value = "0";

            const html = TransferMarketRules.estraiNumeroCrediti();
            expect(html).toContain("non sono previste aggiunte di crediti");
        });

        it("manage correctly etMassimoScambi = 0", function () {
            realDomDoc.getElementById("etMassimoScambi").value = "0";

            const html = TransferMarketRules.estraiNumeroMassimoCambiConsentiti();
            expect(html).toContain("Non ci sono limiti relativi al massimo numero");
        });

        it("not add rows for etNoteMercato empty", function () {
            realDomDoc.getElementById("etNoteMercato").value = "   ";

            const html = TransferMarketRules.estraiEventualiNoteAggiuntiveMercato();
            expect(html).toBe("");
        });

        it("correctly add rows for etNoteMercato inserted", function () {
            realDomDoc.getElementById("etNoteMercato").value = "hello1 hello2-hello3";

            const html = TransferMarketRules.estraiEventualiNoteAggiuntiveMercato(6);
            expect(html).toBe("<p>6.7. hello1 hello2-hello3</p>");
        });
    });
}
