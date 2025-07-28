const FieldValidation = {
    NO_NEGATIVE_ERR: "Valori negativi (< 0) non permessi",
    NO_ZERO_ERR: "Valore zero non permesso",
    EXCEED_MAX_ERR: "Valore massimo consentito: ",
    SHOULD_BE_MINOR: "deve essere minore o uguale a quello del campo: ",
    NO_EMPTY_ERR: "Non sono ammessi valori vuoti",

    validateInt: function (sectionName, fieldName, value, negativeAllowed = false, zeroAllowed = true, maxAllowed = null) {
        var errorMessage = null;
        if (!negativeAllowed && value < 0) {
            errorMessage = this.NO_NEGATIVE_ERR;
        } else if (!zeroAllowed && value == 0) {
            errorMessage = this.NO_ZERO_ERR
        } else if (maxAllowed != null && value > maxAllowed) {
            errorMessage = this.EXCEED_MAX_ERR + "[" + maxAllowed + "]";
        }

        if (Utils.isValidString(errorMessage)) {
            throw new FieldValidationException(sectionName, fieldName, errorMessage);
        }
    },

    compareMinorToMajor: function (sectionName, fieldNameMinor, fieldNameMajor, shouldBeMinor, shouldBeMajor) {
        if (shouldBeMinor > shouldBeMajor) {
            throw new FieldValidationException(sectionName, null, "Il valore del campo: '" + fieldNameMinor + "' " + this.SHOULD_BE_MINOR + "'" + fieldNameMajor + "'");
        }
    },

    isValidString: function (sectionName, fieldName, string) {
        if (!Utils.isValidString(string)) {
            throw new FieldValidationException(sectionName, fieldName, this.NO_EMPTY_ERR);
        }
    }
};