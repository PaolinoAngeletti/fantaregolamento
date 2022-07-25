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
