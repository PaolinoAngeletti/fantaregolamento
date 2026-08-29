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

    selectCheckbox(checkboxId) {
        let element = this.retrieveDomElement(checkboxId);
        if (element) {
            element.click();
        }
    },

    retrieveAdditionalNotes: function (domElement) {
        let toReturn = "";
        let additionalNotes = Utils.retrieveDomElement(domElement);
        if (additionalNotes != null) {
            let value = additionalNotes.value;
            if (this.isValidString(value)) {
                toReturn = value;
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
        let ruleIndex = 1;
        if (rulesList) {
            toReturn.push(this.addSectionTitle(sectionIndex, sectionTitle));
            rulesList.forEach(rule => {
                if (this.isValidString(rule)) {
                    toReturn.push(this.addTextRow(sectionIndex, ruleIndex++, rule))
                }
            })
        }
        return toReturn;
    },

    getSelectedRadioId(formId) {
        const form = this.retrieveDomElement(formId);
        if (!form) {
            return null;
        }

        const selected = form.querySelector('input[type="radio"]:checked');
        return selected ? selected.id : null;
    }
};