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

    setElementDisplay: function (elementId, displayValue) {
        this.retrieveDomElement(elementId).style.display = displayValue;
    }
};