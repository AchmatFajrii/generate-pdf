const DocumentPDF = () => {
  return (
    <>
      <h1>Selamat Datang di Situs Saya</h1>
      <p>
        Ini adalah contoh halaman dengan format kertas A4. Anda dapat
        menambahkan konten sesuai kebutuhan Anda di sini.
      </p>
      <a href="/generatePDF" className="btn bg-blue-600 px-4 py-2 rounded-xl mt-5 inline-block font-bold text-white hide-on-print">Generate PDF</a>
    </>
  );
};

export default DocumentPDF;
