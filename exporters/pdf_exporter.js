const jsPDF = window.jspdf?.jsPDF;
const {PDFDocument} = window.PDFLib;

/*
Library used to create and manage PDF documents.
For this purpose, two libraries are used:
- jsPDF: used to create PDFs. It is used for its simplicity in defining PDF lines, and above all,
it makes it very easy to manage newlines, using the splitTextToSize method.
- pdf-lib: used to add attachments to a PDF document.
 */

// noinspection JSUnusedGlobalSymbols
export async function createAndOpenDocument(content, metadata, advertise) {
    const pdf = await createPDF(content, advertise);
    const pdfBytes = pdf.output('arraybuffer');
    const pdfWithAttachment = await attachJSONtoPDF(pdfBytes, metadata);
    openPDFPreview(pdfWithAttachment);
}

/**
 * Create a PDF document with jsPDF library.
 * @param {Array<{text: string, type: string}>} contentRows
 * @param {text: string, type: string} advertise
 * @returns {window.jspdf.jsPDF} PDF created.
 */
async function createPDF(contentRows, advertise) {
    const pdf = new jsPDF({unit: "pt", format: "a4"});
    let x = 20, y = 40;

    // regulation content.
    for (const row of contentRows) {
        y = await manageRow(pdf, row, x, y);
    }

    // advertising.
    // noinspection JSUnresolvedFunction
    await manageRow(pdf, advertise, x, y);

    return pdf;
}

class PdfRowInfo {
    constructor(fontSize, fontStyle, spaceDiv) {
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.spaceDiv = spaceDiv;
    }
}

async function manageRow(pdf, row, x, y) {
    const text = row.text;
    const type = row.type;

    if (type === "center") {
        // text will contains container's elements.
        for (const row of text) {
            let rowInfo = retrieveRowInfo(row);
            let xCentered = retrieveRowCenterCoordinate(pdf, row, rowInfo);
            y = await manageRow(pdf, row, xCentered, y);
        }
        return y;
    }

    let rowInfo = retrieveRowInfo(row);
    if (type === "image") {
        y = writeImageToPDF(pdf, text, rowInfo, x, y);
    } else {
        y = writeTextToPDF(pdf, text, rowInfo, x, y);
    }

    return y;
}

function retrieveRowInfo(row) {
    let result;
    const type = row.type;

    if (type === "h1") {
        result = new PdfRowInfo(25, "bold", 30);
    } else if (type === "h2") {
        result = new PdfRowInfo(17, "bold", 18);
    } else if (type === "paragraph") {
        result = new PdfRowInfo(12, "normal", 10);
    } else if (type === "italic") {
        result = new PdfRowInfo(10, "italic", 10);
    } else if (type === "image") {
        result = new PdfRowInfo();
        result.width = row.width || 100;
        result.height = row.height || 100;
    } else {
        throw new Error("Invalid value type: " + type);
    }

    return result;
}

function retrieveRowCenterCoordinate(pdf, row, rowInfo) {
    let xCentered;
    const pageWidth = pdf.internal.pageSize.getWidth();
    if (row.type === "image") {
        xCentered = (pageWidth - rowInfo.width) / 2;
    } else {
        xCentered = (pageWidth - pdf.getTextWidth(row.text)) / 2;
    }
    return xCentered;
}

function writeTextToPDF(pdf, text, rowInfo, x, y) {
    pdf.setFont("helvetica", rowInfo.fontStyle);
    pdf.setFontSize(rowInfo.fontSize);

    const lines = pdf.splitTextToSize(text, 500);
    pdf.text(lines, x, y);

    // updating next write height.
    y += lines.length * 14 + rowInfo.spaceDiv;
    return y;
}

async function writeImageToPDF(pdf, text, rowInfo, x, y) {
    const pngImage = await svgToPngBase64(text);
    pdf.addImage(pngImage, rowInfo.format || "JPEG", x, y, rowInfo.width, rowInfo.height);
    return y + rowInfo.height + 20;
}

async function svgToPngBase64(svgBase64) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = svgBase64;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const pngBase64 = canvas.toDataURL("image/png");
            resolve(pngBase64);
        };
    });
}

/**
 * Attach a JSON document as embedded file using pdf-lib library.
 * @param {ArrayBuffer} pdfBytes
 * @param {Object} metadata
 * @returns {Promise<Uint8Array>} PDF updated with attachment.
 */
async function attachJSONtoPDF(pdfBytes, metadata) {
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
function openPDFPreview(pdfWithAttachment) {
    const blob = new Blob([pdfWithAttachment], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}