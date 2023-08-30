import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";
import { PaperFormat } from "puppeteer";

const exportPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const { paperSize, marginTop, marginRight, marginBottom, marginLeft } = req.query;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const url = "http://localhost:3000/";

  await page.goto(url, { waitUntil: "networkidle2" });

  // Menyembunyikan elemen dengan kelas .no-print
  await page.addStyleTag({ content: '.no-print { display: none !important; }' });

  const pdfConfig = {
    format: paperSize as PaperFormat || "A4",
    margin: {
      top: marginTop ? `${marginTop}mm` : "10mm",
      right: marginRight ? `${marginRight}mm` : "7mm",
      bottom: marginBottom ? `${marginBottom}mm` : "10mm",
      left: marginLeft ? `${marginLeft}mm` : "13mm",
    },
    printBackground: true,
  };

  const pdf = await page.pdf(pdfConfig);

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=exported.pdf");
  res.send(pdf);
};

export default exportPDF;
