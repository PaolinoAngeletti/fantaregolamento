class SectionTitleCustomElement extends CustomHtmlElement {

    render() {
        const text = this.retrieveInnerText();
        const h2 = this.buildH2Element(text);
        h2.classList.add("centered");
        this.replaceWith(h2);
    }

}

customElements.define("section-title", SectionTitleCustomElement);