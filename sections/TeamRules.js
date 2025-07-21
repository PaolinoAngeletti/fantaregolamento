const TeamRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Struttura rose");
        toReturn = toReturn + this.estraiNumeroGiocatoriRosa();
        toReturn = toReturn + this.estraiAbilitazioneGiocatoriCondivisi();
        return toReturn;
    },

    estraiNumeroGiocatoriRosa: function () {
        var toReturn = "";
        let etPortieri = Utils.retrieveDomElement("etPortieri");
        let etDifensori = Utils.retrieveDomElement("etDifensori");
        let etCentrocampisti = Utils.retrieveDomElement("etCentrocampisti");
        let etAttaccanti = Utils.retrieveDomElement("etAttaccanti");

        toReturn = toReturn + Utils.addTextRow("Le rose dovranno essere cosi composte:");
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

    estraiAbilitazioneGiocatoriCondivisi: function () {
        var toReturn = "";
        let cbCondivisiSi = Utils.retrieveDomElement("cbCondivisiSi");
        if (cbCondivisiSi.checked) {
            toReturn = Utils.addTextRow("Le rose composte potranno avere giocatori condivisi (stessi giocatori per più squadre).");
        } else {
            toReturn = Utils.addTextRow("Le rose composte NON potranno avere giocatori condivisi (stessi giocatori per più squadre).");
        }
        return toReturn;
    }
};