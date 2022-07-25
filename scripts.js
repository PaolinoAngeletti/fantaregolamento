import { Document, Packer } from 'docx'
import { saveAs } from 'file-saver'

function applicaModificatore(daApplicare)
{
	var x = document.getElementById("punti_modificatore");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function generaDocumento()
{
	console.log("1");
	let doc = new Document({ sections: [] });
	saveDocumentToFile(doc, 'New Document.docx')
	console.log("2");
}

function saveDocumentToFile(doc, fileName) {
  // Create a mime type that will associate the new file with Microsoft Word
  const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  // Create a Blob object from Packer containing the Document instance and the mimeType
  Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType)
    // Save the file using saveAs from the file-saver package
    saveAs(docblob, fileName)
  })
}