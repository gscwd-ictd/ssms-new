import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { FunctionComponent } from "react";

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    padding: 20,
  },
  totalsSection: {
    marginBottom: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 5,
    width: "50%",
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
    textTransform: "uppercase",
  },
  signatureTitle: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

interface TicketSummaryAndSignatoriesProps {
  receivedRequests: number;
  accomplishedRequests: number;
  cancelledRequests: number;
  openRequests: number;
  supportStaff: string;
  position: string;
  isLastPage?: boolean; // Add this prop to control visibility
}

export const TicketSummaryAndSignatories: FunctionComponent<TicketSummaryAndSignatoriesProps> = ({
  receivedRequests,
  accomplishedRequests,
  cancelledRequests,
  supportStaff,
  position,
  isLastPage = false, // Default to false
}) => {
  // Only render if this is the last page
  if (!isLastPage) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <View style={styles.totalsSection}>
        {/* <Text style={styles.totalLabel}>TOTAL</Text> */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>RECEIVED REQUESTS</Text>
          <Text style={styles.totalValue}>{receivedRequests}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>ACCOMPLISHED REQUESTS</Text>
          <Text style={styles.totalValue}>{accomplishedRequests}</Text>
        </View>
        {/* <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>OPEN REQUESTS</Text>
          <Text style={styles.totalValue}>{openRequests}</Text>
        </View> */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>CANCELLED REQUESTS</Text>
          <Text style={styles.totalValue}>{cancelledRequests}</Text>
        </View>
      </View>

      <View style={styles.signatureSection}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>{supportStaff}</Text>
          <Text style={styles.signatureTitle}>{position}</Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>MICHAEL C. GABALES, REE</Text>
          <Text style={styles.signatureTitle}>ICT DEPARTMENT MANAGER</Text>
        </View>
      </View>
    </View>
  );
};
