const TeamRules = {
    sectionName: "Struttura rose",

    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, this.sectionName);
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

        let goalkeeperNumber = etPortieri.value;
        let defensorNumber = etDifensori.value;
        let midfieldersNumber = etCentrocampisti.value;
        let attackersNumber = etAttaccanti.value;
        FieldValidation.validateInt(this.sectionName, "Portieri", goalkeeperNumber, false, false);
        FieldValidation.validateInt(this.sectionName, "Difensori", defensorNumber, false, false);
        FieldValidation.validateInt(this.sectionName, "Centrocampisti", midfieldersNumber, false, false);
        FieldValidation.validateInt(this.sectionName, "Attaccanti", attackersNumber, false, false);

        toReturn = toReturn + Utils.addTextRow(sectionIndex, 1, "Le rose dovranno essere cosi composte:");
        toReturn = toReturn + goalkeeperNumber + " portieri<br>";
        toReturn = toReturn + defensorNumber + " difensori<br>";
        toReturn = toReturn + midfieldersNumber + " centrocampisti<br>";
        toReturn = toReturn + attackersNumber + " attaccanti<br>";
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