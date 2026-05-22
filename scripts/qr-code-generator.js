async function generateQrCode(content) {
    // noinspection JSUnresolvedFunction
    return window.QRCode.toDataURL(content);
}

window.generateQrCode = generateQrCode;