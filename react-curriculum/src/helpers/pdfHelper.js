import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const downloadPDF = (content, format = 'A4', name) => {
    // Configurar el tamaño de la página
    const pageFormats = {
        letter: { width: 215.9, height: 279.4 }, // Tamaño en mm
        A4: { width: 210, height: 297 },         // Tamaño en mm
    };

    const pageSize = pageFormats[format] || pageFormats['A4'];

    // Crear el documento PDF
    const doc = new jsPDF({
        format: [pageSize.width, pageSize.height],
        unit: 'mm',
        orientation: 'portrait',
    });

    // Capturar el contenido HTML
    html2canvas(content, {
        scale: 2, // Mejora la calidad del canvas
        useCORS: true, // Permite el uso de recursos externos como imágenes
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width * 0.75; // Ajustar el ancho de la imagen (en mm)
        const imgHeight = canvas.height * 0.75; // Ajustar el alto de la imagen (en mm)

        // Calcular la escala para ajustar la imagen a la página sin distorsión
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;

        // Centrar el contenido en la página
        const offsetX = (pdfWidth - newWidth) / 2;
        const offsetY = (pdfHeight - newHeight) / 2;

        doc.addImage(imgData, 'PNG', offsetX, offsetY, newWidth, newHeight);
        doc.save(`curriculum-vitae_${name}.pdf`);
    });
};

export default downloadPDF;


// const downloadPDF = (content, format = 'A4', name) => {
//     // Configurar el tamaño de la página
//     const pageFormats = {
//         letter: { width: 215.9, height: 279.4 }, // Tamaño en mm
//         A4: { width: 210, height: 297 },         // Tamaño en mm
//     };

//     const pageSize = pageFormats[format] || pageFormats['A4'];

//     // Crear el documento PDF
//     const doc = new jsPDF({
//         format: [pageSize.width, pageSize.height],
//         unit: 'mm',
//         orientation: 'portrait',
//     });

//     // Capturar el contenido HTML
//     html2canvas(content, {
//         scale: 2, // Mejora la calidad del canvas
//         useCORS: true, // Permite el uso de recursos externos como imágenes
//     }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');

//         // Obtener dimensiones del canvas
//         const imgWidth = canvas.width * 0.75; // Ajustar el ancho de la imagen (en mm)
//         const imgHeight = canvas.height * 0.75; // Ajustar el alto de la imagen (en mm)

//         // Calcular la escala para ajustar la imagen a la página sin deformación
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = doc.internal.pageSize.getHeight();
//         const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//         // Dimensionar la imagen para que ocupe toda la página
//         const newWidth = imgWidth * scale;
//         const newHeight = imgHeight * scale;

//         // Centrar el contenido en la página
//         const offsetX = (pdfWidth - newWidth) / 2;
//         const offsetY = (pdfHeight - newHeight) / 2;

//         // Añadir imagen al PDF
//         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         doc.save(`curriculum-vitae_${name}.pdf`);
//     });
// };

// export default downloadPDF;
