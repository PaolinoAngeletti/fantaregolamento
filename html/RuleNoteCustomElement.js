class RuleNoteCustomElement extends CustomHtmlElement {

    render() {
        const result = this.buildItalicElement();
        result.classList.add("rule-description");
        this.replaceWith(result);
    }

}

customElements.define("rule-note", RuleNoteCustomElement);