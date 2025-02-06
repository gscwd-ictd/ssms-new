import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import fs from "fs";
import path from "path";
import { FunctionComponent } from "react";

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    display: "flex",
    width: "100%",
  },
  logo: {
    width: 60,
    height: 60,
    position: "absolute",
    left: 50,
    top: 1,
  },
  organizationInfo: {
    flex: 1,
  },
  orgName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2B7CB9", // Using a blue color similar to the document
    marginBottom: 2,
    textAlign: "center",
  },
  address: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: "center",
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: "center",
  },
  email: {
    fontSize: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
    textTransform: "uppercase",
  },
});

type DocumentHeaderProps = {
  teamName: string;
};

const DocumentHeader: FunctionComponent<DocumentHeaderProps> = ({ teamName }) => {
  const logoPath = path.join(process.cwd(), "public", "gscwd_logo.png");
  const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          style={styles.logo}
          source={logoSrc} // Using placeholder as requested
        />
        <View style={styles.organizationInfo}>
          <Text style={styles.orgName}>GENERAL SANTOS CITY WATER DISTRICT</Text>
          <Text style={styles.address}>E. Fernandez St., General Santos City</Text>
          <Text style={styles.contact}>Telephone No.: 552-3824; Telefax No.: 553-4960</Text>
          <Text style={styles.email}>Email Address: gscwaterdistrict@yahoo.com</Text>
        </View>
      </View>

      <Text style={styles.title}>SERVICE SLIP SUMMARY</Text>
      <Text style={styles.subtitle}>{teamName}</Text>
      <Text style={styles.subtitle}>
        FOR THE MONTH OF {format(new Date(), "MMMM").toUpperCase()} {format(new Date(), "yyy")}
      </Text>
    </View>
  );
};

export default DocumentHeader;
