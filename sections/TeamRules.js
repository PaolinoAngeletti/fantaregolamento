const TeamRules = {
    sectionName: "Struttura rose",

    produce: function (sectionIndex) {
        let toReturn = [];
        toReturn.push(Utils.addSectionTitle(sectionIndex, this.sectionName));
        toReturn.push(this.estraiNumeroGiocatoriRosa(sectionIndex));
        toReturn.push(this.estraiAbilitazioneGiocatoriCondivisi(sectionIndex));
        return toReturn;
    },

    estraiNumeroGiocatoriRosa: function (sectionIndex) {
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

        let toReturn = "Le rose dovranno essere cosi composte: ";
        toReturn = toReturn + goalkeeperNumber + " portieri, ";
        toReturn = toReturn + defensorNumber + " difensori, ";
        toReturn = toReturn + midfieldersNumber + " centrocampisti, ";
        toReturn = toReturn + attackersNumber + " attaccanti.";
        return Utils.addTextRow(sectionIndex, 1, toReturn);
    },

    estraiAbilitazioneGiocatoriCondivisi: function (sectionIndex) {
        let toReturn;
        let cbCondivisiSi = Utils.retrieveDomElement("cbCondivisiSi");
        if (cbCondivisiSi.checked) {
            toReturn = "Le rose potranno avere giocatori condivisi (stessi giocatori per più squadre).";
        } else {
            toReturn = "Le rose NON potranno avere giocatori condivisi (stessi giocatori per più squadre).";
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    }
};