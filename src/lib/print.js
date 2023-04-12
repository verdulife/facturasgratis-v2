import { jsPDF } from "jspdf";
import { normal, medium } from "$lib/assets/fira.js";


function drawOutlines(doc) {
  doc.setLineWidth(0.5);
  doc.stroke().rect(10, 10, 190, 277);
}

function drawLogo(doc, data) {
  const imgProps = doc.getImageProperties(data);
  const imageRatio = imgProps.width / imgProps.height;
  const h = 25;
  const w = h / imageRatio;

  doc.addImage(data, 20, 20, w, h, "NONE");
}

function drawUserData(doc, data) {
  const { legal_name, legal_id, street, city, cp, country, phone, email } = data;
  const p = phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');

  const x = 55;
  const y = 22;
  const inc = 4;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(9);
  doc.text(legal_name, x, y);

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);
  doc.text(legal_id, x, y + (inc * 1));

  doc.text(street, x, y + (inc * 2));
  doc.text(`${city}, ${cp} (${country})`, x, y + (inc * 3));
  doc.text(`t. ${p}`, x, y + (inc * 4));
  doc.text(`e. ${email}`, x, y + (inc * 5));

}

function drawDocData(doc, { date, number, type }) {
  const x = 160;
  const y = 22;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(12);
  doc.text(type, x, y);

  doc.setLineWidth(0.1);
  doc.setFillColor("#eee");
  doc.stroke().rect(x, y + 2, 12, 5, "FD");
  doc.stroke().rect(x, y + 7, 12, 5, "FD");
  doc.stroke().rect(x + 12, y + 2, 18, 5);
  doc.stroke().rect(x + 12, y + 7, 18, 5);
}

export function printPdf(data) {
  const { user, client, date, items, number, taxes, totals, note, type } = data;
  console.log(data);

  const doc = new jsPDF({
    unit: "mm",
    putOnlyUsedFonts: true
  });

  doc.addFileToVFS('FiraCode-Regular-normal.ttf', normal);
  doc.addFont('FiraCode-Regular-normal.ttf', 'FiraCode-Regular', 'normal');
  doc.addFileToVFS('FiraCode-Medium-normal.ttf', medium);
  doc.addFont('FiraCode-Medium-normal.ttf', 'FiraCode-Medium', 'normal');

  drawOutlines(doc);
  drawLogo(doc, user.logo);
  drawUserData(doc, user);
  drawDocData(doc, { date, number, type })

  const blob = doc.output("bloburi", { filename: "a4" });
  return blob + '#view=fit';
} 