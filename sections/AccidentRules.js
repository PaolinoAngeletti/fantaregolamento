const AccidentRules = {
    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiGestioneInfortuni());
        rules.push(this.estraiGestioneCovid());
        rules.push(this.estraiEventualiNoteAggiuntive());
        return Utils.buildRuleSection(sectionIndex, "Gestione infortuni", rules);
    },

    estraiGestioneInfortuni: function () {
        let toReturn = "";
        let cbInfortunioNessunPrestito = Utils.retrieveDomElement("cbInfortunioNessun");
        if (cbInfortunioNessunPrestito.checked) {
            toReturn = "Se un calciatore subisce un infortunio, indipendentemente dal periodo di durata, NON ci saranno prestiti di nessun tipo. Il Fantacalcio si basa anche su fortuna e variabili non prevedibili, e gli infortuni appartengono a questa categoria.";
        } else {
            let cbInfortunioPrestito = Utils.retrieveDomElement("cbInfortunioPrestito");
            if (cbInfortunioPrestito.checked) {
                toReturn = "Se un calciatore subisce un infortunio con durata maggiore ai sei mesi, la squadra proprietaria avrà diritto ad un prestito di un giocatore svincolato fino alla prossima sessione di mercato. Nota che tale regola ha senso solo se mancano almeno dieci giornate, altrimenti anche un infortunio di poche settimane porterebbe il calciatore a concludere la stagione.";
            }
        }
        return toReturn;
    },

    estraiGestioneCovid: function () {
        let toReturn = "";
        let cbCovidPolitico = Utils.retrieveDomElement("cbCovidPolitico");
        if (cbCovidPolitico.checked) {
            toReturn = "In caso di calciatore schierato in formazione risultante positivo al COVID-19, si accederà alla votazione politica.";
        } else {
            let cbCovidPanchina = Utils.retrieveDomElement("cbCovidPanchina");
            if (cbCovidPanchina.checked) {
                toReturn = "In caso di calciatore schierato in formazione risultante positivo al COVID-19, esso verrà semplicemente sostituito dal panchinaro in maniera classica. Nota che questa situazione può essere però pericolosa in caso di positività multiple.";
            } else {
                let cbCovidScaglioni = Utils.retrieveDomElement("cbCovidScaglioni");
                if (cbCovidScaglioni.checked) {
                    toReturn = "In caso di positività Covid, verranno assegnati votazioni politiche con questo schema: " +
                        "PORTIERI: Se tutti i portieri sono positivi, si accede ad 1 voto d'ufficio. " +
                        "GIOCATORI DI MOVIMENTO: Se si hanno 3 calciatori positivi si può accedere a un voto d’ufficio. " +
                        "Se i calciatori positivi sono almeno 5, i voti d’ufficio a cui si può accedere diventano 2. " +
                        "Ovviamente, il conteggio dei positivi va raggruppato per ruolo, e non per rosa completa.";
                }
            }
        }
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        return Utils.retrieveAdditionalNotes("etNoteInfortuni");
    }
};