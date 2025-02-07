import React from "react";
import { Page, Text, View, Document, StyleSheet, renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import axios from "axios";
import ServiceSlipDocumentHeader from "@ssms/components/features/reports/ServiceSlipDocumentHeader";
// import ServiceSlipDocumentHeader from "@ssms/components/features/reports/ServiceSlipDocumentHeader";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logoContainer: {
    width: 60,
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerRight: {
    flex: 1,
  },
  headerText: {
    textAlign: "center",
  },
  documentNo: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 8,
  },
  orgName: {
    color: "#2B7CB9",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "bold",
  },
  form: {
    borderWidth: 0.5,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    minHeight: 20,
  },
  cell: {
    justifyContent: "center",
    padding: 4,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
  },
  labelCell: {
    width: "15%",
    backgroundColor: "#fff",
  },
  valueCell: {
    width: "35%",
  },

  detailsSection: {
    flexDirection: "row", // Make columns side by side
    borderBottomWidth: 0.5, // Add bottom border
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  lastColumn: {
    borderRightWidth: 0, // Remove right border for last column
  },

  detailsDefColumn: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    textAlign: "center",
  },

  detailsDefHeader: {
    padding: 4,
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    textAlign: "center",
  },

  detailsDefContent: {
    padding: 4,
    minHeight: 20,
    textAlign: "center",
  },

  detailsColumn: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
  },

  detailsHeader: {
    padding: 4,
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    textAlign: "center",
  },

  detailsContent: {
    padding: 8,
    minHeight: 40,
  },

  detailsRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
  },

  signatureSection: {
    flexDirection: "row",
    marginTop: 20,
  },
  signatureBlock: {
    flex: 1,
    alignItems: "center",
  },
  signatureLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    width: "80%",
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    textAlign: "center",
  },
  signatureName: {
    fontSize: 8,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 3, // Add space between name and line
  },
});

type ServiceRequestSlipProps = {
  data: {
    id: string;
    requestedBy: string;
    accomplishedBy: string;
    office: string;
    department: string;
    division: string | null;
    category: string;
    subCategory: string;
    supportType: string;
    serviceSlipNo: string | null;
    dateRequested: string;
    dateAccomplished: string;
    details: string;
    assessment: string;
    action: string;
  };
};

// Create Document Component
const ServiceRequestSlip: React.FC<ServiceRequestSlipProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/gscwd_logo.png" />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.documentNo}>ICT-006-1</Text>
            <Text>Republic of the Philippines</Text>
            <Text style={styles.orgName}>GENERAL SANTOS CITY WATER DISTRICT</Text>
            <Text>E. Fernandez St., Lagao, General Santos City</Text>
            <Text>Telephone No.: 552-3824; Telefax No.: 553-4960</Text>
            <Text>Email Address: gscwaterdistrict@yahoo.com</Text>
          </View>
        </View> */}

        <ServiceSlipDocumentHeader />

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>End-User</Text>
            </View>
            <View style={[styles.cell, { width: "35%" }]}>
              <Text>{data.requestedBy}</Text>
            </View>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Service Slip no.</Text>
            </View>
            <View style={[styles.cell, { flex: 1, borderRightWidth: 0 }]}>
              <Text>{data.serviceSlipNo}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Office</Text>
            </View>
            <View style={[styles.cell, { width: "85%", borderRightWidth: 0 }]}>
              <Text>{data.office}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Department</Text>
            </View>
            <View style={[styles.cell, { width: "35%" }]}>
              <Text>{data.department}</Text>
            </View>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Date Requested</Text>
            </View>
            <View style={[styles.cell, { flex: 1, borderRightWidth: 0 }]}>
              <Text>{formatDate(data.dateAccomplished)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Division</Text>
            </View>
            <View style={[styles.cell, { width: "35%" }]}>
              <Text>{data.division || "-"}</Text>
            </View>
            <View style={[styles.cell, styles.labelCell]}>
              <Text>Date Accomplished</Text>
            </View>
            <View style={[styles.cell, { flex: 1, borderRightWidth: 0 }]}>
              <Text>{formatDate(data.dateRequested)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          {/* Category Column */}
          <View style={styles.detailsDefColumn}>
            <View style={styles.detailsDefHeader}>
              <Text>CATEGORY</Text>
            </View>
            <View style={styles.detailsDefContent}>
              <Text>{data.category}</Text>
            </View>
          </View>

          {/* Sub-Category Column */}
          <View style={styles.detailsDefColumn}>
            <View style={styles.detailsDefHeader}>
              <Text>SUB-CATEGORY</Text>
            </View>
            <View style={styles.detailsDefContent}>
              <Text>{data.subCategory}</Text>
            </View>
          </View>

          {/* Support Type Column */}
          <View style={[styles.detailsDefColumn, styles.lastColumn]}>
            <View style={styles.detailsDefHeader}>
              <Text>SUPPORT TYPE</Text>
            </View>
            <View style={styles.detailsDefContent}>
              <Text>{data.supportType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          {/* Details Column */}
          <View style={styles.detailsColumn}>
            <View style={styles.detailsHeader}>
              <Text>DETAILS</Text>
            </View>
            <View style={styles.detailsContent}>
              <Text>{data.details}</Text>
            </View>
          </View>

          {/* Assessment Column */}
          <View style={styles.detailsColumn}>
            <View style={styles.detailsHeader}>
              <Text>ASSESSMENT</Text>
            </View>
            <View style={styles.detailsContent}>
              <Text>{data.assessment || ""}</Text>
            </View>
          </View>

          {/* Action Taken Column */}
          <View style={[styles.detailsColumn, styles.lastColumn]}>
            <View style={styles.detailsHeader}>
              <Text>ACTION TAKEN</Text>
            </View>
            <View style={styles.detailsContent}>
              <Text>{data.action}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureName}>{data.requestedBy}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Conformed by</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureName}>{data.accomplishedBy}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Accomplished by</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureName}>Michael G. Gabales, REE</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Checked by</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export async function GET(request: Request, { params }: { params: Promise<{ slipId: string }> }) {
  const id = (await params).slipId;

  try {
    const data = (
      await axios.get(`${process.env.BETTER_AUTH_URL}/api/v1/reports/generate-service-slip/${id}`)
    ).data;

    const stream = await renderToStream(<ServiceRequestSlip data={data} />);

    return new NextResponse(stream as unknown as ReadableStream);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect("/tickets");
  }
}
