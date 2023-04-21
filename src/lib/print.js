import { jsPDF } from "jspdf";
import { normal, medium } from "$lib/assets/fira.js";
import { numerationFormat, dateObjectFormat, phoneFormat, currency, capitalize } from "$lib/utils";
import { User } from "$lib/stores"
import { get } from "svelte/store"

export function downloadPdf(data, type) {
  const user = get(User);
  const pdfData = { ...data, user, type };
  const link = document.createElement('a');

  link.href = printPdf(pdfData);
  link.download = `${data.client.legal_name} - ${numerationFormat(data.number, data.date.year)}`;
  link.click();
}

function drawOutlines(doc) {
  doc.setLineWidth(0.5);

  doc.rect(10, 10, 190, 277);

  doc.setFillColor("#000");

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

function drawDocData(doc, { date, number, type, pages }) {
  const { pageNumber, pagesLength } = pages;
  const x = 154;
  const y = 22;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(12);

  doc.text(capitalize(type), x, y);

  doc.setLineWidth(0.1);
  doc.setFillColor("#eee");

  doc.rect(x, y + 2, 12, 5); // Num label
  doc.rect(x + 12, y + 2, 24, 5, "FD"); // Num data 
  doc.rect(x, y + 7, 12, 5); // Date label
  doc.rect(x + 12, y + 7, 24, 5, "FD"); // Date data

  if (pagesLength > 1) {
    doc.rect(x, y + 12, 12, 5); // Page label
    doc.rect(x + 12, y + 12, 24, 5, "FD"); // Page data
  }

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);

  doc.text("Núm.", x + 1.5, y + 5.5);
  if (type === "rectificativa") doc.text(`REC/${numerationFormat(number, date.year, true)}`, x + 13.5, y + 5.5);
  else doc.text(numerationFormat(number, date.year, true), x + 13.5, y + 5.5);

  doc.text("Fecha", x + 1.5, y + 10.5);
  doc.text(dateObjectFormat(date), x + 13.5, y + 10.5);

  if (pagesLength > 1) {
    doc.text("Pág.", x + 1.5, y + 15.5);
    doc.text(`${pageNumber} de ${pagesLength}`, x + 13.5, y + 15.5);
  }
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

  doc.rect(x + 10, y + 4, 120, 5, "FD"); // legal_name
  doc.rect(x + 150, y + 4, 20, 5, "FD"); // legal_id
  doc.rect(x + 18.5, y + 11, 151.5, 5, "FD"); // address
  doc.rect(x + 16.5, y + 18, 153.5, 5, "FD"); // contact

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);

  doc.text("Para", x, y + 7.5)
  doc.text(legal_name, x + 11.5, y + 7.5);

  doc.text("NIF/CIF", x + 135, y + 7.5)
  doc.text(legal_id, x + 151.5, y + 7.5);

  doc.text("Dirección", x, y + 14.5);
  doc.text(`${address}, ${cp} ${city} (${country})`, x + 20, y + 14.5);

  doc.text("Contacto", x, y + 21.5);
  doc.text(phoneFormat(contact), x + 18, y + 21.5);
};

function drawItemsData(doc, { chunk, linesPerPage }) {
  const x = 20;
  const y = 90;


  for (let l = 0; l < linesPerPage; l++) {
    if (l % 2) doc.setFillColor("#fff");
    else doc.setFillColor("#eee");

    doc.rect(x, y + 5 + (5 * l), 170, 5, "F");
  }

  chunk.forEach((line, i) => {
    const { amount, label, dto, price, total } = line;
    const posX = x + 1.5;

    doc.text(amount.toString(), posX, y + 8.5 + (5 * i)); // amount
    doc.text(label, posX + 15, y + 8.5 + (5 * i)); // label
    doc.text(`${dto}%`, posX + 115, y + 8.5 + (5 * i)); // dto
    doc.text(currency(price), posX + 125, y + 8.5 + (5 * i)); // price
    doc.text(currency(total), posX + 147.5, y + 8.5 + (5 * i)); // total
  })

  doc.setLineWidth(0.1);
  doc.setFillColor("#fff");

  doc.rect(x, y, 15, 5); // amount
  doc.rect(x + 15, y, 100, 5); // label
  doc.rect(x + 115, y, 10, 5); // dto
  doc.rect(x + 125, y, 22.5, 5); // price
  doc.rect(x + 147.5, y, 22.5, 5); // total

  doc.line(x + 15, y + 5, x + 15, y + 5 + (5 * linesPerPage));
  doc.line(x + 115, y + 5, x + 115, y + 5 + (5 * linesPerPage));
  doc.line(x + 125, y + 5, x + 125, y + 5 + (5 * linesPerPage));
  doc.line(x + 147.5, y + 5, x + 147.5, y + 5 + (5 * linesPerPage));

  doc.text("Cant.", x + 1.5, y + 3.5); // amount
  doc.text("Concepto", x + 16.5, y + 3.5); // label
  doc.text("Dto.", x + 116.5, y + 3.5); // dto
  doc.text("Unidad", x + 126.5, y + 3.5); // price
  doc.text("Total", x + 149, y + 3.5); // total
}

