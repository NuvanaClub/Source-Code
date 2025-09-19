import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import jsPDF from "jspdf";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "pdf";

  try {
    const grow = await prisma.grow.findUnique({
      where: { id: params.id },
      include: { 
        entries: { 
          orderBy: { createdAt: "asc" },
          include: {
            grow: {
              include: {
                strain: true
              }
            }
          }
        },
        strain: true,
        user: true
      }
    });

    if (!grow || grow.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (format === "csv") {
      return exportToCSV(grow);
    } else {
      return exportToPDF(grow);
    }
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

function exportToCSV(grow) {
  const headers = [
    "Date",
    "Stage", 
    "Plant Height (cm)",
    "Leaf Count",
    "Temperature (°C)",
    "Humidity (%)",
    "pH",
    "Nutrients",
    "Notes"
  ];

  const rows = grow.entries.map(entry => [
    new Date(entry.createdAt).toLocaleDateString(),
    entry.stage || "",
    entry.plantHeight || "",
    entry.leafCount || "",
    entry.temperature || "",
    entry.humidity || "",
    entry.ph || "",
    entry.nutrients || "",
    entry.note.replace(/\n/g, " ").replace(/,/g, ";")
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(","))
    .join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${grow.title.replace(/[^a-z0-9]/gi, '_')}_grow_log.csv"`
    }
  });
}

function exportToPDF(grow) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth = pageWidth - 40) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * 7);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  yPosition = addText(grow.title, 20, yPosition);
  yPosition += 10;

  // Metadata
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  yPosition = addText(`Strain: ${grow.strain?.name || "Unknown"}`, 20, yPosition);
  yPosition = addText(`Created: ${new Date(grow.createdAt).toLocaleDateString()}`, 20, yPosition);
  yPosition = addText(`Total Entries: ${grow.entries.length}`, 20, yPosition);
  yPosition += 15;

  // Summary statistics
  if (grow.entries.length > 0) {
    doc.setFont("helvetica", "bold");
    yPosition = addText("Summary Statistics", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 5;

    const heights = grow.entries.filter(e => e.plantHeight).map(e => e.plantHeight);
    const temperatures = grow.entries.filter(e => e.temperature).map(e => e.temperature);
    const humidities = grow.entries.filter(e => e.humidity).map(e => e.humidity);

    if (heights.length > 0) {
      yPosition = addText(`Plant Height: ${Math.min(...heights)}cm - ${Math.max(...heights)}cm`, 20, yPosition);
    }
    if (temperatures.length > 0) {
      yPosition = addText(`Temperature Range: ${Math.min(...temperatures)}°C - ${Math.max(...temperatures)}°C`, 20, yPosition);
    }
    if (humidities.length > 0) {
      yPosition = addText(`Humidity Range: ${Math.min(...humidities)}% - ${Math.max(...humidities)}%`, 20, yPosition);
    }
    yPosition += 15;
  }

  // Entries
  doc.setFont("helvetica", "bold");
  yPosition = addText("Grow Log Entries", 20, yPosition);
  doc.setFont("helvetica", "normal");
  yPosition += 10;

  grow.entries.forEach((entry, index) => {
    checkNewPage(50);
    
    // Entry header
    doc.setFont("helvetica", "bold");
    yPosition = addText(`Entry ${index + 1} - ${new Date(entry.createdAt).toLocaleDateString()}`, 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 5;

    // Metrics
    const metrics = [];
    if (entry.stage) metrics.push(`Stage: ${entry.stage}`);
    if (entry.plantHeight) metrics.push(`Height: ${entry.plantHeight}cm`);
    if (entry.leafCount) metrics.push(`Leaves: ${entry.leafCount}`);
    if (entry.temperature) metrics.push(`Temp: ${entry.temperature}°C`);
    if (entry.humidity) metrics.push(`Humidity: ${entry.humidity}%`);
    if (entry.ph) metrics.push(`pH: ${entry.ph}`);
    if (entry.nutrients) metrics.push(`Nutrients: ${entry.nutrients}`);

    if (metrics.length > 0) {
      yPosition = addText(metrics.join(" | "), 20, yPosition);
      yPosition += 5;
    }

    // Notes
    if (entry.note) {
      yPosition = addText(`Notes: ${entry.note}`, 20, yPosition);
      yPosition += 10;
    }

    // Separator line
    if (index < grow.entries.length - 1) {
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;
    }
  });

  // Footer
  doc.setFontSize(8);
  doc.text("Generated by Weed Wiki - Legal-first cannabis education platform", 20, pageHeight - 10);

  const pdfBuffer = doc.output("arraybuffer");
  
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${grow.title.replace(/[^a-z0-9]/gi, '_')}_grow_log.pdf"`
    }
  });
}
