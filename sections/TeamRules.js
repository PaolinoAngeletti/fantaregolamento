const TeamRules = {
    produce: function () {
        var toReturn = creaNuovoTitoloParagrafo("Struttura rose");
        toReturn = toReturn + this.estraiNumeroGiocatoriRosa();
        toReturn = toReturn + this.estraiAbilitazioneGiocatoriCondivisi();
        return toReturn;
    },

    estraiNumeroGiocatoriRosa: function () {
        var toReturn = "";
        let etPortieri = estraiElementoDom("etPortieri");
        let etDifensori = estraiElementoDom("etDifensori");
        let etCentrocampisti = estraiElementoDom("etCentrocampisti");
        let etAttaccanti = estraiElementoDom("etAttaccanti");
        toReturn = toReturn + aggiungiRigaTesto("Le rose dovranno essere cosi composte:");
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
        let cbCondivisiSi = estraiElementoDom("cbCondivisiSi");
        if (cbCondivisiSi.checked) {
            toReturn = aggiungiRigaTesto("Le rose composte potranno avere giocatori condivisi (stessi giocatori per più squadre).");
        } else {
            toReturn = aggiungiRigaTesto("Le rose composte NON potranno avere giocatori condivisi (stessi giocatori per più squadre).");
        }
        return toReturn;
    }
};