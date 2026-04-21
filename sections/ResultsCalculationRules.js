const ResultCalculationRules = {

    sectionName: "Calcolo giornate",

    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiPunteggiVittoriaPareggio());
        rules.push(this.estraiBonusMalus());
        rules.push(this.estraiLarghezzaSoglie());
        rules.push(this.estraiAbilitazioneFattoreCampo());
        rules.push(this.estraiGestioneRinvio());
        rules.push(this.estraiGestioneModificatore());
        return Utils.buildRuleSection(sectionIndex, this.sectionName, rules);
    },

    estraiPunteggiVittoriaPareggio: function () {
        let etVittoria = Utils.retrieveDomElement("etVittoria");
        let etPareggio = Utils.retrieveDomElement("etPareggio");
        let etSconfitta = Utils.retrieveDomElement("etSconfitta");

        let toReturn = "I punteggi rilevati da una singola partita saranno: \n\n";
        toReturn = toReturn + "Vittoria: " + etVittoria.value + " punti.\n";
        toReturn = toReturn + "Pareggio: " + etPareggio.value + " punti.\n";
        toReturn = toReturn + "Sconfitta: " + etSconfitta.value + " punti.";
        return toReturn;
    },

    estraiBonusMalus: function () {
        let toReturn = "I bonus e malus previsti dalla competizione saranno: \n\n";
        toReturn = this.verificaSingoloBonus(toReturn, "etGol", "Gol segnato");
        toReturn = this.verificaSingoloBonus(toReturn, "etRigore", "Rigore segnato");
        toReturn = this.verificaSingoloBonus(toReturn, "etRigoreSbagliato", "Rigore sbagliato");
        toReturn = this.verificaSingoloBonus(toReturn, "etAssist", "Assist");
        toReturn = this.verificaSingoloBonus(toReturn, "etCleanSheet", "Porta inviolata");
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
        toReturn = toReturn + descrizione + ": " + etElemento.value + " punti.\n";
        return toReturn;
    },

    estraiLarghezzaSoglie: function () {
        let etSoglie = Utils.retrieveDomElement("etSoglie");
        let soglieValue = etSoglie.value;
        FieldValidation.validateInt(this.sectionName, "Soglie gol", soglieValue, false, false);
        return "Le soglie per il calcolo del numero di gol saranno ciascuna da " + soglieValue + " punti.";
    },

    estraiAbilitazioneFattoreCampo: function () {
        let toReturn;
        let etFattoreSi = Utils.retrieveDomElement("cbFattoreSi");
        if (etFattoreSi.checked) {
            toReturn = "E' previsto un fattore campo, ossia giocare in casa oppure fuori casa ha influenza sul calcolo della giornata.";
        } else {
            toReturn = "Non verrà applicato mai nessun fattore campo, ossia giocare in casa oppure fuori casa non ha influenza sul calcolo della giornata.";
        }
        return toReturn;
    },

    estraiGestioneRinvio: function () {
        let toReturn = "";
        let cbRinvioMai = Utils.retrieveDomElement("cbRinvioMai");
        if (cbRinvioMai.checked) {
            toReturn = "Nel caso in cui una o più partite vengano rinviate per qualsiasi motivo, NON si attenderà MAI la sua conclusione, ma si accederà sempre alle votazioni politiche.";
        } else {
            let cbRinvioProssima = Utils.retrieveDomElement("cbRinvioProssima");
            if (cbRinvioProssima.checked) {
                toReturn = "Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che essa venga recuperata al massimo fino alla prossima giornata, dopodichè si ricorrerà alle votazioni politiche. Questa decisione viene presa nell’ottica di evitare accavvallamenti di calcoli giornate, che, in caso di coppe aggiuntive, porterebbero ad ulteriori difficoltà di gestione.";
            } else {
                let cbRinvioPolitico = Utils.retrieveDomElement("cbRinvioPolitico");
                if (cbRinvioPolitico.checked) {
                    toReturn = "Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, accederà in ogni caso alla votazione politica.";
                } else {
                    let cbRinvioPanchina = Utils.retrieveDomElement("cbRinvioPanchina");
                    if (cbRinvioPanchina.checked) {
                        toReturn = "Se una partita, per qualsiasi motivo, viene rinviata, si attenderà che la partita venga rigiocata, anche se a mesi di distanza. Nel caso in cui però un giocatore non sarà abilitato a recuperare la partita, entrerà in ogni caso il panchinaro previsto.";
                    }
                }
            }
        }
        return toReturn;
    },

    estraiGestioneModificatore: function () {
        let toReturn = "";
        let cbModificatoreNo = Utils.retrieveDomElement("cbModificatoreNo");
        if (cbModificatoreNo.checked) {
            toReturn = "Il calcolo della giornata non prevede nessun modificatore di difesa";
        } else {
            let cbModificatoreSi = Utils.retrieveDomElement("cbModificatoreSi");
            if (cbModificatoreSi.checked) {
                toReturn = "Il calcolo della giornata prevede il modificatore di difesa, con i seguenti scaglioni: \n\n";
                toReturn = this.verificaSingoloBonus(toReturn, "et0599", "Da 0 punti a 5,99 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et6624", "Da 6 punti a 6,24 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et625649", "Da 6,25 punti a 6,49 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et65674", "Da 6,5 punti a 6,74 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et675699", "Da 6,75 punti a 6,99 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et7724", "Da 7 punti a 7,24 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et725749", "Da 7,25 punti a 7,49 punti");
                toReturn = this.verificaSingoloBonus(toReturn, "et75", "Da 7,5 a salire");
            }
        }
        return toReturn;
    }
};