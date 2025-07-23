class FieldValidationException extends Error {
    constructor(sectionName, fieldName, message) {
        var entireMessage = "";
        if(Utils.isValidString(sectionName)){
            entireMessage = "Sezione: " + sectionName + "<br>";
        }
        if(Utils.isValidString(fieldName)){
            entireMessage = entireMessage + "Campo: " + fieldName + "<br>";
        }
        entireMessage = entireMessage + message;

        super(entireMessage);
        this.name = "FieldValidationException";
    }
}