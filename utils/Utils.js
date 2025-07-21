const Utils = {
    retrieveDomElement: function (elementId) {
        return document.getElementById(elementId);
    },

    addSectionTitle: function (title) {
        return "<h2>" + title + "</h2>";
    },

    addTextRow: function (text) {
        return "<p>" + text + "</p>";
    },

    resolveEscapes: function (stringWithEscapes) {
        stringWithEscapes.replace(/newline/g, "\n");
        return stringWithEscapes.replace(/\n/g, "<br>");
    },

    isValidString: function (string) {
        return string && string.trim() !== "";
    }
};