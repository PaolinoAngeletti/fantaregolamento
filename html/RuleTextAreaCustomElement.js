class RuleTextAreaCustomElement extends CustomHtmlElement {

    render() {
        const result = this.buildTextAreaElement();
        this.replaceWith(result);
    }

}

customElements.define("rule-text-area", RuleTextAreaCustomElement);