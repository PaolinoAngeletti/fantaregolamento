class RuleTextCustomElement extends CustomHtmlElement {

    render() {
        const entireDiv = this.buildDiv(false, true);

        const textLabel = this.buildParagraphElement(this.retrieveInnerText());
        entireDiv.appendChild(textLabel);

        const input = this.buildInputElement();
        entireDiv.appendChild(input);

        this.replaceWith(entireDiv);
    }

}

customElements.define("rule-text", RuleTextCustomElement);