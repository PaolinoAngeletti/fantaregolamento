const ResultCalculationRules = {
    produce: function () {
        var toReturn = Utils.addSectionTitle("Calcolo giornate");
        toReturn = toReturn + this.estraiPunteggiVittoriaPareggio();
        toReturn = toReturn + this.estraiBonusMalus();
        toReturn = toReturn + this.estraiLarghezzaSoglie();
        toReturn = toReturn + this.estraiAbilitazioneFattoreCampo();
        toReturn = toReturn + this.estraiGestioneRinvio();
        toReturn = toReturn + this.estraiGestioneModificatore();
        return toReturn;
    },

    estraiPunteggiVittoriaPareggio: function () {
        var toReturn = "";
        let etVittoria = Utils.retrieveDomElement("etVittoria");
        let etPareggio = Utils.retrieveDomElement("etPareggio");
        let etSconfitta = Utils.retrieveDomElement("etSconfitta");
        toReturn = toReturn + Utils.addTextRow("I punteggi rilevati da una singola partita saranno:");
        toReturn = toReturn + "Vittoria: " + etVittoria.value + " punti.<br>";
        toReturn = toReturn + "Pareggio: " + etPareggio.value + " punti.<br>";
        toReturn = toReturn + "Sconfitta: " + etSconfitta.value + " punti.<br>";
        return toReturn;
    },

    estraiBonusMalus: function () {
        var toReturn = "";
        toReturn = toReturn + Utils.addTextRow("I bonus e malus previsti dalla competizione saranno:");
        toReturn = this.verificaSingoloBonus(toReturn, "etGol", "Gol segnato");
        toReturn = this.verificaSingoloBonus(toReturn, "etRigore", "Rigore segnato");
        toReturn = this.verificaSingoloBonus(toReturn, "etRigoreSbagliato", "Rigore sbagliato");
        toReturn = this.verificaSingoloBonus(toReturn, "etAssist", "Assist");
        toReturn = this.verificaSingoloBonus(toReturn, "etCleansheet", "Porta inviolata");
        toReturn = this.verificaSingoloBonus(toReturn, "etGolSubito", "Gol subito (portiere)");
        toReturn = this.verificaSingoloBonus(toReturn, "etRigoreParato", "Rigore parato (portiere)");
        toReturn = this.verificaSingoloBonus(toReturn, "etAmmonizione", "Ammonizione");
        toReturn = this.verificaSingoloBonus(toReturn, "etEspulsione", "Espulsione");
        toReturn = this.verificaSingoloBonus(toReturn, "etAutogol", "Autogol");
        toReturn = this.verificaSingoloBonus(toReturn, "etGolVittoria", "Gol decisivo per la vittoria");
        toReturn = this.verificaSingoloBonus(toReturn, "etGolPareggio", "Gol decisivo per il pareggio");
        return toReturn;
    },

    verificaSingoloBonus: function (toReturn, idBonus, descrizione) {
        let etElemento = Utils.retrieveDomElement(idBonus);
        toReturn = toReturn + descrizione + ": " + etElemento.value + " punti.<br>";
        return toReturn;
    },

    estraiLarghezzaSoglie: function () {
        var toReturn = "";
        let etSoglie = Utils.retrieveDomElement("etSoglie");
        toReturn = Utils.addTextRow("Le soglie per il calcolo del numero di gol saranno ciascuna da " + etSoglie.value + " punti.");
        return toReturn;
    },

    estraiAbilitazioneFattoreCampo: function () {
        var toReturn = "";
        let etFattoreSi = Utils.retrieveDomElement("cbFattoreSi");
        if (etFattoreSi.checked) {
            toReturn = Utils.addTextRow("E' previsto un fattore campo, ossia giocare in casa oppure fuori casa ha influenza sul calcolo della giornata.");
        } else {
            toReturn = Utils.addTextRow("Non verrà applicato mai nessun fattore campo, ossia giocare in casa oppure fuori casa non ha influenza sul calcolo della giornata.");
        }
        return toReturn;
    },

    estraiGestioneRinvio: function () {
        var toReturn = "";
        let cbRinvioMai = Utils.retrieveDomElement("cbRinvioMai");
        if (cbRinvioMai.checked) {
            toReturn = Utils.addTextRow("Nel caso in cui una o più partite vengano rinviate per qualsiasi motivo, NON si attenderà MAI la sua conclusione, ma si accederà sempre alle votazioni politiche.");
        } else {
            let cbRinvioProssima = Utils.retrieveDomElement("cbRinvioProssima");
            if (cbRinvioProssima.checked) {
                toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che essa venga recuperata al massimo fino alla prossima giornata, dopodichè si ricorrerà alle votazioni politiche. Questa decisione viene presa nell’ottica di evitare accavvallamenti di calcoli giornate, che, in caso di coppe aggiuntive, porterebbero ad ulteriori difficoltà di gestione.");
            } else {
                let cbRinvioPolitico = Utils.retrieveDomElement("cbRinvioPolitico");
                if (cbRinvioPolitico.checked) {
                    toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, accederà in ogni caso alla votazione politica.");
                } else {
                    let cbRinvioPanchina = Utils.retrieveDomElement("cbRinvioPanchina");
                    if (cbRinvioPanchina.checked) {
                        toReturn = Utils.addTextRow("Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, entrerà in ogni caso il panchinaro previsto.");
                    }
                }
            }
        }
        return toReturn;
    },

    estraiGestioneModificatore: function () {
        var toReturn = "";
        let cbModificatoreNo = Utils.retrieveDomElement("cbModificatoreNo");
        if (cbModificatoreNo.checked) {
            toReturn = Utils.addTextRow("Il calcolo della giornata non prevede nessun modificatore di difesa");
        } else {
            let cbModificatoreSi = Utils.retrieveDomElement("cbModificatoreSi");
            if (cbModificatoreSi.checked) {
                toReturn = Utils.addTextRow("Il calcolo della giornata prevede il modificatore di difesa, con i seguenti scaglioni:");
                toReturn = verificaSingoloBonus(toReturn, "et0599", "Da 0 punti a 5,99 punti");
                toReturn = verificaSingoloBonus(toReturn, "et6624", "Da 6 punti a 6,24 punti");
                toReturn = verificaSingoloBonus(toReturn, "et625649", "Da 6,25 punti a 6,49 punti");
                toReturn = verificaSingoloBonus(toReturn, "et65674", "Da 6,5 punti a 6,74 punti");
                toReturn = verificaSingoloBonus(toReturn, "et675699", "Da 6,75 punti a 6,99 punti");
                toReturn = verificaSingoloBonus(toReturn, "et7724", "Da 7 punti a 7,24 punti");
                toReturn = verificaSingoloBonus(toReturn, "et725749", "Da 7,25 punti a 7,49 punti");
                toReturn = verificaSingoloBonus(toReturn, "et75", "Da 7,5 a salire");
            }
        }
        return toReturn;
    }
};