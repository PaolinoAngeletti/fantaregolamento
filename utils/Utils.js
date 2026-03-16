const Utils = {

    retrieveDomElement: function (elementId) {
        return document.getElementById(elementId);
    },

    addSectionTitle: function (index = undefined, title) {
        return this.addText(index + ". " + title, "h2");
    },

    addTextRow: function (sectionIndex = null, ruleIndex = null, text) {
        return this.addText((sectionIndex + "." + ruleIndex + ". " + text), "paragraph");
    },

    addText: function (text, type) {
        return {
            "text": text, "type": type
        }
    },

    resolveEscapes: function (stringWithEscapes) {
        stringWithEscapes.replace(/newline/g, "\n");
        return stringWithEscapes.replace(/\n/g, "<br>");
    },

    isValidString: function (string) {
        return string != null && string.trim() !== "";
    },

    showDomElement: function (elementId) {
        this.setElementDisplay(elementId, "block");
    },

    setElementDisplay: function (elementId, displayValue) {
        this.retrieveDomElement(elementId).style.display = displayValue;
    },

    setElementVisibility: function (elementId, toShow) {
        if (toShow) {
            Utils.showDomElement(elementId);
        } else {
            Utils.setElementDisplay(elementId, "none");
        }
    },

    retrieveAdditionalNotes: function (domElement) {
        let toReturn = "";
        let additionalNotes = Utils.retrieveDomElement(domElement);
        if (additionalNotes != null) {
            let testoNote = additionalNotes.value;
            if (testoNote.trim() !== "") {
                toReturn = this.resolveEscapes(testoNote);
            }
        }
        return toReturn;
    },

    buildRuleSection: function (sectionIndex, sectionTitle, rulesList) {
        let toReturn = "";
        if (rulesList) {
            toReturn = this.addSectionTitle(sectionIndex, sectionTitle);
            rulesList.forEach((element, index) => {
                if (this.isValidString(element)) {
                    toReturn += this.addTextRow(sectionIndex, index + 1, element);
                }
            });
        }
        return toReturn;
    }
};