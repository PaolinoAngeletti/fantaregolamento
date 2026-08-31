class RuleCustomElement extends CustomHtmlElement {

    render() {
        const result = this.buildDiv(false, false);
        result.classList.add("rule");
        result.append(...this.childNodes);

        const noteContainer = this.buildDiv(true, true);
        noteContainer.style.display = "none";

        const textArea = this.buildHtmlElement("rule-text-area");
        //textArea.id = this.id + "-note";


        noteContainer.addEventListener("focusin", () => {
            console.log("focus preso");
        });

        noteContainer.addEventListener("focusout", event => {
            console.log("focus perso");

            if (event.target.value && event.target.value.trim() !== "") {
                return;
            }

            noteContainer.style.display = "none";
            button.style.display = "flex";
        });

        noteContainer.appendChild(textArea);

        //todo aggiungere label alla text area: Note

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Aggiungi nota";
        button.addEventListener("click", () => {
            console.log("cliccato");
            button.style.display="none";
            noteContainer.style.display = "flex";
            // todo switch containers?

            setTimeout(() => {
                const textarea = noteContainer.querySelector("textarea");
                if (textarea) {
                    textarea.focus();
                }
            }, 0);
        });

        button.style.width = "auto";
        button.style.textTransform = "none";
        button.style.marginTop = "1em";
        button.style.height = "50px";
        button.style.backgroundColor = "orange";

        console.log(this.id);
        if(!this.isValidString(this.id)){
            throw new Error("not-valid");
        }
        button.id = this.id + "-note";

        const buttonDiv = this.buildDiv(false, true);
        buttonDiv.append(button);
        buttonDiv.append(noteContainer);

        result.append(buttonDiv);

        this.replaceWith(result);
    }

}

customElements.define("rule-item", RuleCustomElement);