const EXPORTERS = {
    pdf: "./pdf_exporter.js",
    html: "./html_exporter.js"
};

const ExporterFactory = {
    async getExporter(type) {
        const path = EXPORTERS[type];
        if (!path) {
            throw new Error("Unknown exporter type: " + type);
        }
        return await import(path);
    }
};