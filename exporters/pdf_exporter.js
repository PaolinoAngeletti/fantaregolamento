const jsPDF = window.jspdf?.jsPDF;
const {PDFDocument} = window.PDFLib;

/*
Library used to create and manage PDF documents.
For this purpose, two libraries are used:
- jsPDF: used to create PDFs. It is used for its simplicity in defining PDF lines, and above all,
it makes it very easy to manage newlines, using the splitTextToSize method.
- pdf-lib: used to add attachments to a PDF document.
 */

/**
 * Create a PDF document with jsPDF library.
 * @param {Array<{text: string, type: string}>} contentRows
 * @returns {window.jspdf.jsPDF} PDF created.
 */
// noinspection JSUnusedGlobalSymbols
export async function createPDF(contentRows) {
    const pdf = new jsPDF({unit: "pt", format: "a4"});
    let x = 20, y = 40;

    contentRows.forEach(row => {
        const text = row.text || row.toString();
        const type = row.type || "paragraph";
        let fontSize = 12, fontStyle = "normal", spaceDiv = 10;

        if (type === "h1") {
            fontSize = 25;
            fontStyle = "bold";
            spaceDiv = 30;
        }
        if (type === "h2") {
            fontSize = 17;
            fontStyle = "bold";
            spaceDiv = 18;
        }

        pdf.setFont("helvetica", fontStyle);
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, 500);
        pdf.text(lines, x, y);
        y += lines.length * 14 + spaceDiv;
    });

    return pdf;
}

/**
 * Attach a JSON document as embedded file using pdf-lib library.
 * @param {ArrayBuffer} pdfBytes
 * @param {Object} metadata
 * @returns {Promise<Uint8Array>} PDF updated with attachment.
 */
// noinspection JSUnusedGlobalSymbols
export async function attachJSONtoPDF(pdfBytes, metadata) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const jsonBytes = new TextEncoder().encode(JSON.stringify(metadata));
    pdfDoc.attach(jsonBytes, 'config.json', {
        mimeType: 'application/json',
        description: 'FantaRegolamento configuration'
    });
    return await pdfDoc.save();
}

/**
 * Show a PDF document preview.
 * @param pdfWithAttachment
 */
// noinspection JSUnusedGlobalSymbols
export function openPDFPreview(pdfWithAttachment) {
    const blob = new Blob([pdfWithAttachment], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}