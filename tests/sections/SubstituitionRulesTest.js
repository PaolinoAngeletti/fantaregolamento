function runSubstitutionRulesTests() {
    describe('SubstitutionRules', () => {

        describe('produce', () => {
            it('should produce full substitution section', () => {
                realDomDoc.getElementById('etNumSostituzioni').value = "0";
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;
                realDomDoc.getElementById("etNoteSostituzioni").value = "notes";

                const result = SubstitutionRules.produce(3);
                expect(result[0].text).toContain("3. Gestione sostituzioni");
                expect(result[0].type).toBe("h2");
                expect(result[1].text).toContain("3.1. Non vi è nessun limite sul numero di sostituzioni");
                expect(result[1].type).toBe("paragraph");
                expect(result[2].text).toContain("3.2. Nel caso in cui un giocatore SV");
                expect(result[2].type).toBe("paragraph");
                expect(result[3].text).toContain("3.3. notes");
                expect(result[3].type).toBe("paragraph");
            });
        });

        describe('validate substitutions number value', () => {
            it('should return text for no limit substitutions', () => {
                realDomDoc.getElementById('etNumSostituzioni').value = "0";
                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("nessun limite");
            });

            it('should return text for 3 substitutions', () => {
                realDomDoc.getElementById('etNumSostituzioni').value = "3";
                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("3 sostituzioni");
            });

            it('should return text for 5 substitutions', () => {
                realDomDoc.getElementById('etNumSostituzioni').value = "5";
                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("5 sostituzioni");
            });

            it("value cannot be negative", function () {
                realDomDoc.getElementById('etNumSostituzioni').value = "-1";
                try {
                    SubstitutionRules.estraiNumeroCambi();
                    fail("Should be thrown an exception");
                } catch (error) {
                    expect(error.message).toContain("Gestione sostituzioni");
                    expect(error.message).toContain("Numero sostituzioni");
                    expect(error.message).toContain(FieldValidation.NO_NEGATIVE_ERR);
                }
            });
        });

        describe('estraiGestioneAmmonizioneSenzaVoto', () => {
            it('should return text for ignored ammonizione', () => {
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;

                const result = SubstitutionRules.estraiGestioneAmmonizioneSenzaVoto();
                expect(result).toContain("quella ammonizione non avrà alcun impatto");
            });

            it('should return text for ammonizione scalata', () => {
                realDomDoc.getElementById('cbAmmCascade').checked = true;
                const result = SubstitutionRules.estraiGestioneAmmonizioneSenzaVoto();
                expect(result).toContain("verrà riflesso sul giocatore subentrato");
            });
        });

        describe("additional note tests", function () {
            it("not add rows for notes empty", function () {
                realDomDoc.getElementById("etNoteSostituzioni").value = "";
                const html = SubstitutionRules.estraiEventualiNoteAggiuntive();
                expect(html).toBe("");
            });

            it("correctly add rows for notes inserted", function () {
                realDomDoc.getElementById("etNoteSostituzioni").value = "hello1 hello2-hello3";
                const html = SubstitutionRules.estraiEventualiNoteAggiuntive(8);
                expect(html).toBe("hello1 hello2-hello3");
            });
        });
    });

}