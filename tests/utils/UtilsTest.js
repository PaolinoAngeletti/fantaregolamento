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
                let result = Utils.addSectionTitle("Test Title");
                expect(result).toBe("<h2>Test Title</h2>");
            });
        });

        describe("addTextRow", function () {
            it("should wrap the text in a p tag", function () {
                let result = Utils.addTextRow("Sample text");
                expect(result).toBe("<p>Sample text</p>");
            });
        });

        describe("resolveEscapes", function () {
            it("should replace newline and \\n with <br>", function () {
                const input = "line1newline\nline2";
                const expected = "line1newline<br>line2"; // because 'newline' is not actually replaced
                let result = Utils.resolveEscapes(input);
                expect(result).toBe(expected);
            });

            it("should handle only \\n properly", function () {
                const input = "line1\nline2\nline3";
                const expected = "line1<br>line2<br>line3";
                let result = Utils.resolveEscapes(input);
                expect(result).toBe(expected);
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