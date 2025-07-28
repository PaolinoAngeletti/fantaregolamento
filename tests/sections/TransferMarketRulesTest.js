function runTransferMarketRulesTests() {
    describe("Transfer market rules", function () {
        describe("produce test", function () {
            it("generates correct HTML", function () {
                realDomDoc.getElementById("etCrediti").value = "100";
                realDomDoc.getElementById("etCreditiSessione").value = "30";
                realDomDoc.getElementById("etCentrocampisti").value = "8";
                realDomDoc.getElementById("etMassimoScambi").value = "3";
                realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
                realDomDoc.getElementById("cbCambioRuoloSi").checked = true;
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;
                realDomDoc.getElementById("etNoteMercato").value = "notes";

                const html = TransferMarketRules.produce(7);

                expect(html).toContain("<h2>7. Gestione mercato");
                expect(html).toContain("<p>7.1. Per il mercato iniziale sono previsti 100 fantamilioni");
                expect(html).toContain("<p>7.2. Per le successive sessioni di mercato invece sono previsti 30");
                expect(html).toContain("<p>7.3. Sono permessi gli scambi di crediti tra i partecipanti");
                expect(html).toContain("<p>7.4. Sono permessi i cambi ruolo dei giocatori");
                expect(html).toContain("<p>7.5. Prevista l'applicazione dello svincolo su acquisto");
                expect(html).toContain("<p>7.6. Ogni squadra potrà effettuare un numero massimo di cambio giocatori pari a 3");
                expect(html).toContain("<p>7.7. notes");
            });
        });

        describe("credits number tests", function () {
            it("credits number cannot be negative", function () {
                realDomDoc.getElementById("etCrediti").value = "-10";
                try {
                    TransferMarketRules.estraiNumeroCrediti();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Numero crediti");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("credits number cannot be zero", function () {
                realDomDoc.getElementById("etCrediti").value = "0";
                try {
                    TransferMarketRules.estraiNumeroCrediti();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Numero crediti");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });
        });

        describe("additional credits number tests", function () {
            it("generates correctly etCreditiSessione = 0", function () {
                realDomDoc.getElementById("etCrediti").value = "50";
                realDomDoc.getElementById("etCreditiSessione").value = "0";

                const html = TransferMarketRules.estraiNumeroCrediti();
                expect(html).toContain("non sono previste aggiunte di crediti");
            });

            it("additional credits number cannot be negative", function () {
                realDomDoc.getElementById("etCreditiSessione").value = "-1";
                try {
                    TransferMarketRules.estraiNumeroCreditiSuccessivi();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Numero crediti per sessione");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("additional credits number can be zero", function () {
                realDomDoc.getElementById("etCreditiSessione").value = "0";
                expect(function () {
                    TransferMarketRules.estraiNumeroCreditiSuccessivi();
                }).not.toThrow();
            });
        });

        describe("swap credits test", function () {
            it("testing credits swap enabled", function () {
                realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
                const html = TransferMarketRules.estraiAbilitazioneScambioCrediti(2);
                expect(html).toContain("Sono permessi gli scambi di crediti tra i partecipanti");
            });

            it("testing credits swap disabled", function () {
                realDomDoc.getElementById("cbScambioCreditiSi").checked = false;
                const html = TransferMarketRules.estraiAbilitazioneScambioCrediti(3);
                expect(html).toContain("Non sono permessi gli scambi di crediti tra i partecipanti");
            });
        });

        describe("change role test", function () {
            it("testing role change enabled", function () {
                realDomDoc.getElementById("cbCambioRuoloSi").checked = true;
                const html = TransferMarketRules.estraiAbilitazioneCambioRuolo();
                expect(html).toContain("Sono permessi i cambi ruolo dei giocatori");
            });

            it("testing role change disabled", function () {
                realDomDoc.getElementById("cbCambioRuoloSi").checked = false;
                const html = TransferMarketRules.estraiAbilitazioneCambioRuolo();
                expect(html).toContain("Non verranno applicati cambi ruolo dei giocatori");
            });
        });

        describe("release modes test", function () {
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
        });

        describe("max changes number test", function () {
            it("maximum change number cannot be negative", function () {
                realDomDoc.getElementById("etMassimoScambi").value = "-1";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiConsentiti();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi massimi");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("manage correctly etMassimoScambi = 0", function () {
                realDomDoc.getElementById("etMassimoScambi").value = "0";

                const html = TransferMarketRules.estraiNumeroMassimoCambiConsentiti();
                expect(html).toContain("Non ci sono limiti relativi al massimo numero");
            });
        });

        describe("additional notes tests", function () {
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
    });
}
