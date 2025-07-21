function runInsertTeamRuleTests() {
    describe('InsertTeamRules', () => {

        beforeEach(() => {
            realDomDoc.getElementById("etTolleranza").value = "10";
            realDomDoc.getElementById("etPanchina").value = "1P";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etMassimoScambi").value = "3";
            realDomDoc.getElementById("etNoteMercato").value = "";
        });

        it('should generate correct toleranza text', () => {
            realDomDoc.getElementById("etTolleranza").value = "61";
            const result = InsertTeamRules.estraiMinutiTolleranza();
            expect(result).toContain("entro 61 minuti");
        });

        it('should list only checked modules allowed', () => {
            const result = InsertTeamRules.estraiModuliConsentiti();
            expect(result).toContain("4-4-2");
            expect(result).toContain("4-5-1");
            expect(result).toContain("4-3-3");
            expect(result).not.toContain("3-3-4");
        });

        it('should describe formazione non inserita as nulla if cbMancataNulla is checked', () => {
            const result = InsertTeamRules.estraiGestioneFormazioneNonInserita();
            expect(result).toContain("formazione nulla");
        });

        it('should return the correct panchina structure', () => {
            realDomDoc.getElementById("etPanchina").value = "1P 2A";
            const result = InsertTeamRules.estraiStrutturaPanchina();
            expect(result).toContain("1P 2A");
        });

        it('should say formazioni invisibili are allowed when checkbox is checked', () => {
            const result = InsertTeamRules.estraiAbilitazioneFormazioniInvisibili();
            expect(result).toContain("Sono ammesse le formazioni invisibili");
        });

        it('should produce full InsertTeamRules section', () => {
            const result = InsertTeamRules.produce();
            expect(result).toContain("Inserimento formazione");
            expect(result).toContain("entro 10 minuti");
            expect(result).toContain("4-4-2");
            expect(result).toContain("formazione nulla");
            expect(result).toContain("1P");
            expect(result).toContain("formazioni invisibili");
        });
    });
}
