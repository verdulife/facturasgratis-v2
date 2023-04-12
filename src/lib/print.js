import { jsPDF } from "jspdf";
import { normal, medium } from "$lib/assets/fira.js";
import { numerationFormat, dateObjectFormat, phoneFormat, currency } from "$lib/utils";

function drawOutlines(doc) {
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);

  doc.triangle(185, 272, 200, 272, 185, 287, "F");
  doc.setFillColor("#fff");
  doc.triangle(184, 288, 201, 271, 201, 288, "F");
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
  doc.text(`${cp} ${city} (${country})`, x, y + (inc * 3));
  doc.text(`t. ${phoneFormat(phone)}`, x, y + (inc * 4));
  doc.text(`e. ${email}`, x, y + (inc * 5));

}

function drawDocData(doc, { date, number, type }) {
  const x = 154;
  const y = 22;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(12);

  doc.text(type, x, y);

  doc.setLineWidth(0.1);
  doc.setFillColor("#eee");

  doc.rect(x, y + 2, 12, 5);
  doc.rect(x, y + 7, 12, 5);
  doc.rect(x + 12, y + 2, 24, 5, "FD");
  doc.rect(x + 12, y + 7, 24, 5, "FD");

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);

  doc.text("Núm.", x + 1.5, y + 5.5);
  doc.text(numerationFormat(number), x + 13.5, y + 5.5);

  doc.text("Fecha", x + 1.5, y + 10.5);
  doc.text(dateObjectFormat(date), x + 13.5, y + 10.5);

  // TODO: add page counter block if multpage doc
}

function drawClientData(doc, data) {
  const { legal_name, legal_id, address, city, cp, country, contact } = data;
  const x = 20;
  const y = 55;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(10);
  doc.text("Datos del cliente", 210 / 2, y, {
    align: "center"
  });

  doc.setFillColor("#eee");

  doc.rect(x + 10, y + 4, 100, 5, "FD");
  doc.rect(x + 130, y + 4, 40, 5, "FD");
  doc.rect(x + 18.5, y + 11, 151.5, 5, "FD");
  doc.rect(x + 16.5, y + 18, 153.5, 5, "FD");

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);

  doc.text("Para", x, y + 7.5)
  doc.text(legal_name, x + 11.5, y + 7.5);

  doc.text("NIF/CIF", x + 115, y + 7.5)
  doc.text(legal_id, x + 131.5, y + 7.5);

  doc.text("Dirección", x, y + 14.5);
  doc.text(`${address}, ${cp} ${city} (${country})`, x + 20, y + 14.5);

  doc.text("Contacto", x, y + 21.5);
  doc.text(phoneFormat(contact), x + 18, y + 21.5);
};

function drawItemsData(doc, data) {
  const x = 20;
  const y = 90;
  const lines = 27;

  for (let l = 0; l < lines; l++) {
    if (l % 2) doc.setFillColor("#fff");
    else doc.setFillColor("#eee");

    doc.rect(x, y + 5 + (5 * l), 170, 5, "F");
  }

  doc.setFillColor("#fff");

  doc.rect(x, y, 15, 5); // amount
  doc.rect(x + 15, y, 100, 5); // label
  doc.rect(x + 115, y, 10, 5); // dto
  doc.rect(x + 125, y, 22.5, 5); // price
  doc.rect(x + 147.5, y, 22.5, 5); // total

  doc.line(x + 15, y + 5, x + 15, y + 5 + (5 * lines));
  doc.line(x + 115, y + 5, x + 115, y + 5 + (5 * lines));
  doc.line(x + 125, y + 5, x + 125, y + 5 + (5 * lines));
  doc.line(x + 147.5, y + 5, x + 147.5, y + 5 + (5 * lines));

  doc.text("Cant.", x + 1.5, y + 3.5); // amount
  doc.text("Concepto", x + 16.5, y + 3.5); // label
  doc.text("Dto.", x + 116.5, y + 3.5); // dto
  doc.text("Unidad", x + 126.5, y + 3.5); // price
  doc.text("Total", x + 149, y + 3.5); // total
}

export function printPdf(data) {
  const { user, client, date, items, number, taxes, totals, note, type } = data;

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
  drawDocData(doc, { date, number, type });
  drawClientData(doc, client);
  drawItemsData(doc, items);

  const blob = doc.output("bloburi", { filename: "a4" });
  return blob + '#view=fit';
} 