import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { Product } from '@/lib/types';

// Optional: Register a nice font, but standard fonts work too.
// For now we rely on standard Helvetica to ensure zero build issues.

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#00897B',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#0A1F44',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f9fafb',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0A1F44',
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  }
});

interface CatalogDocumentProps {
  products: Product[];
}

export function CatalogDocument({ products }: CatalogDocumentProps) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Sanitatepharma Product Catalog</Text>
          <Text style={styles.subtitle}>Generated on {currentDate} | Confidential Wholesale Document</Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableColHeader, width: '30%' }}>
              <Text style={styles.tableCellHeader}>Product Name</Text>
            </View>
            <View style={{ ...styles.tableColHeader, width: '35%' }}>
              <Text style={styles.tableCellHeader}>Composition</Text>
            </View>
            <View style={{ ...styles.tableColHeader, width: '15%' }}>
              <Text style={styles.tableCellHeader}>Category</Text>
            </View>
            <View style={{ ...styles.tableColHeader, width: '20%' }}>
              <Text style={styles.tableCellHeader}>Pack Size</Text>
            </View>
          </View>

          {/* Table Rows */}
          {products.map((product) => (
            <View style={styles.tableRow} key={product.id}>
              <View style={{ ...styles.tableCol, width: '30%' }}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={{ ...styles.tableCol, width: '35%' }}>
                <Text style={styles.tableCell}>{product.composition || '-'}</Text>
              </View>
              <View style={{ ...styles.tableCol, width: '15%' }}>
                <Text style={styles.tableCell}>{product.category?.name || '-'}</Text>
              </View>
              <View style={{ ...styles.tableCol, width: '20%' }}>
                <Text style={styles.tableCell}>{product.pack_size || '-'}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Sanitatepharma Pvt. Ltd. | Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
}
