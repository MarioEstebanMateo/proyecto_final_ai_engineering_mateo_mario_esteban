import jsPDF from "jspdf";

export const generarPDFOrden = (ordenData) => {
  const doc = new jsPDF();

  // Configuración
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Título
  doc.setFontSize(24);
  doc.setTextColor(219, 39, 119); // Pink
  doc.text("HELADERÍA", pageWidth / 2, yPos, { align: "center" });

  yPos += 15;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Orden de Pedido", pageWidth / 2, yPos, { align: "center" });

  // Línea separadora
  yPos += 10;
  doc.setDrawColor(219, 39, 119);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // Información del cliente
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("DATOS DEL CLIENTE", margin, yPos);

  yPos += 8;
  doc.setFont(undefined, "normal");
  doc.text(`Nombre: ${ordenData.nombre} ${ordenData.apellido}`, margin, yPos);

  yPos += 7;
  doc.text(`Teléfono: ${ordenData.telefono}`, margin, yPos);

  yPos += 7;
  doc.text(
    `Tipo de pedido: ${
      ordenData.tipoEntrega === "retiro"
        ? "Retiro en local"
        : "Delivery a domicilio"
    }`,
    margin,
    yPos
  );

  if (ordenData.tipoEntrega === "delivery") {
    yPos += 7;
    doc.text(`Dirección: ${ordenData.direccion}`, margin, yPos);
  }

  yPos += 7;
  doc.text(
    `Horario de ${ordenData.tipoEntrega === "retiro" ? "retiro" : "entrega"}: ${
      ordenData.horario
    }`,
    margin,
    yPos
  );

  // Línea separadora
  yPos += 10;
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // Detalle del pedido
  yPos += 15;
  doc.setFont(undefined, "bold");
  doc.text("DETALLE DEL PEDIDO", margin, yPos);

  yPos += 10;

  // Encabezados de tabla
  doc.setFontSize(10);
  doc.text("Producto", margin, yPos);
  doc.text("Cant.", pageWidth - 90, yPos);
  doc.text("Precio", pageWidth - 65, yPos);
  doc.text("Subtotal", pageWidth - margin, yPos, { align: "right" });

  yPos += 2;
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Items del pedido
  doc.setFont(undefined, "normal");
  ordenData.items.forEach((item) => {
    // Verificar si necesitamos nueva página
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    let productoTexto = item.nombre;
    if (item.gustos && item.gustos.length > 0) {
      productoTexto += `\n  Gustos: ${item.gustos.join(", ")}`;
    }

    const lineas = doc.splitTextToSize(productoTexto, 90);
    doc.text(lineas, margin, yPos);

    const lineHeight = lineas.length * 5;
    doc.text(item.cantidad.toString(), pageWidth - 90, yPos);
    doc.text(`$${item.precio.toFixed(2)}`, pageWidth - 65, yPos);
    doc.text(`$${item.subtotal.toFixed(2)}`, pageWidth - margin, yPos, {
      align: "right",
    });

    yPos += Math.max(lineHeight, 7) + 3;
  });

  // Línea separadora
  yPos += 5;
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // Total
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("TOTAL A PAGAR:", pageWidth - 90, yPos);
  doc.setTextColor(219, 39, 119);
  doc.text(`$${ordenData.total.toFixed(2)}`, pageWidth - margin, yPos, {
    align: "right",
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.setFont(undefined, "normal");
  const fechaHora = new Date().toLocaleString("es-AR");
  doc.text(`Orden generada el: ${fechaHora}`, pageWidth / 2, 280, {
    align: "center",
  });

  // Abrir en nueva ventana
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
