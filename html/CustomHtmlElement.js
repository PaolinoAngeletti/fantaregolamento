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

    retrieveInnerText() {
        return this.textContent.trim();
    }

    buildDiv(isContainer = false, isCentered = false) {
        const result = this.buildHtmlElement("div");
        if (isCentered) result.classList.add("centered");
        if (isContainer) result.classList.add("container");
        return result;
    }

    buildParagraphElement(text) {
        const result = this.buildHtmlElement("p");
        result.textContent = text;
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

        return input;
    }

    buildSpanElement(text) {
        const span = this.buildHtmlElement("span");
        span.textContent = text;
        return span;
    }

    buildH2Element(text) {
        const h2 = this.buildHtmlElement("h2");
        h2.textContent = text;
        return h2;
    }

    buildH3Element(text) {
        const result = this.buildHtmlElement("h3");
        result.textContent = text;
        return result;
    }

    buildHtmlElement(elementType) {
        return document.createElement(elementType);
    }
}