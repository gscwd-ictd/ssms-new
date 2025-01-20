import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { FunctionComponent } from "react";

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    padding: 20,
  },
  totalsSection: {
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  totalLabel: {
    width: 150,
    fontSize: 10,
    fontWeight: "bold",
  },
  totalValue: {
    width: 50,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    textAlign: "center",
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  signatureTitle: {
    fontSize: 10,
    textAlign: "center",
  },
});

interface DocumentFooterProps {
  receivedRequests: number;
  accomplishedRequests: number;
}

export const DocumentFooter: FunctionComponent<DocumentFooterProps> = ({
  receivedRequests,
  accomplishedRequests,
}) => (
  <View style={styles.footer}>
    <View style={styles.totalsSection}>
      <Text style={styles.totalLabel}>TOTAL</Text>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>RECEIVED REQUESTS</Text>
        <Text style={styles.totalValue}>{receivedRequests}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>ACCOMPLISHED REQUESTS</Text>
        <Text style={styles.totalValue}>{accomplishedRequests}</Text>
      </View>
    </View>

    <View style={styles.signatureSection}>
      <View style={styles.signatureBlock}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureName}>Phyl Fragata</Text>
        <Text style={styles.signatureTitle}>SOET-B</Text>
      </View>

      <View style={styles.signatureBlock}>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureName}>MICHAEL C. GABALES, REE</Text>
        <Text style={styles.signatureTitle}>ICT DEPARTMENT MANAGER</Text>
      </View>
    </View>
  </View>
);
