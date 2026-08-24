class RuleTitleCustomElement extends CustomHtmlElement {

    render() {
        const text = this.retrieveInnerText();
        const title = this.buildH3Element(text);
        title.classList.add("rule-title");
        this.replaceWith(title);
    }

}

customElements.define("rule-title", RuleTitleCustomElement);