import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { IInvoice } from 'src/types/invoice';
import { Iinvoice } from '../invoice-view';

// ----------------------------------------------------------------------

Font.register({
    family: 'Peyda',
    // family: 'Roboto',
    fonts: [
        // { src: '/fonts/Roboto-Regular.ttf' }, 
        // { src: '/fonts/Roboto-Bold.ttf' },
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
    invoice: Iinvoice;
    title: string;
    currentStatus: string;
};

export default function InvoicePDF({ invoice, title, currentStatus }: Props) {
    const {

    } = invoice;

    const styles = useStyles();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Text style={styles.h3}>{currentStatus + " شماره فاکتور"}</Text>
                        <Text> {""} </Text>
                    </View>

                    <Image source="/logo/karano-icon.png" style={{ width: 62, height: 39 }} />
                </View>

                <Text style={[styles.subtitle1, styles.mb8, styles.alignRight]}>{title}</Text>

                <View style={styles.table}>
                    <View>
                        <View style={[styles.tableRow, styles.tableRowColor]}>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>مبلغ کل</Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>مبلغ واحد</Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>واحد</Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>تعداد / مقدار</Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>کد کالا</Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>شرح کالا/خدمات</Text>
                            </View>

                            <View style={[styles.tableCell_1, styles.alignRight]}>
                                <Text style={styles.subtitle2}>#</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color]}>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>محصولات</Text>
                            </View>

                            <View style={[styles.tableCell_1, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        {invoice.products.map((item: any, index: number) => (
                            <View style={styles.tableRow} key={index}>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{fCurrency(item.price)}</Text>
                                </View>

                                <View style={[styles.tableCell_40, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{fCurrency(item.unit_price)}</Text>
                                </View>

                                <View style={[styles.tableCell_40, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{item.unit}</Text>
                                </View>

                                <View style={[styles.tableCell_40, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{item.quantity}</Text>
                                </View>

                                <View style={[styles.tableCell_40, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{item.code}</Text>
                                </View>

                                <View style={[styles.tableCell_40, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{item.name}</Text>
                                </View>

                                <View style={[styles.tableCell_1, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{index + 1}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color]}>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>

                            <View style={[styles.tableCell_40, styles.alignRight]}>
                                <Text style={styles.subtitle2}>دستمزد مونتاژ</Text>
                            </View>

                            <View style={[styles.tableCell_1, styles.alignRight]}>
                                <Text style={styles.subtitle2}></Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color, styles.view50]}>
                            <View style={[styles.view50, styles.alignRight]}>
                                <Text style={styles.subtitle2}>{fCurrency(invoice.shipping)}</Text>
                            </View>
                            
                            <View style={[styles.view50, styles.alignCenter]}>
                                <Text style={styles.subtitle2}>هزینه ارسال</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color, styles.view50]}>
                            <View style={[styles.view50, styles.alignRight]}>
                                <Text style={styles.subtitle2}>{fCurrency(invoice.tax)}</Text>
                            </View>
                            
                            <View style={[styles.view50, styles.alignCenter]}>
                                <Text style={styles.subtitle2}>مالیات و عوارض</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color, styles.view50]}>
                            <View style={[styles.view50, styles.alignRight]}>
                                <Text style={styles.subtitle2}>{invoice.discount_percentage + "%"}</Text>
                            </View>
                            
                            <View style={[styles.view50, styles.alignCenter]}>
                                <Text style={styles.subtitle2}>تخفیف</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color, styles.view50]}>
                            <View style={[styles.view50, styles.alignRight]}>
                                <Text style={styles.subtitle2}>{fCurrency(invoice.prepayment)}</Text>
                            </View>
                            
                            <View style={[styles.view50, styles.alignCenter]}>
                                <Text style={styles.subtitle2}>مبلغ پیش‌ پرداخت</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[styles.tableRow, styles.tableRow2Color, styles.view50]}>
                            <View style={[styles.view50, styles.alignRight]}>
                                <Text style={styles.subtitle2}>{fCurrency(invoice.total_price)}</Text>
                            </View>
                            
                            <View style={[styles.view50, styles.alignCenter]}>
                                <Text style={styles.subtitle2}>مبلغ کل</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Page>
        </Document>
    );
}