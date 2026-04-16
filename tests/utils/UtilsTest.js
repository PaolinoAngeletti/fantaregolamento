function runUtilsTests() {
    describe("Utils", function () {

        describe("retrieveDomElement", function () {
            beforeEach(function () {
                let input = realDomDoc.createElement("input");
                input.id = "testElement";
                input.value = "testValue";
                realDomDoc.body.appendChild(input);
            });

            afterEach(function () {
                let el = document.getElementById("testElement");
                if (el) el.remove();
            });

            it("should return the element with the given ID", function () {
                let result = Utils.retrieveDomElement("testElement");
                expect(result).not.toBeNull();
                expect(result.value).toBe("testValue");
            });
        });

        describe("addSectionTitle", function () {
            it("should wrap the title in an h2 tag", function () {
                let result = Utils.addSectionTitle(23, "Test Title");
                expect(result.text).toBe("23. Test Title");
                expect(result.type).toBe("h2");
            });
        });

        describe("addTextRow", function () {
            it("should wrap the text in a p tag", function () {
                let result = Utils.addTextRow(10, 4, "Sample text");
                expect(result.text).toBe("10.4. Sample text");
                expect(result.type).toBe("paragraph");
            });
        });

        describe("isValidString", function () {
            it("should return false for null", function () {
                expect(Utils.isValidString(null)).toBeFalse();
            });

            it("should return false for undefined", function () {
                expect(Utils.isValidString(undefined)).toBeFalse();
            });

            it("should return false for empty string", function () {
                expect(Utils.isValidString("")).toBeFalse();
            });

            it("should return false for string with only spaces", function () {
                expect(Utils.isValidString("    ")).toBeFalse();
            });

            it("should return true for non-empty string", function () {
                expect(Utils.isValidString("text")).toBeTrue();
            });

            it("should return true for string with leading/trailing spaces", function () {
                expect(Utils.isValidString("  valid  ")).toBeTrue();
            });
        });
    });

}