function runSubstituionRulesTests() {
    describe('SubstitutionRules', () => {

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

        describe('produce', () => {
            it('should produce full substitution section', () => {
                realDomDoc.getElementById('cbNessunLimite').checked = true;
                realDomDoc.getElementById('cbAmmIgnorata').checked = true;

                const result = SubstitutionRules.produce();
                expect(result).toContain("Gestione sostituzioni");
                expect(result).toContain("nessun limite");
                expect(result).toContain("quella ammonizione non avrà alcun impatto");
            });
        });
    });

}