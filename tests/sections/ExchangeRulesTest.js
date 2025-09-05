function runExchangeRulesTests() {
    describe("Exchange rules", function () {
        describe("produce test", function () {
            it("generates correct HTML", function () {
                realDomDoc.getElementById("cbScambiSi").checked = true;
                realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
                realDomDoc.getElementById("etNoteScambi").value = "additional-notes";

                const html = ExchangeRules.produce(22);

                expect(html).toContain("<h2>22. Gestione scambi");
                expect(html).toContain("<p>22.1. Sono previsti gli scambi di giocatori");
                expect(html).toContain("<p>22.2. Sono permessi gli scambi di crediti tra i partecipanti");
                expect(html).toContain("<p>22.3. additional-notes");
            });
        });

        describe("allowed exchange tests", function () {
            it("exchanges allowed", function () {
                realDomDoc.getElementById("cbScambiSi").checked = true;
                realDomDoc.getElementById("cbScambiNo").checked = false;

                const html = ExchangeRules.retrieveExchangeEnabling();
                expect(html).toContain("Sono previsti gli scambi");
            });

            it("exchanges disallowed", function () {
                realDomDoc.getElementById("cbScambiSi").checked = false;
                realDomDoc.getElementById("cbScambiNo").checked = true;

                const html = ExchangeRules.retrieveExchangeEnabling();
                expect(html).toContain("Non sono previsti gli scambi");
            });

            it("front-end selection bug all true", function () {
                realDomDoc.getElementById("cbScambiNo").checked = true;
                realDomDoc.getElementById("cbScambiSi").checked = true;

                const html = ExchangeRules.retrieveExchangeEnabling();
                expect(html).toContain("Sono previsti gli scambi");
            });

            it("front-end selection bug all false", function () {
                realDomDoc.getElementById("cbScambiSi").checked = false;
                realDomDoc.getElementById("cbScambiNo").checked = false;

                const html = ExchangeRules.retrieveExchangeEnabling();
                expect(html).toContain("Non sono previsti gli scambi");
            });
        });

        describe("swap credits test", function () {
            it("testing credits swap enabled", function () {
                realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
                const html = ExchangeRules.estraiAbilitazioneScambioCrediti();
                expect(html).toContain("Sono permessi gli scambi di crediti tra i partecipanti");
            });

            it("testing credits swap disabled", function () {
                realDomDoc.getElementById("cbScambioCreditiSi").checked = false;
                const html = ExchangeRules.estraiAbilitazioneScambioCrediti();
                expect(html).toContain("Non sono permessi gli scambi di crediti tra i partecipanti");
            });
        });
    });
}
