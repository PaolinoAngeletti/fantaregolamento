function runMainScriptTests() {

    describe("generate a valid content list", function () {
        it("generate a valid content list", function () {

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
            realDomDoc.getElementById("cbModificatoreNo").checked = true;
            realDomDoc.getElementById("cb442").checked = true;
            realDomDoc.getElementById("cbScambiNo").checked = true;
            realDomDoc.getElementById('etNumSostituzioni').value = "3";
            realDomDoc.getElementById('etNoteMercato').value = "notes";
            realDomDoc.getElementById('etNoteSvincoli').value = "notes";
            realDomDoc.getElementById('etNoteScambi').value = "notes";
            realDomDoc.getElementById('etNoteInfortuni').value = "notes";
            realDomDoc.getElementById('etNoteFormazione').value = "notes";
            realDomDoc.getElementById('etNoteSostituzioni').value = "notes";

            const html = retrieveRegulationContent();
            let texts = html.map(e => e.text);

            expect(texts).toContain("Regolamento Fantacalcio");
            expect(texts).toContain("1. Tipologia competizione");
            expect(texts).toContain("2. Struttura rose");
            expect(texts).toContain("3. Gestione mercato");
            expect(texts).toContain("4. Gestione svincoli");
            expect(texts).toContain("5. Gestione scambi");
            expect(texts).toContain("6. Gestione infortuni");
            expect(texts).toContain("7. Inserimento formazione");
            expect(texts).toContain("8. Gestione sostituzioni");
            expect(texts).toContain("9. Calcolo giornate");
            expect(texts).toContain("10. Classifica");
            expect(texts).toContain("11. Quote squadre e premi finali");
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

                // calculation rules.
                {field: "etVittoria", value: "5"},
                {field: "etPareggio", value: "4"},
                {field: "etSconfitta", value: "3"},
                {field: "etGol", value: "10"},
                {field: "etRigore", value: "-2"},
                {field: "etRigoreSbagliato", value: "20"},
                {field: "etAssist", value: "1"},
                {field: "etCleanSheet", value: "-9"},
                {field: "etGolSubito", value: "3"},
                {field: "etRigoreParato", value: "3"},
                {field: "etAmmonizione", value: "-0.6"},
                {field: "etEspulsione", value: "-1.6"},
                {field: "etAutogol", value: "-10.2"},
                {field: "etGolVittoria", value: "-10"},
                {field: "etGolPareggio", value: "-2"},
                {field: "etSoglie", value: "10"},
                {field: "cbFattoreSi", value: false},
                {field: "cbFattoreSi", value: true},
                {field: "cbFattoreNo", value: false},
                {field: "cbFattoreNo", value: true},
                {field: "cbRinvioMai", value: false},
                {field: "cbRinvioMai", value: true},
                {field: "cbRinvioProssima", value: false},
                {field: "cbRinvioProssima", value: true},
                {field: "cbRinvioPolitico", value: false},
                {field: "cbRinvioPolitico", value: true},
                {field: "cbRinvioPanchina", value: false},
                {field: "cbRinvioPanchina", value: true},
                {field: "cbModificatoreNo", value: false},
                {field: "cbModificatoreNo", value: true},
                {field: "cbModificatoreSi", value: false},
                {field: "cbModificatoreSi", value: true},
                {field: "et0599", value: "1"},
                {field: "et6624", value: "-10"},
                {field: "et625649", value: "100"},
                {field: "et65674", value: "4"},
                {field: "et675699", value: "1"},
                {field: "et7724", value: "2"},
                {field: "et725749", value: "3"},
                {field: "et75", value: "102"},

                // prices.
                {field: "etQuota", value: "150"},
                {field: "taPremi", value: "These are beautiful notes!"},
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

                // calculation rules.
                {field: "etVittoria", start_value: "5", final_value: "2"},
                {field: "etPareggio", start_value: "6", final_value: "10"},
                {field: "etSconfitta", start_value: "10", final_value: "0"},
                {field: "etGol", start_value: "15", final_value: "2"},
                {field: "etRigore", start_value: "5", final_value: "3"},
                {field: "etRigoreSbagliato", start_value: "3", final_value: "2"},
                {field: "etAssist", start_value: "5", final_value: "2"},
                {field: "etCleanSheet", start_value: "5", final_value: "2"},
                {field: "etGolSubito", start_value: "5", final_value: "2"},
                {field: "etRigoreParato", start_value: "5", final_value: "2"},
                {field: "etAmmonizione", start_value: "15", final_value: "2"},
                {field: "etEspulsione", start_value: "5", final_value: "2"},
                {field: "etAutogol", start_value: "5", final_value: "2"},
                {field: "etGolVittoria", start_value: "3", final_value: "2"},
                {field: "etGolPareggio", start_value: "5", final_value: "2"},
                {field: "etSoglie", start_value: "5", final_value: "2"},
                {field: "cbFattoreSi", start_value: false, final_value: true},
                {field: "cbFattoreSi", start_value: true, final_value: false},
                {field: "cbFattoreNo", start_value: false, final_value: true},
                {field: "cbFattoreNo", start_value: true, final_value: false},
                {field: "cbRinvioMai", start_value: false, final_value: true},
                {field: "cbRinvioMai", start_value: true, final_value: false},
                {field: "cbRinvioProssima", start_value: false, final_value: true},
                {field: "cbRinvioProssima", start_value: true, final_value: false},
                {field: "cbRinvioPolitico", start_value: false, final_value: true},
                {field: "cbRinvioPolitico", start_value: true, final_value: false},
                {field: "cbRinvioPanchina", start_value: false, final_value: true},
                {field: "cbRinvioPanchina", start_value: true, final_value: false},
                {field: "cbModificatoreNo", start_value: false, final_value: true},
                {field: "cbModificatoreNo", start_value: true, final_value: false},
                {field: "cbModificatoreSi", start_value: false, final_value: true},
                {field: "cbModificatoreSi", start_value: true, final_value: false},
                {field: "et0599", start_value: "5", final_value: "2"},
                {field: "et6624", start_value: "5", final_value: "2"},
                {field: "et625649", start_value: "5", final_value: "2"},
                {field: "et65674", start_value: "5", final_value: "2"},
                {field: "et675699", start_value: "5", final_value: "2"},
                {field: "et7724", start_value: "5", final_value: "2"},
                {field: "et725749", start_value: "5", final_value: "2"},
                {field: "et75", start_value: "5", final_value: "2"},

                // prices.
                {field: "etQuota", start_value: "50", final_value: "150"},
                {field: "taPremi", start_value: "Primo posto 150 euro", final_value: "Primo posto 200 euro"},
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