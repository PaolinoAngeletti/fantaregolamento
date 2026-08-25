class RuleRadioOptionCustomElement extends CustomHtmlElement {

    render() {
        const label = this.buildLabelElement();
        const input = this.buildInputElement();
        const span = this.buildSpanElement(this.retrieveInnerContent());

        label.appendChild(input);
        label.appendChild(span);

        this.innerHTML = "";
        this.appendChild(label);
        this.replaceWith(label);
    }

}

customElements.define("rule-radio-opt", RuleRadioOptionCustomElement);