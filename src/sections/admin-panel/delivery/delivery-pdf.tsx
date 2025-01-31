import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
    family: 'Peyda',
    fonts: [
        { src: '/fonts/peyda/Peyda-Medium.ttf' },
    ],
});

const useStyles = () =>
    useMemo(
        () =>
            StyleSheet.create({
                col4: { width: '25%' },
                col8: { width: '75%' },
                col6: { width: '50%' },
                mb4: { marginBottom: 4 },
                mb8: { marginBottom: 8 },
                mb40: { marginBottom: 40 },
                h3: { fontSize: 16, fontWeight: 700 },
                h4: { fontSize: 13, fontWeight: 700 },
                body1: { fontSize: 10 },
                body2: { fontSize: 9 },
                subtitle1: { fontSize: 10, fontWeight: 700 },
                subtitle2: { fontSize: 9, fontWeight: 700 },
                alignRight: { textAlign: 'right' },
                alignLeft: { textAlign: 'left' },
                alignCenter: { textAlign: 'center' },
                directionRight: {

                },
                page: {
                    fontSize: 9,
                    lineHeight: 1.6,
                    fontFamily: 'Peyda',
                    backgroundColor: '#FFFFFF',
                    textTransform: 'capitalize',
                    padding: '40px 24px 120px 24px'
                },
                footer: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 24,
                    margin: 'auto',
                    borderTopWidth: 1,
                    borderStyle: 'solid',
                    position: 'absolute',
                    borderColor: '#DFE3E8',
                },
                gridContainer: {
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                table: {
                    display: 'flex',
                    width: 'auto',
                },
                tableRow: {
                    padding: '8px 0',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#DFE3E8',
                },
                tableRowColor: {
                    backgroundColor: '#F2F2F2',
                },
                tableRow2Color: {
                    backgroundColor: '#F8F8F8',
                },
                noBorder: {
                    paddingTop: 8,
                    paddingBottom: 0,
                    borderBottomWidth: 0,
                },
                view50: {
                    width: '50%',
                },
                view100: {
                    width: '100%',
                },
                tableCell_1: {
                    width: '50px',
                    paddingRight: 16,
                },
                tableCell_2: {
                    width: '140px',
                    paddingRight: 16,
                },
                tableCell_3: {
                    width: '15%',
                },
                tableCell_40: {
                    width: '120px',
                },
            }),
        []
    );

// ----------------------------------------------------------------------

type Props = {
    address: string;
};

export default function DeliveryPDF({ address }: Props) {

    const styles = useStyles();

    return (
        <Document>
            <Page size="A5" style={styles.page} orientation='landscape'>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                    </View>

                    <Image source="/logo/karano-icon.png" style={{ width: 62, height: 39 }} />
                </View>
                <View style={[styles.gridContainer, styles.mb40, styles.alignRight]}>
                    <Text style={[styles.h4, styles.view100]}>{address}</Text>
                </View>
            </Page>
        </Document>
    );
}