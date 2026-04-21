const jsPDF = window.jspdf?.jsPDF;
const {PDFDocument} = window.PDFLib;

/*
Library used to create and manage PDF documents.
For this purpose, three libraries are used:
- jsPDF: used to create PDFs. It is used for its simplicity in defining PDF lines, and above all,
it makes it very easy to manage newlines, using the splitTextToSize method.
- pdf-lib: used to add attachments to a PDF document.
- pdfjsLib: used to simply access and read attached files to PDF.
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

class PdfRowInfo {
    constructor() {
        this.fontSize = 15;
        this.fontStyle = "normal";
        this.marginTop = 10;
        this.marginBottom = 10;
        this.width = 15;
        this.height = 15;
    }
}

function retrieveRowInfo(row) {
    let result = new PdfRowInfo();
    const type = row.type;

    if (type === "h1") {
        result.fontSize = 25;
        result.fontStyle = "bold";
        result.marginTop = 20;
        result.marginBottom = 8;
    } else if (type === "h2") {
        result.fontSize = 17;
        result.fontStyle = "bold";
        result.marginTop = 20;
        result.marginBottom = 8;
    } else if (type === "paragraph") {
        result.fontSize = 12;
        result.marginTop = 8;
        result.marginBottom = 5;
    } else if (type === "italic") {
        result.fontSize = 10;
        result.fontStyle = "italic";
        result.marginTop = 6;
        result.marginBottom = 5;
    } else if (type === "image") {
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
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFont("helvetica", rowInfo.fontStyle);
    pdf.setFontSize(rowInfo.fontSize);

    // applying margin-top.
    y += rowInfo.marginTop;

    // writing lines.
    const lines = pdf.splitTextToSize(text, 500);
    for (let i = 0; i < lines.length; i++) {
        if (y > pageHeight - 40) {
            pdf.addPage();
            y = 40; // reset vertical position.
        }
        pdf.text(lines[i], x, y);
        y += rowInfo.fontSize;
    }

    // updating next write height.
    y += rowInfo.marginBottom;
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

export async function loadJSONFromPDF() {
    return new Promise((resolve, reject) => {

        // file selection.
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf";
        input.onchange = async (event) => {
            try {
                const file = event.target.files[0];
                if (!file) return reject("No file selected");

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const attachments = await pdf.getAttachments();
                if (!attachments || !attachments['config.json']) {
                    return reject(new Error('config.json not found'));
                }

                const jsonData = attachments['config.json'].content;
                const decoded = new TextDecoder().decode(jsonData);
                const result = JSON.parse(decoded);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        };

        // trigger selection.
        input.click();
    });
}