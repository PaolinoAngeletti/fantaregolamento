function runTeamRulesTests() {
    describe("TeamRules", function () {
        beforeEach(function () {
            realDomDoc.getElementById("etPortieri").value = "3";
            realDomDoc.getElementById("etDifensori").value = "8";
            realDomDoc.getElementById("etCentrocampisti").value = "8";
            realDomDoc.getElementById("etAttaccanti").value = "6";
        });

        it("correctly produces squad structure with shared players enabled", function () {
            realDomDoc.getElementById("cbCondivisiSi").checked = true;

            const html = TeamRules.produce();

            expect(html).toContain("Struttura rose");
            expect(html).toContain("3 portieri");
            expect(html).toContain("8 difensori");
            expect(html).toContain("8 centrocampisti");
            expect(html).toContain("6 attaccanti");
            expect(html).toContain("potranno avere giocatori condivisi");
        });

        it("correctly produces squad structure with shared players disabled", function () {
            realDomDoc.getElementById("cbCondivisiSi").checked = false;

            const html = TeamRules.produce();

            expect(html).toContain("NON potranno avere giocatori condivisi");
        });
    });
}
