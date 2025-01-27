import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { IInvoice } from 'src/types/invoice';

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
                noBorder: {
                    paddingTop: 8,
                    paddingBottom: 0,
                    borderBottomWidth: 0,
                },
                tableCell_1: {
                    width: '50px',
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
    invoice: IInvoice | any;
    currentStatus: string;
};

export default function ProductionPDF({ invoice, currentStatus }: Props) {
    const {
        items,
        taxes,
        dueDate,
        discount,
        shipping,
        invoiceTo,
        createDate,
        totalAmount,
        invoiceFrom,
        invoiceNumber,
        subTotal,
    } = invoice;

    const styles = useStyles();

    return (
        <Document>
            <Page size="A3" style={styles.page} orientation='landscape'>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Text style={styles.h3}>{currentStatus + " شماره فاکتور"}</Text>
                        <Text> {invoiceNumber} </Text>
                    </View>

                    <Image source="/logo/logo_single.png" style={{ width: 48, height: 48 }} />
                </View>

                {/* <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>Invoice from</Text>
                        <Text style={styles.body2}>{invoiceFrom.name}</Text>
                        <Text style={styles.body2}>{invoiceFrom.fullAddress}</Text>
                        <Text style={styles.body2}>{invoiceFrom.phoneNumber}</Text>
                    </View>

                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>Invoice to</Text>
                        <Text style={styles.body2}>{invoiceTo.name}</Text>
                        <Text style={styles.body2}>{invoiceTo.fullAddress}</Text>
                        <Text style={styles.body2}>{invoiceTo.phoneNumber}</Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>Date create</Text>
                        <Text style={styles.body2}>{fDate(createDate)}</Text>
                    </View>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>Due date</Text>
                        <Text style={styles.body2}>{fDate(dueDate)}</Text>
                    </View>
                </View> */}

                <Text style={[styles.subtitle1, styles.mb8, styles.alignRight]}>جزئیات محصولات سفارشی</Text>

                <View style={styles.table}>
                    <View>
                        <View style={[styles.tableRow, styles.tableRowColor]}>

                            <View style={styles.tableCell_1}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>تعداد</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوع بافت روکش</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>مغز چارچوب</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>پهنای چارچوب</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوار لبه روکش</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوار برجسته</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوع پروفیل</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوع روکش گیری</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوع قاب</Text>
                            </View>

                            <View style={styles.tableCell_40}>
                                <Text style={[styles.alignRight, styles.subtitle2]}>نوع روکش</Text>
                            </View>


                            <View style={[styles.tableCell_1, styles.alignRight]}>
                                <Text style={styles.subtitle2}>کد</Text>
                            </View>

                            <View style={[styles.tableCell_2, styles.alignRight]}>
                                <Text style={styles.subtitle2}>نام محصول</Text>
                            </View>

                            <View style={styles.tableCell_1}>
                                <Text style={styles.subtitle2}>#</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        {items.map((item: any, index: number) => (
                            <View style={styles.tableRow} key={item.id}>

                                <View style={styles.tableCell_1}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.quantity}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.coating_texture}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.frame_core}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.frame_width}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.cover_edge_tape}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.coating_texture}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.profile_type}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.coating_type}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.frame_type}</Text>
                                </View>

                                <View style={styles.tableCell_40}>
                                    <Text style={[styles.alignRight, styles.subtitle2]}>{item.cover_type}</Text>
                                </View>

                                <View style={[styles.tableCell_1, styles.alignRight]}>
                                    <Text style={styles.subtitle2}>{item.code}</Text>
                                </View>


                                <View style={styles.tableCell_2}>
                                    <Text style={[styles.subtitle2, styles.alignRight, styles.directionRight]}>{item.title}</Text>
                                    <Text style={[styles.alignRight]}>{item.description}</Text>
                                </View>

                                <View style={styles.tableCell_1}>
                                    <Text style={styles.subtitle2}>{index + 1}</Text>
                                </View>
                            </View>
                        ))}

                        {/* <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Subtotal</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(subTotal)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Shipping</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(-shipping)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Discount</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(-discount)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Taxes</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(taxes)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text style={styles.h4}>Total</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text style={styles.h4}>{fCurrency(totalAmount)}</Text>
                            </View>
                        </View>
                        */}
                    </View>
                </View>

                {/* <View style={[styles.gridContainer, styles.footer]} fixed>
                    <View style={styles.col8}>
                        <Text style={styles.subtitle2}>NOTES</Text>
                        <Text>
                            We appreciate your business. Should you need us to add VAT or extra notes let us know!
                        </Text>
                    </View>
                    <View style={[styles.col4, styles.alignRight]}>
                        <Text style={styles.subtitle2}>Have a Question?</Text>
                        <Text>support@abcapp.com</Text>
                    </View>
                </View> */}
            </Page>
        </Document>
    );
}