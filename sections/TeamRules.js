const TeamRules = {
    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, "Struttura rose");
        toReturn = toReturn + this.estraiNumeroGiocatoriRosa(sectionIndex);
        toReturn = toReturn + this.estraiAbilitazioneGiocatoriCondivisi(sectionIndex);
        return toReturn;
    },

    estraiNumeroGiocatoriRosa: function (sectionIndex) {
        var toReturn = "";
        let etPortieri = Utils.retrieveDomElement("etPortieri");
        let etDifensori = Utils.retrieveDomElement("etDifensori");
        let etCentrocampisti = Utils.retrieveDomElement("etCentrocampisti");
        let etAttaccanti = Utils.retrieveDomElement("etAttaccanti");

        toReturn = toReturn + Utils.addTextRow(sectionIndex, 1, "Le rose dovranno essere cosi composte:");
        toReturn = toReturn + etPortieri.value + " portieri";
        toReturn = toReturn + "<br>";
        toReturn = toReturn + etDifensori.value + " difensori";
        toReturn = toReturn + "<br>";
        toReturn = toReturn + etCentrocampisti.value + " centrocampisti";
        toReturn = toReturn + "<br>";
        toReturn = toReturn + etAttaccanti.value + " attaccanti";
        toReturn = toReturn + "<br>";
        return toReturn;
    },

    estraiAbilitazioneGiocatoriCondivisi: function (sectionIndex) {
        var toReturn = "";
        let cbCondivisiSi = Utils.retrieveDomElement("cbCondivisiSi");
        if (cbCondivisiSi.checked) {
            toReturn = "Le rose potranno avere giocatori condivisi (stessi giocatori per più squadre).";
        } else {
            toReturn = "Le rose NON potranno avere giocatori condivisi (stessi giocatori per più squadre).";
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    }
};