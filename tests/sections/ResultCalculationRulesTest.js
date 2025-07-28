function runResultCalculationTests() {
    describe("ResultCalculationRules", function () {
        describe('produce', () => {
            it('should produce full HTML section', () => {
                realDomDoc.getElementById('etSoglie').value = "2";
                realDomDoc.getElementById('cbNessunLimite').checked = true;
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;
                realDomDoc.getElementById('cbFattoreSi').checked = false;
                realDomDoc.getElementById('cbRinvioMai').checked = true;
                realDomDoc.getElementById('cbModificatoreNo').checked = true;
                realDomDoc.getElementById("etNoteSostituzioni").value = "notes";

                const result = ResultCalculationRules.produce(3);
                expect(result).toContain("<h2>3. Calcolo giornate");
                expect(result).toContain("<p>3.1. I punteggi rilevati da una singola partita saranno:");
                expect(result).toContain("<p>3.2. I bonus e malus previsti dalla competizione saranno:");
                expect(result).toContain("<p>3.3. Le soglie per il calcolo del numero di gol saranno ciascuna da 2 punti");
                expect(result).toContain("<p>3.4. Non verrà applicato mai nessun fattore campo");
                expect(result).toContain("<p>3.5. Nel caso in cui una o più partite vengano rinviate per qualsiasi motivo");
                expect(result).toContain("<p>3.6. Il calcolo della giornata non prevede nessun modificatore di difesa");
            });
        });

        describe("estraiPunteggiVittoriaPareggio", function () {
            it("should return correct text with specific values", function () {
                realDomDoc.getElementById('etVittoria').value = "3";
                realDomDoc.getElementById('etPareggio').value = "2";
                realDomDoc.getElementById('etSconfitta').value = "0";

                const result = ResultCalculationRules.estraiPunteggiVittoriaPareggio();
                expect(result).toContain("Vittoria: 3 punti.");
                expect(result).toContain("Pareggio: 2 punti.");
                expect(result).toContain("Sconfitta: 0 punti.");
            });

            it("should handle different values", function () {
                realDomDoc.getElementById('etVittoria').value = "5";
                realDomDoc.getElementById('etPareggio').value = "2";
                realDomDoc.getElementById('etSconfitta').value = "-1";

                const result = ResultCalculationRules.estraiPunteggiVittoriaPareggio();
                expect(result).toContain("Vittoria: 5 punti.");
                expect(result).toContain("Pareggio: 2 punti.");
                expect(result).toContain("Sconfitta: -1 punti.");
            });
        });

        describe("estraiBonusMalus", function () {
            it("should list all bonus/malus values", function () {
                realDomDoc.getElementById('etGol').value = "3";
                realDomDoc.getElementById('etRigore').value = "2";
                realDomDoc.getElementById('etRigoreSbagliato').value = "-2";
                realDomDoc.getElementById('etAssist').value = "1";
                realDomDoc.getElementById('etCleansheet').value = "3";
                realDomDoc.getElementById('etGolSubito').value = "-4";
                realDomDoc.getElementById('etRigoreParato').value = "1";
                realDomDoc.getElementById('etAmmonizione').value = "-0.5";
                realDomDoc.getElementById('etEspulsione').value = "-1";
                realDomDoc.getElementById('etAutogol').value = "-1";
                realDomDoc.getElementById('etGolVittoria').value = "0";
                realDomDoc.getElementById('etGolPareggio').value = "2.6";

                const result = ResultCalculationRules.estraiBonusMalus();
                expect(result).toContain("Gol segnato: 3 punti.");
                expect(result).toContain("Rigore segnato: 2 punti.");
                expect(result).toContain("Rigore sbagliato: -2 punti.");
                expect(result).toContain("Assist: 1 punti.");
                expect(result).toContain("Porta inviolata: 3 punti.");
                expect(result).toContain("Gol subito (portiere): -4 punti.");
                expect(result).toContain("Rigore parato (portiere): 1 punti.");
                expect(result).toContain("Ammonizione: -0.5 punti.");
                expect(result).toContain("Espulsione: -1 punti.");
                expect(result).toContain("Autogol: -1 punti.");
                expect(result).toContain("Gol decisivo per la vittoria: 0 punti.");
                expect(result).toContain("Gol decisivo per il pareggio: 2.6 punti.");
            });
        });

        describe("estraiAbilitazioneFattoreCampo", function () {
            it("should return text when cbFattoreSi is checked", function () {
                realDomDoc.getElementById('cbFattoreSi').checked = true;
                const result = ResultCalculationRules.estraiAbilitazioneFattoreCampo();
                expect(result).toContain("E' previsto un fattore campo");
            });

            it("should return text when cbFattoreSi is not checked", function () {
                realDomDoc.getElementById('cbFattoreSi').checked = false;
                const result = ResultCalculationRules.estraiAbilitazioneFattoreCampo();
                expect(result).toContain("Non verrà applicato mai nessun fattore campo");
            });
        });

        describe("estraiLarghezzaSoglie", function () {
            it("should return correct soglie", function () {
                realDomDoc.getElementById('etSoglie').value = "5";
                const result = ResultCalculationRules.estraiLarghezzaSoglie();
                expect(result).toContain("ciascuna da 5 punti");
            });

            it("soglie value cannot be negative", function () {
                realDomDoc.getElementById('etSoglie').value = "-1";
                try {
                    ResultCalculationRules.estraiLarghezzaSoglie();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Calcolo giornate");
                    expect(error.message).toContain("Soglie gol");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it("soglie value cannot be zero", function () {
                realDomDoc.getElementById('etSoglie').value = "0";
                try {
                    ResultCalculationRules.estraiLarghezzaSoglie();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Calcolo giornate");
                    expect(error.message).toContain("Soglie gol");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });
        });

        describe("estraiGestioneRinvio", function () {
            it("should return cbRinvioMai text", function () {
                realDomDoc.getElementById('cbRinvioMai').checked = true;
                const result = ResultCalculationRules.estraiGestioneRinvio();
                expect(result).toContain("NON si attenderà MAI la sua conclusione");
            });

            it("should return cbRinvioProssima text", function () {
                realDomDoc.getElementById('cbRinvioProssima').checked = true;
                const result = ResultCalculationRules.estraiGestioneRinvio();
                expect(result).toContain("recuperata al massimo fino alla prossima giornata");
            });

            it("should return cbRinvioPolitico text", function () {
                realDomDoc.getElementById('cbRinvioPolitico').checked = true;
                const result = ResultCalculationRules.estraiGestioneRinvio();
                expect(result).toContain("si attenderà che la partita venga rigiocata");
                expect(result).toContain("votazione politica");
            });

            it("should return cbRinvioPanchina text", function () {
                realDomDoc.getElementById('cbRinvioPanchina').checked = true;
                const result = ResultCalculationRules.estraiGestioneRinvio();
                expect(result).toContain("entrerà in ogni caso il panchinaro previsto");
            });
        });

        describe("estraiGestioneModificatore", function () {
            it("should return no modificatore text", function () {
                realDomDoc.getElementById('cbModificatoreNo').checked = true;
                const result = ResultCalculationRules.estraiGestioneModificatore();
                expect(result).toContain("nessun modificatore di difesa");
            });

            it("should return all scaglioni if cbModificatoreSi is checked", function () {
                realDomDoc.getElementById('cbModificatoreNo').checked = false;
                realDomDoc.getElementById('cbModificatoreSi').checked = true;
                realDomDoc.getElementById('et0599').value = "-3";
                realDomDoc.getElementById('et6624').value = "-2";
                realDomDoc.getElementById('et625649').value = "-1";
                realDomDoc.getElementById('et65674').value = "0";
                realDomDoc.getElementById('et675699').value = "1";
                realDomDoc.getElementById('et7724').value = "2";
                realDomDoc.getElementById('et725749').value = "4";
                realDomDoc.getElementById('et75').value = "10";

                const result = ResultCalculationRules.estraiGestioneModificatore();
                expect(result).toContain("Da 0 punti a 5,99 punti: -3 punti.");
                expect(result).toContain("Da 6 punti a 6,24 punti: -2 punti.");
                expect(result).toContain("Da 6,25 punti a 6,49 punti: -1 punti.");
                expect(result).toContain("Da 6,5 punti a 6,74 punti: 0 punti.");
                expect(result).toContain("Da 6,75 punti a 6,99 punti: 1 punti.");
                expect(result).toContain("Da 7 punti a 7,24 punti: 2 punti.");
                expect(result).toContain("Da 7,25 punti a 7,49 punti: 4 punti.");
                expect(result).toContain("Da 7,5 a salire: 10 punti.");
            });
        });
    });

}