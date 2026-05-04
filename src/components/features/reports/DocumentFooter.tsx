import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { FunctionComponent } from "react";

interface DocumentFooterProps {
  pageCount: number;
  totalPagesCount: number;
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  pageText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});

export const DocumentFooter: FunctionComponent<DocumentFooterProps> = ({ pageCount, totalPagesCount }) => {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.pageText}>
        Page {pageCount} of {totalPagesCount}
      </Text>
    </View>
  );
};
