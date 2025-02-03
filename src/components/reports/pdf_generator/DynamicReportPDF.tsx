"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#333",
    backgroundColor: "#f5f5f5",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    fontSize: 10,
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
    color: "#333",
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 2,
    borderColor: "#888",
  },
  summaryText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  platformLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#555",
    marginTop: 20,
  },
});

// Mapping platform names to their image URLs
const platformLogos: { [key: string]: string } = {
  Meta: "https://via.placeholder.com/60?text=Meta",
  Google: "https://via.placeholder.com/60?text=Google",
  TikTok: "https://via.placeholder.com/60?text=TikTok",
};

/* eslint-disable */
const DynamicReportPDF = ({ data }: { data: any }) => {
  const selectedPlatformData = data.platforms.find(
    (platform: any) => platform.name === data.platform
  );
  const selectedAdAccountData = data.adAccounts.find(
    (account: any) => account.name === data.selectedAdAccount
  );
  /* eslint-enable */

  return (
    <Document>
      {/* Page 1: Overview */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Business Performance Report</Text>
        <Text style={styles.subHeader}>Generated for: {data.businessInfo.name}</Text>
        <Text style={styles.subHeader}>Contact: {data.businessInfo.contact}</Text>
        <Text style={styles.subHeader}>
          Time Range:{" "}
          {data.timeRange === "7"
            ? "Last 7 Days"
            : data.timeRange === "30"
              ? "Last 30 Days"
              : "Last 90 Days"}
        </Text>

        {/* Display Ad Account Details */}
        {selectedAdAccountData && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Ad Account Overview</Text>
            <Text style={styles.subHeader}>
              Ad Account: {selectedAdAccountData.name}
            </Text>
            <Text style={styles.subHeader}>
              Associated Platform: {selectedAdAccountData.platform}
            </Text>
            <Image
              style={styles.platformLogo}
              src={
                platformLogos[selectedAdAccountData.platform] ||
                "https://via.placeholder.com/60?text=Platform"
              }
            />
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeaderCell}>Metric</Text>
                <Text style={styles.tableHeaderCell}>Value</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Spend</Text>
                <Text style={styles.tableCell}>${selectedAdAccountData.spend}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Clicks</Text>
                <Text style={styles.tableCell}>{selectedAdAccountData.clicks}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>Page 1 of 2</Text>
      </Page>

      {/* Page 2: Summary and Insights */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Detailed Insights</Text>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Summary</Text>
          <Text style={styles.summaryText}>
            Total Spend for Ad Account ({selectedAdAccountData?.name || "N/A"}): $
            {selectedAdAccountData?.spend || 0}
          </Text>
          <Text style={styles.summaryText}>
            Total Clicks for Ad Account ({selectedAdAccountData?.name || "N/A"}):{" "}
            {selectedAdAccountData?.clicks || 0}
          </Text>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Key Insights</Text>
          <Text style={styles.summaryText}>
            1. The selected ad account is performing well in terms of click-through rate.
          </Text>
          <Text style={styles.summaryText}>
            2. Optimize ad creatives for better performance on {selectedAdAccountData?.platform}.
          </Text>
          <Text style={styles.summaryText}>
            3. Adjust budget allocation to maximize ROI for this ad account.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Page 2 of 2</Text>
      </Page>
    </Document>
  );
};

export default DynamicReportPDF;
