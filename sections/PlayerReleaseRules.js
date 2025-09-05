const PlayerReleaseRules = {
    produce: function (sectionIndex) {
        let rules = [];
        rules.push(this.estraiGestioneSvincoliMercato());
        rules.push(this.estraiGestioneSvincoli());
        rules.push(this.estraiGestioneCessioniAltroCampionato());
        rules.push(this.estraiEventualiNoteAggiuntive());
        return Utils.buildRuleSection(sectionIndex, "Gestione svincoli", rules);
    },

    estraiGestioneSvincoliMercato: function (sectionIndex) {
        var toReturn = "";
        var campoSvincolo = Utils.retrieveDomElement("cbSvincoloAcquisto");
        if (campoSvincolo.checked) {
            toReturn = "Prevista l'applicazione dello svincolo su acquisto, ossia ogni partecipante dovrà comunicare lo svincolo solamente dopo aver eseguito un acquisto. Per la gestione del singolo svincolo invece vi è una regola specifica.";
        } else {
            campoSvincolo = Utils.retrieveDomElement("cbSvincoloInizioSi");
            if (campoSvincolo.checked) {
                toReturn = "Ad ogni sessione di mercato, una squadra interessata ad acquistare dovrà comunicare in anticipo i giocatori da svincolare, potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso.";
            } else {
                campoSvincolo = Utils.retrieveDomElement("cbSvincoloInizioNo");
                if (campoSvincolo.checked) {
                    toReturn = "Ad ogni sessione di mercato, una squadra interessata ad acquistare dovrà comunicare in anticipo i giocatori da svincolare, NON potendo poi però partecipare all'asta anche di giocatori svincolati da se stesso.";
                }
            }
        }
        return toReturn;
    },

    estraiGestioneSvincoli: function () {
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
        return toReturn;
    },

    estraiGestioneCessioniAltroCampionato: function () {
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
        return toReturn;
    },

    estraiEventualiNoteAggiuntive: function () {
        var toReturn = "";
        let etNote = Utils.retrieveDomElement("etNoteSvincoli");
        if (etNote != null) {
            var noteText = etNote.value;
            if (noteText.trim() !== "") {
                toReturn = Utils.resolveEscapes(noteText);
            }
        }
        return toReturn;
    }
};