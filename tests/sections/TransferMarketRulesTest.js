function runTransferMarketRulesTests() {
    describe("Transfer market rules", function () {
        describe("produce test", function () {
            it("generates correct HTML", function () {
                realDomDoc.getElementById("etCrediti").value = "100";
                realDomDoc.getElementById("etCreditiSessione").value = "30";
                realDomDoc.getElementById("etCentrocampisti").value = "8";
                realDomDoc.getElementById("etMaxScambiCompetizione").value = "3";
                realDomDoc.getElementById("etMaxScambiSessione").value = "2";
                realDomDoc.getElementById("etMaxScambiRuolo").value = "1";
                realDomDoc.getElementById("cbScambioCreditiSi").checked = true;
                realDomDoc.getElementById("cbCambioRuoloSi").checked = true;
                realDomDoc.getElementById("cbSvincoloAcquisto").checked = true;
                realDomDoc.getElementById("etNoteMercato").value = "notes";
                realDomDoc.getElementById("cbResiduiSi").checked = true;
                realDomDoc.getElementById("cbResiduiNo").checked = false;
                realDomDoc.getElementById("taCreditiFiniti").value = "";

                const html = TransferMarketRules.produce(7);

                expect(html).toContain("<h2>7. Gestione mercato");
                expect(html).toContain("<p>7.1. Per il mercato iniziale sono previsti 100 fantamilioni");
                expect(html).toContain("<p>7.2. Per le successive sessioni di mercato invece sono previsti 30");
                expect(html).toContain("<p>7.3. Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili");
                expect(html).toContain("<p>7.4. Alla fine di una sessione di mercato, gli eventuali crediti residui");
                expect(html).toContain("<p>7.5. Sono permessi gli scambi di crediti tra i partecipanti");
                expect(html).toContain("<p>7.6. Sono permessi i cambi ruolo dei giocatori");
                expect(html).toContain("<p>7.7. Prevista l'applicazione dello svincolo su acquisto");
                expect(html).toContain("<p>7.8. Previsto limite di cambi massimi per l'intera competizione");
                expect(html).toContain("<p>7.9. Previsto limite di cambi massimi per una singola sessione di mercato");
                expect(html).toContain("<p>7.10. Previsto limite di cambi massimi per ruolo");
                expect(html).toContain("<p>7.11. notes");
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

        describe("finisched credits notes tests", function () {
            it("value inserted is empty", function () {
                realDomDoc.getElementById("taCreditiFiniti").value = "";
                const html = TransferMarketRules.retrieveFinishedCreditsManagement(14);
                expect(html).toContain("<p>14.3. Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili per il mercato");
            });

            it("value is not empty", function () {
                realDomDoc.getElementById("taCreditiFiniti").value = "test-value-1";
                const html = TransferMarketRules.retrieveFinishedCreditsManagement(6);
                expect(html).toContain("<p>6.3. Nel caso in cui una squadra superi il numero di crediti spendibili, verrà applicata la seguente strategia: test-value-1</p>");
            });
        });

        describe("credits propagation on residual test", function () {
            it("propagate residual credits enabled", function () {
                realDomDoc.getElementById("cbResiduiSi").checked = true;
                realDomDoc.getElementById("cbResiduiNo").checked = false;
                const html = TransferMarketRules.retrieveResidualCreditsManagements(2);
                expect(html).toContain("<p>2.4. Alla fine di una sessione di mercato, gli eventuali crediti residui verranno utilizzati come base di partenza per la successiva sessione di mercato.");
            });

            it("propagate residual credits disabled", function () {
                realDomDoc.getElementById("cbResiduiSi").checked = false;
                realDomDoc.getElementById("cbResiduiNo").checked = true;
                const html = TransferMarketRules.retrieveResidualCreditsManagements(3);
                expect(html).toContain("<p>3.4. Alla fine di una sessione di mercato, gli eventuali crediti residui verranno ignorati, per cui non verranno utilizzati per le successive sessioni di mercato");
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

        describe("max changes number for competition test", function () {
            it("maximum change number cannot be negative", function () {
                realDomDoc.getElementById("etMaxScambiCompetizione").value = "-1";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiCompetizione();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi massimi");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("manage correctly etMassimoScambi = 0", function () {
                realDomDoc.getElementById("etMaxScambiCompetizione").value = "0";
                const html = TransferMarketRules.estraiNumeroMassimoCambiCompetizione(6);
                expect(html).toContain("<p>6.8. Non ci sono limiti relativi al massimo numero di giocatori modificabili per la competizione");
            });
        });

        describe("max changes number for market sessione test", function () {
            it("maximum change number cannot be negative", function () {
                realDomDoc.getElementById("etMaxScambiSessione").value = "-1";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiSessione();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi massimi per sessione");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("manage correctly value = 0", function () {
                realDomDoc.getElementById("etMaxScambiCompetizione").value = "0";
                realDomDoc.getElementById("etMaxScambiSessione").value = "0";
                const html = TransferMarketRules.estraiNumeroMassimoCambiSessione(3);
                expect(html).toContain("<p>3.9. Non ci sono limiti relativi al massimo numero di giocatori modificabili in una singola sessione di mercato");
            });

            it("competition value should be greater then session number", function () {
                realDomDoc.getElementById("etMaxScambiSessione").value = "5";
                realDomDoc.getElementById("etMaxScambiCompetizione").value = "4";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiSessione();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi per sessione");
                    expect(error.message).toContain(FieldValidation.SHOULD_BE_MINOR);
                }
            });
        });

        describe("max changes number for role test", function () {
            it("maximum change number cannot be negative", function () {
                realDomDoc.getElementById("etMaxScambiRuolo").value = "-1";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiRuolo();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi massimi per ruolo");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("manage correctly value = 0", function () {
                realDomDoc.getElementById("etMaxScambiSessione").value = "0";
                realDomDoc.getElementById("etMaxScambiRuolo").value = "0";
                const html = TransferMarketRules.estraiNumeroMassimoCambiRuolo(3);
                expect(html).toContain("<p>3.10. Non ci sono limiti relativi al massimo numero di giocatori modificabili per ruolo");
            });

            it("session value should be greater then role number", function () {
                realDomDoc.getElementById("etMaxScambiSessione").value = "5";
                realDomDoc.getElementById("etMaxScambiRuolo").value = "6";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiRuolo(4);
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione mercato");
                    expect(error.message).toContain("Scambi per ruolo");
                    expect(error.message).toContain(FieldValidation.SHOULD_BE_MINOR);
                }
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
                expect(html).toBe("<p>6.11. hello1 hello2-hello3</p>");
            });
        });
    });
}
