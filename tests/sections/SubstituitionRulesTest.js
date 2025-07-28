function runSubstituionRulesTests() {
    describe('SubstitutionRules', () => {
        describe('produce', () => {
            it('should produce full substitution section', () => {
                realDomDoc.getElementById('cbNessunLimite').checked = true;
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;
                realDomDoc.getElementById("etNoteSostituzioni").value = "notes";

                const result = SubstitutionRules.produce(3);
                expect(result).toContain("<h2>3. Gestione sostituzioni");
                expect(result).toContain("<p>3.1. Non vi è nessun limite sul numero di sostituzioni");
                expect(result).toContain("<p>3.2. Nel caso in cui un giocatore SV");
                expect(result).toContain("<p>3.3. notes");
            });
        });

        describe('estraiNumeroCambi', () => {
            it('should return text for no limit substitutions', () => {
                realDomDoc.getElementById('cbNessunLimite').checked = true;

                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("nessun limite");
            });

            it('should return text for 3 substitutions', () => {
                realDomDoc.getElementById('cbTreCambi').checked = true;

                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("3 sostituzioni");
            });

            it('should return text for 5 substitutions', () => {
                realDomDoc.getElementById('cbCinqueCambi').checked = true;

                const result = SubstitutionRules.estraiNumeroCambi();
                expect(result).toContain("5 sostituzioni");
            });
        });

        describe('estraiGestioneAmmonizioneSenzaVoto', () => {
            it('should return text for ignored ammonizione', () => {
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;

                const result = SubstitutionRules.estraiGestioneAmmonizioneSenzaVoto();
                expect(result).toContain("quella ammonizione non avrà alcun impatto");
            });

            it('should return text for ammonizione scalata', () => {
                realDomDoc.getElementById('cbAmmScalata').checked = true;

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
                expect(html).toBe("<p>8.3. hello1 hello2-hello3</p>");
            });
        });
    });

}