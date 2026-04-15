function runMainScriptTests() {
    describe("RegulationCreationTest", function () {
        it("generate a valid and complete HTML document", function () {

            //setting correct values from verified fields.
            realDomDoc.getElementById("etInizio").value = "1";
            realDomDoc.getElementById("etFine").value = "30";
            realDomDoc.getElementById("etPortieri").value = "3";
            realDomDoc.getElementById("etDifensori").value = "8";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etAttaccanti").value = "6";
            realDomDoc.getElementById("etCrediti").value = "300";
            realDomDoc.getElementById("etCreditiSessione").value = "0";
            realDomDoc.getElementById("etMaxScambiCompetizione").value = "2";
            realDomDoc.getElementById("etMaxScambiSessione").value = "0";
            realDomDoc.getElementById("etMaxScambiRuolo").value = "0";
            realDomDoc.getElementById("etTolleranza").value = "10";
            realDomDoc.getElementById('etSoglie').value = "5";
            realDomDoc.getElementById("etQuota").value = "50";
            realDomDoc.getElementById("cbPenalitaNo").checked = true;
            realDomDoc.getElementById("cb442").checked = true;
            realDomDoc.getElementById('etNumSostituzioni').value = "3";

            const html = createHTMLCode();
            expect(html).toContain("<!DOCTYPE html>");
            expect(html).toContain("<html lang='it'>");
            expect(html).toContain("<head>");
            expect(html).toContain("<title>Regolamento creato</title>");
            expect(html).toContain("<body");
            expect(html).toContain("<h1>Regolamento Fantacalcio</h1>");
            expect(html).toContain("<h2>1. Tipologia competizione</h2>");
            expect(html).toContain("<h2>2. Struttura rose</h2>");
            expect(html).toContain("<h2>3. Gestione mercato</h2>");
            expect(html).toContain("<h2>4. Gestione svincoli</h2>");
            expect(html).toContain("<h2>5. Gestione scambi</h2>");
            expect(html).toContain("<h2>6. Gestione infortuni</h2>");
            expect(html).toContain("<h2>7. Inserimento formazione</h2>");
            expect(html).toContain("<h2>8. Gestione sostituzioni</h2>");
            expect(html).toContain("<h2>9. Calcolo giornate</h2>");
            expect(html).toContain("<h2>10. Classifica</h2>");
            expect(html).toContain("<h2>11. Quote squadre e premi finali</h2>");
            expect(html).toContain("Documento stilato con");
            expect(html).toContain("</html>");
        });
    });

    describe("HTML ↔ JSON fields", function () {

        describe("from-HTML-to-JSON-tests", function () {

            let test_cases = [

                // competition type.
                {field: "cbCalendario", value: true},
                {field: "cbCalendario", value: false},
                {field: "cbFormulaUno", value: true},
                {field: "cbFormulaUno", value: false},
                {field: "cbListone", value: true},
                {field: "cbListone", value: false},
                {field: "etInizio", value: "45"},
                {field: "etFine", value: "10"},

                // team rules.
                {field: "etPortieri", value: "5"},
                {field: "etDifensori", value: "47"},
                {field: "etCentrocampisti", value: "51"},
                {field: "etAttaccanti", value: "12"},
                {field: "cbCondivisiSi", value: true},
                {field: "cbCondivisiSi", value: false},
                {field: "cbCondivisiNo", value: true},
                {field: "cbCondivisiNo", value: false},

                // transfer market rules.
                {field: "etCrediti", value: "750"},
                {field: "etCreditiSessione", value: "100"},
                {field: "taCreditiFiniti", value: "10"},
                {field: "cbResiduiSi", value: false},
                {field: "cbResiduiSi", value: true},
                {field: "cbResiduiNo", value: false},
                {field: "cbResiduiNo", value: true},
                {field: "cbCambioRuoloSi", value: false},
                {field: "cbCambioRuoloSi", value: true},
                {field: "cbCambioRuoloNo", value: false},
                {field: "cbCambioRuoloNo", value: true},
                {field: "etMaxScambiCompetizione", value: "15"},
                {field: "etMaxScambiSessione", value: "25"},
                {field: "etMaxScambiRuolo", value: "2"},
                {field: "etNoteMercato", value: "These are beautiful notes!"},

                // player releases.
                {field: "cbSvincoloAcquisto", value: false},
                {field: "cbSvincoloAcquisto", value: true},
                {field: "cbSvincoloInizioSi", value: false},
                {field: "cbSvincoloInizioSi", value: true},
                {field: "cbSvincoloInizioNo", value: false},
                {field: "cbSvincoloInizioNo", value: true},
                {field: "cbSvincoloNessun", value: false},
                {field: "cbSvincoloNessun", value: true},
                {field: "cbSvincoloUno", value: false},
                {field: "cbSvincoloUno", value: true},
                {field: "cbSvincoloMeta", value: false},
                {field: "cbSvincoloMeta", value: true},
                {field: "cbSvincoloQuotazione", value: false},
                {field: "cbSvincoloQuotazione", value: true},
                {field: "cbSvincoloAttuale", value: false},
                {field: "cbSvincoloAttuale", value: true},
                {field: "cbSvincoloMedia", value: false},
                {field: "cbSvincoloMedia", value: true},
                {field: "cbPreMercatoSvincolo", value: false},
                {field: "cbPreMercatoSvincolo", value: true},
                {field: "cbPreMercatoPrestito", value: false},
                {field: "cbPreMercatoPrestito", value: true},
                {field: "cbPreMercatoQuotazioneIntera", value: false},
                {field: "cbPreMercatoQuotazioneIntera", value: true},
                {field: "etNoteSvincoli", value: "These are beautiful notes!"},

                // exchange rules.
                {field: "cbScambioCreditiSi", value: false},
                {field: "cbScambioCreditiSi", value: true},
                {field: "cbScambioCreditiNo", value: false},
                {field: "cbScambioCreditiNo", value: true},
                {field: "cbScambioQuotazioneA", value: false},
                {field: "cbScambioQuotazioneA", value: true},
                {field: "cbScambioQuotazioneB", value: false},
                {field: "cbScambioQuotazioneB", value: true},
                {field: "etNoteScambi", value: "These are beautiful notes!"},

                // accident rules.
                {field: "cbInfortunioNessun", value: false},
                {field: "cbInfortunioNessun", value: true},
                {field: "cbInfortunioPrestito", value: false},
                {field: "cbInfortunioPrestito", value: true},
                {field: "cbCovidPolitico", value: false},
                {field: "cbCovidPolitico", value: true},
                {field: "cbCovidPanchina", value: false},
                {field: "cbCovidPanchina", value: true},
                {field: "cbCovidScaglioni", value: false},
                {field: "cbCovidScaglioni", value: true},
                {field: "etNoteInfortuni", value: "These are beautiful notes!"},

                // insert team rules.
                {field: "etPanchina", value: "DD-CC-AA"},
                {field: "etTolleranza", value: "14"},
                {field: "cb442", value: false},
                {field: "cb442", value: true},
                {field: "cb433", value: false},
                {field: "cb433", value: true},
                {field: "cb451", value: false},
                {field: "cb451", value: true},
                {field: "cb343", value: false},
                {field: "cb343", value: true},
                {field: "cb352", value: false},
                {field: "cb352", value: true},
                {field: "cb532", value: false},
                {field: "cb532", value: true},
                {field: "cb541", value: false},
                {field: "cb541", value: true},
                {field: "cb631", value: false},
                {field: "cb631", value: true},
                {field: "cb622", value: false},
                {field: "cb622", value: true},
                {field: "cbMancataNulla", value: false},
                {field: "cbMancataNulla", value: true},
                {field: "cbMancataPrecedente", value: false},
                {field: "cbMancataPrecedente", value: true},
                {field: "cbPenalitaNo", value: false},
                {field: "cbPenalitaNo", value: true},
                {field: "cbPenalitaYes", value: false},
                {field: "cbPenalitaYes", value: true},
                {field: "taPenality", value: "penality"},
                {field: "cbInvisibiliSi", value: false},
                {field: "cbInvisibiliSi", value: true},
                {field: "cbInvisibiliNo", value: false},
                {field: "cbInvisibiliNo", value: true},
                {field: "etNoteFormazione", value: "These are beautiful notes!"},

                // substitutions.
                {field: "etNumSostituzioni", value: "10"},
                {field: "cbAmmIgnorata", value: false},
                {field: "cbAmmIgnorata", value: true},
                {field: "cbAmmCascade", value: false},
                {field: "cbAmmCascade", value: true},
                {field: "etNoteSostituzioni", value: "These are beautiful notes!"},
            ];

            test_cases.forEach(test => {
                it(`${test.field} value = ${test.value}`, () => {

                    // field setup.
                    let element = realDomDoc.getElementById(test.field);
                    if ("radio" === element.type || "checkbox" === element.type) {
                        element.checked = test.value;
                    } else {
                        element.value = test.value;
                    }

                    // test assertion.
                    const json = retrieveMetadataForReload(realDomDoc);
                    console.log(json);
                    expect(json[test.field]).toBe(test.value);
                });
            });
        })

        describe("from-JSON-to-HTML-tests", function () {

            let test_cases = [

                // competition type.
                {field: "cbCalendario", start_value: false, final_value: true},
                {field: "cbCalendario", start_value: true, final_value: false},
                {field: "cbFormulaUno", start_value: false, final_value: true},
                {field: "cbFormulaUno", start_value: true, final_value: false},
                {field: "cbListone", start_value: false, final_value: true},
                {field: "cbListone", start_value: true, final_value: false},
                {field: "etInizio", start_value: "5", final_value: "20"},
                {field: "etFine", start_value: "10", final_value: "4"},

                // team rules.
                {field: "etPortieri", start_value: "5", final_value: "10"},
                {field: "etDifensori", start_value: "47", final_value: "10"},
                {field: "etCentrocampisti", start_value: "51", final_value: "3"},
                {field: "etAttaccanti", start_value: "12", final_value: "102"},
                {field: "cbCondivisiNo", start_value: false, final_value: true},
                {field: "cbCondivisiNo", start_value: true, final_value: false},
                {field: "cbCondivisiSi", start_value: false, final_value: true},
                {field: "cbCondivisiSi", start_value: true, final_value: false},

                // transfer market rules.
                {field: "etCrediti", start_value: "750", final_value: "100"},
                {field: "etCreditiSessione", start_value: "100", final_value: "150"},
                {field: "taCreditiFiniti", start_value: "10", final_value: "50"},
                {field: "cbResiduiSi", start_value: false, final_value: true},
                {field: "cbResiduiSi", start_value: true, final_value: false},
                {field: "cbResiduiNo", start_value: false, final_value: true},
                {field: "cbResiduiNo", start_value: true, final_value: false},
                {field: "cbCambioRuoloSi", start_value: false, final_value: true},
                {field: "cbCambioRuoloSi", start_value: true, final_value: false},
                {field: "cbCambioRuoloNo", start_value: false, final_value: true},
                {field: "cbCambioRuoloNo", start_value: true, final_value: false},
                {field: "etMaxScambiCompetizione", start_value: "15", final_value: "20"},
                {field: "etMaxScambiSessione", start_value: "25", final_value: "20"},
                {field: "etMaxScambiRuolo", start_value: "2", final_value: "20"},
                {
                    field: "etNoteMercato",
                    start_value: "These are beautiful notes!",
                    final_value: "These are very bad notes!"
                },

                // player releases.
                {field: "cbSvincoloAcquisto", start_value: false, final_value: true},
                {field: "cbSvincoloAcquisto", start_value: true, final_value: false},
                {field: "cbSvincoloInizioSi", start_value: false, final_value: true},
                {field: "cbSvincoloInizioSi", start_value: true, final_value: false},
                {field: "cbSvincoloInizioNo", start_value: false, final_value: true},
                {field: "cbSvincoloInizioNo", start_value: true, final_value: false},
                {field: "cbSvincoloNessun", start_value: false, final_value: true},
                {field: "cbSvincoloNessun", start_value: true, final_value: false},
                {field: "cbSvincoloUno", start_value: false, final_value: true},
                {field: "cbSvincoloUno", start_value: true, final_value: false},
                {field: "cbSvincoloMeta", start_value: false, final_value: true},
                {field: "cbSvincoloMeta", start_value: true, final_value: false},
                {field: "cbSvincoloQuotazione", start_value: false, final_value: true},
                {field: "cbSvincoloQuotazione", start_value: true, final_value: false},
                {field: "cbSvincoloAttuale", start_value: false, final_value: true},
                {field: "cbSvincoloAttuale", start_value: true, final_value: false},
                {field: "cbSvincoloMedia", start_value: false, final_value: true},
                {field: "cbSvincoloMedia", start_value: true, final_value: false},
                {field: "cbPreMercatoSvincolo", start_value: false, final_value: true},
                {field: "cbPreMercatoSvincolo", start_value: true, final_value: false},
                {field: "cbPreMercatoPrestito", start_value: false, final_value: true},
                {field: "cbPreMercatoPrestito", start_value: true, final_value: false},
                {field: "cbPreMercatoQuotazioneIntera", start_value: false, final_value: true},
                {field: "cbPreMercatoQuotazioneIntera", start_value: true, final_value: false},
                {
                    field: "etNoteSvincoli",
                    start_value: "These are beautiful notes!",
                    final_value: "These are very bad notes!"
                },

                // exchange rules.
                {field: "cbScambioCreditiSi", start_value: false, final_value: true},
                {field: "cbScambioCreditiSi", start_value: true, final_value: false},
                {field: "cbScambioCreditiNo", start_value: false, final_value: true},
                {field: "cbScambioCreditiNo", start_value: true, final_value: false},
                {field: "cbScambioQuotazioneA", start_value: false, final_value: true},
                {field: "cbScambioQuotazioneA", start_value: true, final_value: false},
                {field: "cbScambioQuotazioneB", start_value: false, final_value: true},
                {field: "cbScambioQuotazioneB", start_value: true, final_value: false},
                {
                    field: "etNoteScambi",
                    start_value: "These are beautiful notes!",
                    final_value: "These are very bad notes!"
                },

                // accident rules.
                {field: "cbInfortunioNessun", start_value: false, final_value: true},
                {field: "cbInfortunioNessun", start_value: true, final_value: false},
                {field: "cbInfortunioPrestito", start_value: false, final_value: true},
                {field: "cbInfortunioPrestito", start_value: true, final_value: false},
                {field: "cbCovidPolitico", start_value: false, final_value: true},
                {field: "cbCovidPolitico", start_value: true, final_value: false},
                {field: "cbCovidPanchina", start_value: false, final_value: true},
                {field: "cbCovidPanchina", start_value: true, final_value: false},
                {field: "cbCovidScaglioni", start_value: false, final_value: true},
                {field: "cbCovidScaglioni", start_value: true, final_value: false},
                {
                    field: "etNoteInfortuni",
                    start_value: "These are beautiful notes!",
                    final_value: "These are very bad notes!"
                },

                // insert team rules.
                {field: "etPanchina", start_value: "PP", final_value: "PP-DD-CC"},
                {field: "etTolleranza", start_value: "1", final_value: "2"},
                {field: "cb442", start_value: false, final_value: true},
                {field: "cb442", start_value: true, final_value: false},
                {field: "cb433", start_value: false, final_value: true},
                {field: "cb433", start_value: true, final_value: false},
                {field: "cb451", start_value: false, final_value: true},
                {field: "cb451", start_value: true, final_value: false},
                {field: "cb343", start_value: false, final_value: true},
                {field: "cb343", start_value: true, final_value: false},
                {field: "cb352", start_value: false, final_value: true},
                {field: "cb352", start_value: true, final_value: false},
                {field: "cb532", start_value: false, final_value: true},
                {field: "cb532", start_value: true, final_value: false},
                {field: "cb541", start_value: false, final_value: true},
                {field: "cb541", start_value: true, final_value: false},
                {field: "cb631", start_value: false, final_value: true},
                {field: "cb631", start_value: true, final_value: false},
                {field: "cb622", start_value: false, final_value: true},
                {field: "cb622", start_value: true, final_value: false},
                {field: "cbMancataNulla", start_value: false, final_value: true},
                {field: "cbMancataNulla", start_value: true, final_value: false},
                {field: "cbMancataPrecedente", start_value: false, final_value: true},
                {field: "cbMancataPrecedente", start_value: true, final_value: false},
                {field: "cbPenalitaNo", start_value: false, final_value: true},
                {field: "cbPenalitaNo", start_value: true, final_value: false},
                {field: "cbPenalitaYes", start_value: false, final_value: true},
                {field: "cbPenalitaYes", start_value: true, final_value: false},
                {field: "taPenality", start_value: "text-1", final_value: "text-2"},
                {field: "cbInvisibiliSi", start_value: false, final_value: true},
                {field: "cbInvisibiliSi", start_value: true, final_value: false},
                {field: "cbInvisibiliNo", start_value: false, final_value: true},
                {field: "cbInvisibiliNo", start_value: true, final_value: false},
                {field: "etNoteFormazione", start_value: "text-1", final_value: "text-2"},

                // substitutions.
                {field: "etNumSostituzioni", start_value: "10", final_value: "0"},
                {field: "cbAmmIgnorata", start_value: false, final_value: true},
                {field: "cbAmmIgnorata", start_value: true, final_value: false},
                {field: "cbAmmCascade", start_value: false, final_value: true},
                {field: "cbAmmCascade", start_value: true, final_value: false},
                {field: "etNoteSostituzioni", start_value: "text-1", final_value: "text-2"},
            ];

            test_cases.forEach(test => {
                it(`${test.field} loading = ${test.final_value} from = ${test.start_value}`, () => {
                    let field = test.field;
                    let start_value = test.start_value;
                    let final_value = test.final_value;

                    // field setup.
                    let element = realDomDoc.getElementById(test.field);
                    if ("radio" === element.type || "checkbox" === element.type) {
                        element.checked = start_value;
                        expect(element.checked).toBe(start_value);
                    } else {
                        element.value = start_value;
                        expect(element.value).toBe(start_value);
                    }

                    // invoke configuration import.
                    loadRegulationFromJson({
                        [field]: final_value
                    }, realDomDoc);

                    // test assertions.
                    if ("radio" === element.type || "checkbox" === element.type) {
                        expect(element.checked).toBe(final_value);
                    } else {
                        expect(element.value).toBe(final_value);
                    }
                });
            });

        })

    });
}