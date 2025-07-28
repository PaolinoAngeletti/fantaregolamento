function runInsertTeamRuleTests() {
    describe('Insert team rules', () => {
        describe('produce test', () => {
            it('should produce full InsertTeamRules section', () => {
                realDomDoc.getElementById("etTolleranza").value = "10";
                realDomDoc.getElementById("etPanchina").value = "1P";
                realDomDoc.getElementById("etCentrocampisti").value = "8";
                realDomDoc.getElementById("etMassimoScambi").value = "3";
                realDomDoc.getElementById("etNoteMercato").value = "";
                realDomDoc.getElementById("cbMancataNulla").checked = true;
                realDomDoc.getElementById("cbInvisibiliSi").checked = true;
                realDomDoc.getElementById("cb442").checked = true;
                realDomDoc.getElementById("etNoteFormazione").value = "notes";

                const result = InsertTeamRules.produce(4);
                expect(result).toContain("<h2>4. Inserimento formazione");
                expect(result).toContain("<p>4.1. Le formazioni devono essere inserite entro 10 minuti");
                expect(result).toContain("<p>4.2. I moduli consentiti per le formazioni sono:</p><ul><li>4-4-2");
                expect(result).toContain("<p>4.3. Se la formazione, per qualsiasi motivo");
                expect(result).toContain("<p>4.4. La panchina dovrà avere la seguente struttura: 1P.");
                expect(result).toContain("<p>4.5. Sono ammesse le formazioni invisibili");
                expect(result).toContain("<p>4.6. notes");
            });
        });

        describe("tolerance tests", function () {
            it('tolerance value cannot be negative', () => {
                realDomDoc.getElementById("etTolleranza").value = "-1";
                try {
                    InsertTeamRules.estraiMinutiTolleranza();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Inserimento formazione");
                    expect(error.message).toContain("Tolleranza ritardo");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });

            it('tolerance value cannot be zero', () => {
                realDomDoc.getElementById("etTolleranza").value = "";
                try {
                    InsertTeamRules.estraiMinutiTolleranza();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Inserimento formazione");
                    expect(error.message).toContain("Tolleranza ritardo");
                    expect(error.message).toContain(FieldValidation.NO_ZERO_ERR);
                }
            });

            it('should generate correct toleranza text', () => {
                realDomDoc.getElementById("etTolleranza").value = "61";
                const result = InsertTeamRules.estraiMinutiTolleranza();
                expect(result).toContain("entro 61 minuti");
            });
        });

        describe("modules list tests", function () {
            it('should list only checked modules allowed', () => {
                realDomDoc.getElementById("cb442").checked = true;
                realDomDoc.getElementById("cb451").checked = true;
                realDomDoc.getElementById("cb433").checked = true;
                realDomDoc.getElementById("cb343").checked = false;

                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).toContain("4-5-1");
                expect(result).toContain("4-3-3");
                expect(result).not.toContain("3-4-3");
            });

            it('442_module_allowed_test', () => {
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
            });

            it('442_module_disallowed_test', () => {
                realDomDoc.getElementById("cb442").checked = false;
                realDomDoc.getElementById("cb451").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).not.toContain("4-4-2");
                expect(result).toContain("4-5-1");
            });

            it('433_module_allowed_test', () => {
                realDomDoc.getElementById("cb433").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-3-3");
            });

            it('433_module_disallowed_test', () => {
                realDomDoc.getElementById("cb433").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("4-3-3");
            });

            it('451_module_allowed_test', () => {
                realDomDoc.getElementById("cb451").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-5-1");
            });

            it('451_module_disallowed_test', () => {
                realDomDoc.getElementById("cb451").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("4-5-1");
            });

            it('343_module_allowed_test', () => {
                realDomDoc.getElementById("cb343").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("3-4-3");
            });

            it('343_module_disallowed_test', () => {
                realDomDoc.getElementById("cb343").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("3-4-3");
            });

            it('352_module_allowed_test', () => {
                realDomDoc.getElementById("cb352").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("3-5-2");
            });

            it('352_module_disallowed_test', () => {
                realDomDoc.getElementById("cb352").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("3-5-2");
            });

            it('532_module_allowed_test', () => {
                realDomDoc.getElementById("cb532").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("5-3-2");
            });

            it('532_module_disallowed_test', () => {
                realDomDoc.getElementById("cb532").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("5-3-2");
            });

            it('541_module_allowed_test', () => {
                realDomDoc.getElementById("cb541").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("5-4-1");
            });

            it('541_module_disallowed_test', () => {
                realDomDoc.getElementById("cb541").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("5-4-1");
            });

            it('631_module_allowed_test', () => {
                realDomDoc.getElementById("cb631").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("6-3-1");
            });

            it('631_module_disallowed_test', () => {
                realDomDoc.getElementById("cb631").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("6-3-1");
            });

            it('622_module_allowed_test', () => {
                realDomDoc.getElementById("cb622").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("6-2-2");
            });

            it('622_module_disallowed_test', () => {
                realDomDoc.getElementById("cb622").checked = false;
                realDomDoc.getElementById("cb442").checked = true;
                const result = InsertTeamRules.estraiModuliConsentiti();
                expect(result).toContain("4-4-2");
                expect(result).not.toContain("6-2-2");
            });

            it('at least a module should be inserted', () => {
                realDomDoc.getElementById("cb442").checked = false;
                realDomDoc.getElementById("cb433").checked = false;
                realDomDoc.getElementById("cb451").checked = false;
                realDomDoc.getElementById("cb343").checked = false;
                realDomDoc.getElementById("cb352").checked = false;
                realDomDoc.getElementById("cb532").checked = false;
                realDomDoc.getElementById("cb541").checked = false;
                realDomDoc.getElementById("cb631").checked = false;
                realDomDoc.getElementById("cb622").checked = false;

                try {
                    InsertTeamRules.estraiModuliConsentiti();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Inserimento formazione");
                    expect(error.message).toContain("Moduli supportati");
                    expect(error.message).toContain(FieldValidation.NO_EMPTY_ERR);
                }
            });
        });

        describe("no insert tests", function () {
            it('should describe formazione non inserita as nulla if cbMancataNulla is checked', () => {
                realDomDoc.getElementById("cbMancataNulla").checked = true;
                realDomDoc.getElementById("cbMancataPrecedente").checked = false;
                const result = InsertTeamRules.estraiGestioneFormazioneNonInserita();
                expect(result).toContain("formazione nulla");
            });

            it('last squad recovery if requested', () => {
                realDomDoc.getElementById("cbMancataNulla").checked = false;
                realDomDoc.getElementById("cbMancataPrecedente").checked = true;
                const result = InsertTeamRules.estraiGestioneFormazioneNonInserita();
                expect(result).toContain("verrà recuperata la formazione della giornata precedente");
            });
        });

        describe("structure tests", function () {
            it('should return the correct panchina structure', () => {
                realDomDoc.getElementById("etPanchina").value = "1P 2A";
                const result = InsertTeamRules.estraiStrutturaPanchina();
                expect(result).toContain("1P 2A");
            });
        });

        describe("hidden team tests", function () {
            it('testing ghost squad disabled', () => {
                realDomDoc.getElementById("cbInvisibiliSi").checked = false;
                const result = InsertTeamRules.estraiAbilitazioneFormazioniInvisibili();
                expect(result).toContain("Non sono ammesse le formazioni invisibili");
            });

            it('should say formazioni invisibili are allowed when checkbox is checked', () => {
                realDomDoc.getElementById("cbInvisibiliSi").checked = true;
                const result = InsertTeamRules.estraiAbilitazioneFormazioniInvisibili();
                expect(result).toContain("Sono ammesse le formazioni invisibili");
            });
        });

        describe("additional note tests", function () {
            it("not add rows for notes empty", function () {
                realDomDoc.getElementById("etNoteFormazione").value = "";

                const html = InsertTeamRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("");
            });

            it("correctly add rows for notes inserted", function () {
                realDomDoc.getElementById("etNoteFormazione").value = "hello1 hello2-hello3";

                const html = InsertTeamRules.estraiEventualiNoteAggiuntive(10);
                expect(html).toBe("<p>10.6. hello1 hello2-hello3</p>");
            });
        });
    });
}
