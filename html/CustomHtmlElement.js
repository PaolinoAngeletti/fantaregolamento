class CustomHtmlElement extends HTMLElement {

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        setTimeout(() => {
            this.render();
        }, 0);
    }

    render() {
        throw new Error("render() must be implemented");
    }

    // todo duplicato.
    isValidString (string) {
        return string != null && string.trim() !== "";
    }

    retrieveInnerContent() {
        const contentType = this.getAttribute("data-content-type");
        if ("html" === contentType) {
            return this.innerHTML.trim();
        }
        return this.retrieveInnerText();
    }

    /**
     * Returns the custom element's text content as a normalized single-line
     * string, collapsing consecutive whitespace and removing surrounding
     * whitespace.
     *
     * @returns {string} The normalized inner text.
     */
    retrieveInnerText() {
        return this.textContent.replace(/\s+/g, " ").trim();
    }

    buildDiv(isContainer = false, isCentered = false) {
        const result = this.buildHtmlElement("div");
        if (isCentered) result.classList.add("centered");
        if (isContainer) result.classList.add("container");
        return result;
    }

    buildParagraphElement(text) {
        const result = this.buildHtmlElement("p");
        result.innerText = text;
        return result;
    }

    buildItalicElement() {
        const result = this.buildHtmlElement("i");
        result.innerText = this.retrieveInnerContent();
        return result;
    }

    buildLabelElement() {
        return this.buildHtmlElement("label");
    }

    buildInputElement() {
        const input = this.buildHtmlElement("input");

        input.id = this.id;
        input.name = this.getAttribute("name");
        input.setAttribute("data-rule", this.getAttribute("data-rule"));
        input.type = this.hasAttribute("type") ? this.getAttribute("type") : "radio";

        if (this.hasAttribute("checked")) input.checked = true;
        if (this.hasAttribute("min")) input.min = this.getAttribute("min");
        if (this.hasAttribute("value")) input.value = this.getAttribute("value");
        if (this.hasAttribute("loadable")) input.setAttribute("loadable", "");
        if (this.hasAttribute("oninput")) input.setAttribute("oninput", this.getAttribute("oninput"));
        if (this.hasAttribute("onchange")) input.setAttribute("onchange", this.getAttribute("onchange"));

        return input;
    }

    buildSpanElement(text) {
        const span = this.buildHtmlElement("span");
        span.innerText = text;
        return span;
    }

    buildH2Element(text) {
        const h2 = this.buildHtmlElement("h2");
        h2.textContent = text;
        return h2;
    }

    buildH3Element(text) {
        const result = this.buildHtmlElement("h3");
        result.innerText = text;
        return result;
    }

    buildTextAreaElement() {
        const textarea = this.buildHtmlElement("textarea");
        textarea.id = this.id;
        textarea.value = this.retrieveInnerText();
        textarea.classList.add("textarea");
        if (this.hasAttribute("loadable")) textarea.setAttribute("loadable", "");
        return textarea;
    }

    buildHtmlElement(elementType) {
        return document.createElement(elementType);
    }
}