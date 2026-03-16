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

    /**
     * Builds a section with a title and a list of rules.
     *
     * This function takes a section index, a section title, and a list of strings representing
     * the rules. It validates each rule string and converts them into objects suitable for
     * further processing or rendering.
     *
     * @param {number} sectionIndex - The index of the section (used for numbering).
     * @param {string} sectionTitle - The title of the section.
     * @param {string[]} rulesList - An array of strings, each representing a rule. Invalid or empty strings are ignored.
     * @returns {Object[]} An array of objects representing the section and its rules. The first element is the section title object, followed by rule objects.
     */
    buildRuleSection: function (sectionIndex, sectionTitle, rulesList) {
        let toReturn = [];
        if (rulesList) {
            toReturn.push(this.addSectionTitle(sectionIndex, sectionTitle));
            rulesList.forEach((element, index) => {
                if (this.isValidString(element)) {
                    toReturn.push(this.addTextRow(sectionIndex, index + 1, element))
                }
            });
        }
        return toReturn;
    }
};