function drawTotalsData(doc, { totals, taxes }) {
  const { base, iva, ret, total } = totals;
  const x = 30;
  const y = 240;

  doc.setFillColor("#eee");

  doc.rect(x + 10, y, 20, 5, "FD"); // base
  doc.rect(x + 50, y, 20, 5, "FD"); // iva
  doc.rect(x + 90, y, 20, 5, "FD"); // ret

  doc.setFillColor("#000");

  doc.rect(x + 130, y, 20, 5, "FD"); // total

  doc.text("Base", x, y + 3.5);
  doc.text(`${currency(base)}`, x + 11.5, y + 3.5);

  doc.text(`${taxes.iva}% IVA`, x + 35, y + 3.5);
  doc.text(`${currency(iva)}`, x + 51.5, y + 3.5);

  doc.text(`${taxes.ret}% IRPF`, x + 75, y + 3.5);
  doc.text(`-${currency(ret)}`, x + 91.5, y + 3.5);

  doc.text(`Total`, x + 118.5, y + 3.5);

  doc.setFont("FiraCode-Medium");
  doc.setTextColor("#fff");

  doc.text(`${currency(total)}`, x + 131.5, y + 3.5);

}

function drawNoteData(doc, data) {
  const x = 20;
  const y = 255;

  doc.setFont("FiraCode-Medium");
  doc.setFontSize(10);
  doc.setTextColor("#000");

  doc.text("Notas", 210 / 2, y, {
    align: "center"
  });

  doc.setFillColor("#eee");

  doc.rect(x, y + 4, 170, 20, "FD");

  doc.setFont("FiraCode-Regular");
  doc.setFontSize(8);
  doc.setTextColor("#000");

  data && doc.text(data, 210 / 2, y + 8.5, {
    maxWidth: 150,
    align: "center"
  });
}

export function printPdf(data) {
  const { user, client, date, items, number, totals, note, type } = data;
  const linesPerPage = 27;
  const pagesLength = Math.ceil(items.length / linesPerPage);
  const pages = { pageNumber: 1, pagesLength };
  const taxes = data.taxes || { iva: user.iva, ret: user.ret };

  const doc = new jsPDF({
    unit: "mm",
    putOnlyUsedFonts: true
  });

  doc.addFileToVFS('FiraCode-Regular-normal.ttf', normal);
  doc.addFont('FiraCode-Regular-normal.ttf', 'FiraCode-Regular', 'normal');
  doc.addFileToVFS('FiraCode-Medium-normal.ttf', medium);
  doc.addFont('FiraCode-Medium-normal.ttf', 'FiraCode-Medium', 'normal');

  for (let i = 0; i < items.length; i += linesPerPage) {
    const chunk = items.slice(i, i + linesPerPage);

    drawLogo(doc, user.logo);
    drawUserData(doc, user);
    drawDocData(doc, { date, number, type, pages });
    drawClientData(doc, client);
    drawTotalsData(doc, { totals, taxes });
    drawNoteData(doc, note);
    drawOutlines(doc);
    drawItemsData(doc, { chunk, linesPerPage });

    if (i + linesPerPage > items.length) break;
    doc.addPage();
    pages.pageNumber++;
  }

  const blob = doc.output("bloburi", { filename: "a4" });
  return blob + '#view=fit';
} 