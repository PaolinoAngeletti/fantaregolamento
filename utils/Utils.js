const Utils = {
    retrieveDomElement: function (elementId) {
        return document.getElementById(elementId);
    },

    addSectionTitle: function (index = undefined, title) {
        return "<h2>" + index + ". " + title + "</h2>";
    },

    addTextRow: function (sectionIndex = null, ruleIndex = null, text) {
        return "<p>" + sectionIndex + "." + ruleIndex + ". " + text + "</p>";
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

    buildRuleSection: function (sectionIndex, sectionTitle, rulesList) {
        var toReturn = "";
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