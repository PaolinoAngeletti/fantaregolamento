const AccidentReleaseRules = {
    produce: function (sectionIndex) {
        var toReturn = Utils.addSectionTitle(sectionIndex, "Gestione infortuni e svincoli");
        toReturn = toReturn + this.estraiGestioneSvincoli(sectionIndex);
        toReturn = toReturn + this.estraiGestioneCessioniAltroCampionato(sectionIndex);
        toReturn = toReturn + this.estraiGestioneInfortuni(sectionIndex);
        toReturn = toReturn + this.estraiGestoneCovid(sectionIndex);
        toReturn = toReturn + this.estraiEventualiNoteAggiuntive(sectionIndex);
        return toReturn;
    },

    estraiGestioneSvincoli: function (sectionIndex) {
        var toReturn = "In caso di svincolo di giocatori acquistati in mercati precedenti, ";
        let cbNessunCredito = Utils.retrieveDomElement("cbSvincoloNessun");
        if (cbNessunCredito.checked) {
            toReturn = toReturn + "non verrà recuperato alcun credito.";
        } else {
            let cbUnCredito = Utils.retrieveDomElement("cbSvincoloUno");
            if (cbUnCredito.checked) {
                toReturn = toReturn + "la squadra riceverà un solo credito in ogni caso, solamente per permettere eventuali acquisti a quotazione uno di svincolati.";
            } else {
                let cbMeta = Utils.retrieveDomElement("cbSvincoloMeta");
                if (cbMeta.checked) {
                    toReturn = toReturn + "la squadra riceverà crediti pari alla metà della quotazione di acquisto.";
                } else {
                    let cbQuotazione = Utils.retrieveDomElement("cbSvincoloQuotazione");
                    if (cbQuotazione.checked) {
                        toReturn = toReturn + "la squadra riceverà crediti pari alla quotazione di acquisto.";
                    } else {
                        let cbSvincoloAttuale = Utils.retrieveDomElement("cbSvincoloAttuale");
                        if (cbSvincoloAttuale.checked) {
                            toReturn = toReturn + "la squadra riceverà crediti pari alla quotazione attuale del calciatore.";
                        } else {
                            let cbMedia = Utils.retrieveDomElement("cbSvincoloMedia");
                            if (cbMedia.checked) {
                                toReturn = toReturn + "la squadra riceverà un numero di crediti pari alla media tra la quotazione attuale del giocatore e il suo valore di acquisto. Esempio se la quotazione attuale è 50 e la spesa per l'acquisto è stata di 10, allora i crediti ricevuti saranno 30 (50 + 10 / 2)";
                            }
                        }
                    }
                }
            }
        }
        return Utils.addTextRow(sectionIndex, 1, toReturn);
    },

    estraiGestioneCessioniAltroCampionato: function (sectionIndex) {
        var toReturn = "Se, durante la competizione, un calciatore viene ceduto in altri campionati (siano essi internazionali e non), allora ";
        let cbPreMercatoSvincolo = Utils.retrieveDomElement("cbPreMercatoSvincolo");
        if (cbPreMercatoSvincolo.checked) {
            toReturn = toReturn + "verranno applicate le regole scelte per uno svincolo generico di calciatori.";
        } else {
            let cbPreMercatoPrestito = Utils.retrieveDomElement("cbPreMercatoPrestito");
            if (cbPreMercatoPrestito.checked) {
                toReturn = toReturn + "verrà prevista la possibilità di acquisire un calciatore svincolato fino alla prossima sessione di mercato.";
            } else {
                let cbPreMercatoQuotazioneIntera = Utils.retrieveDomElement("cbPreMercatoQuotazioneIntera");
                if (cbPreMercatoQuotazioneIntera.checked) {
                    toReturn = toReturn + "verranno recuperati i crediti spesi per il suo acquisto.";
                }
            }
        }
        return Utils.addTextRow(sectionIndex, 2, toReturn);
    },

    estraiGestioneInfortuni: function (sectionIndex) {
        var toReturn = "";
        let cbInfortunioNessunPrestito = Utils.retrieveDomElement("cbInfortunioNessun");
        if (cbInfortunioNessunPrestito.checked) {
            toReturn = "Se un calciatore subisce un infortunio, indipendentemente dal periodo di durata, NON ci saranno prestiti di nessun tipo. Il Fantacalcio si basa anche su fortuna e variabili non prevedibili, e gli infortuni appartengono a questa categoria.";
        } else {
            let cbInfortunioPrestito = Utils.retrieveDomElement("cbInfortunioPrestito");
            if (cbInfortunioPrestito.checked) {
                toReturn = "Se un calciatore subisce un infortunio con durata maggiore ai sei mesi, la squadra proprietaria avrà diritto ad un prestito di un giocatore svincolato fino alla prossima sessione di mercato. Nota che tale regola ha senso solo se mancano almeno dieci giornate, altrimenti anche un infortunio di poche settimane porterebbe il calciatore a concludere la stagione.";
            }
        }
        return Utils.addTextRow(sectionIndex, 3, toReturn);
    },

    estraiGestoneCovid: function (sectionIndex) {
        var toReturn = "";
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
                    toReturn = "In caso di positività Covid, verranno assegnati votazioni politiche con questo schema:<br>PORTIERI<br>Se tutti i portieri sono positivi, si accede ad 1 voto d'ufficio.<br>GIOCATORI DI MOVIMENTO<br>Se si hanno 3 calciatori positivi si può accedere ad un voto d’ufficio.<br>Se i calciatori positivi sono almeno 5, i voti d’ufficio a cui si può accedere diventano 2.<br>Ovviamente, il conteggio dei positivi va raggruppato per ruolo, e non per rosa completa.";
                }
            }
        }
        return Utils.addTextRow(sectionIndex, 4, toReturn);
    },

    estraiEventualiNoteAggiuntive: function (sectionIndex) {
        var toReturn = "";
        let etNote = Utils.retrieveDomElement("etNoteInfortuni");
        if (etNote != null) {
            var noteText = etNote.value;
            if (noteText.trim() !== "") {
                toReturn = Utils.addTextRow(sectionIndex, 5, Utils.resolveEscapes(noteText));
            }
        }
        return toReturn;
    }
};