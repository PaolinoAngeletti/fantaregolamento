export async function showPreview(contentRows, metadata) {
    let pdfDocument = createPDFDocument(contentRows, metadata);
    const pdfBytes = pdfDocument.output('arraybuffer');
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

function createPDFDocument(contentRows, metadata) {
    // starting PDF coordinates.
    let x = 20;
    let y = 40;

    let pdfDocument = new window.jspdf.jsPDF({unit: "pt", format: "a4"});

    // metadata.
    pdfDocument.setProperties({
        title: "FantaRegolamento",
        subject: JSON.stringify(metadata),
        author: "Paolino Angeletti",
        creator: "Paolino Angeletti",
        version: "1.0",
    });
    //todo qui la versione del sw, utile a capire se puoi accedere alla ricarica file.

    // rows.
    contentRows.forEach((row) => {
        const text = row.text || row.toString();
        const type = row.type;
        let space_divisor;

        if ("h1" === type) {
            pdfDocument.setFont("helvetica", "bold");
            pdfDocument.setFontSize(25);
            space_divisor = 30;
        } else if ("h2" === type) {
            pdfDocument.setFont("helvetica", "bold");
            pdfDocument.setFontSize(17);
            space_divisor = 18;
        } else if ("paragraph" === type) {
            pdfDocument.setFont("helvetica", "normal");
            pdfDocument.setFontSize(12);
            space_divisor = 10;
        } else {
            throw new Error("Invalid text type: " + type);
        }

        const lines = pdfDocument.splitTextToSize(text, 500);
        pdfDocument.text(lines, x, y);
        y += lines.length * 14 + space_divisor;
    });

    return pdfDocument;
}

// todo unused warning ma è il compilatore. viene usata e come!
export async function loadPDFDocument() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf";

        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) return reject("No file selected");

            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);

                const subject = pdfDoc.getSubject();
                if (!subject) return reject("No JSON inside metadata");

                try {
                    const dati = JSON.parse(subject);
                    resolve(dati);
                } catch (err) {
                    reject("Invalid metadata JSON");
                }
            } catch (err) {
                reject(err);
            }
        };
        input.click();
    });
}