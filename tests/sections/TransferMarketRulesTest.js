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
                realDomDoc.getElementById("etNoteMercato").value = "notes";
                realDomDoc.getElementById("cbResiduiSi").checked = true;
                realDomDoc.getElementById("cbResiduiNo").checked = false;
                realDomDoc.getElementById("taCreditiFiniti").value = "";

                const html = TransferMarketRules.produce(7);

                expect(html[0].text).toContain("7. Gestione mercato");
                expect(html[0].type).toBe("h2");
                expect(html[1].text).toContain("7.1. Per il mercato iniziale sono previsti 100 fanta-milioni");
                expect(html[1].type).toBe("paragraph");
                expect(html[2].text).toContain("7.2. Per le successive sessioni di mercato sono previsti 30");
                expect(html[2].type).toBe("paragraph");
                expect(html[3].text).toContain("7.3. Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili");
                expect(html[3].type).toBe("paragraph");
                expect(html[4].text).toContain("7.4. Alla fine di una sessione di mercato, gli eventuali crediti residui");
                expect(html[4].type).toBe("paragraph");
                expect(html[5].text).toContain("7.5. Sono permessi i cambi ruolo dei giocatori");
                expect(html[5].type).toBe("paragraph");
                expect(html[6].text).toContain("7.6. Previsto limite di cambi massimi per l'intera competizione");
                expect(html[6].type).toBe("paragraph");
                expect(html[7].text).toContain("7.7. Previsto limite di cambi massimi per una singola sessione di mercato");
                expect(html[7].type).toBe("paragraph");
                expect(html[8].text).toContain("7.8. Previsto limite di cambi massimi per ruolo");
                expect(html[8].type).toBe("paragraph");
                expect(html[9].text).toContain("7.9. notes");
                expect(html[9].type).toBe("paragraph");
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

                const html = TransferMarketRules.estraiNumeroCreditiSuccessivi();
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
                const html = TransferMarketRules.retrieveFinishedCreditsManagement();
                expect(html).toContain("Non è stata specificata nessuna gestione del caso in cui una squadra superi il numero di crediti spendibili per il mercato");
            });

            it("value is not empty", function () {
                realDomDoc.getElementById("taCreditiFiniti").value = "test-value-1";
                const html = TransferMarketRules.retrieveFinishedCreditsManagement();
                expect(html).toContain("Nel caso in cui una squadra superi il numero di crediti spendibili, verrà applicata la seguente strategia: test-value-1");
            });
        });

        describe("credits propagation on residual test", function () {
            it("propagate residual credits enabled", function () {
                realDomDoc.getElementById("cbResiduiSi").checked = true;
                realDomDoc.getElementById("cbResiduiNo").checked = false;
                const html = TransferMarketRules.retrieveResidualCreditsManagements();
                expect(html).toContain("Alla fine di una sessione di mercato, gli eventuali crediti residui verranno utilizzati come base di partenza per la successiva sessione di mercato.");
            });

            it("propagate residual credits disabled", function () {
                realDomDoc.getElementById("cbResiduiSi").checked = false;
                realDomDoc.getElementById("cbResiduiNo").checked = true;
                const html = TransferMarketRules.retrieveResidualCreditsManagements();
                expect(html).toContain("Alla fine di una sessione di mercato, gli eventuali crediti residui verranno ignorati, per cui non verranno utilizzati per le successive sessioni di mercato");
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
                const html = TransferMarketRules.estraiNumeroMassimoCambiCompetizione();
                expect(html).toContain("Non ci sono limiti relativi al massimo numero di giocatori modificabili per la competizione");
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
                const html = TransferMarketRules.estraiNumeroMassimoCambiSessione();
                expect(html).toContain("Non ci sono limiti relativi al massimo numero di giocatori modificabili in una singola sessione di mercato");
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
                const html = TransferMarketRules.estraiNumeroMassimoCambiRuolo();
                expect(html).toContain("Non ci sono limiti relativi al massimo numero di giocatori modificabili per ruolo");
            });

            it("session value should be greater then role number", function () {
                realDomDoc.getElementById("etMaxScambiSessione").value = "5";
                realDomDoc.getElementById("etMaxScambiRuolo").value = "6";
                try {
                    TransferMarketRules.estraiNumeroMassimoCambiRuolo();
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
                const html = TransferMarketRules.estraiEventualiNoteAggiuntiveMercato();
                expect(html).toBe("hello1 hello2-hello3");
            });
        });
    });
}
