class RuleDescriptionCustomElement extends CustomHtmlElement {

    render() {
        const text = this.retrieveInnerContent();
        const result = this.buildParagraphElement(text);
        result.classList.add("rule-description");
        this.replaceWith(result);
    }

}

customElements.define("rule-description", RuleDescriptionCustomElement);