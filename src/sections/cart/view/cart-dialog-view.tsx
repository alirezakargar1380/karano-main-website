import {
    Button,
    Card,
    CardContent,
    Grid, Stack, TableBody, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { RHFRadioGroup, RHFRadioGroupWithImage } from 'src/components/hook-form';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import CartTableRow from '../cart-table-row';
import { TableHeadCustom } from 'src/components/table';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { IProductDefaultDetails } from 'src/types/product';
import { endpoints } from 'src/utils/axios';
import { useEffect, useState } from 'react';
import IncrementerButton from 'src/sections/product/common/incrementer-button';
import { ICheckoutItemPropertyPrice } from 'src/types/checkout';
import Joyride, { Step, ACTIONS, EVENTS, STATUS, TooltipRenderProps } from 'react-joyride';

export const CartTableHead = [
    { id: 'name', label: 'نوع پروفیل' },
    { id: 'createdAt', label: 'پوشش نهایی', width: 160 },
    { id: 'inventoryType', label: 'نوع قاب', width: 160 },
    { id: 'price', label: 'روکش گیری', width: 140 },
    { id: 'publish', label: 'ابعاد', width: 110 },
    { id: 'quntity', label: 'تعداد', width: 110 },
    { id: 'zzz', width: 88 },
]

export const ReadyProductCartTableHead = [
    { id: 'name', label: 'نوع پوشش' },
    { id: 'publish', label: 'ابعاد', width: 110 },
    { id: 'quntity', label: 'تعداد', width: 110 },
    { id: 'zzz', width: 88 },
]

interface Props {
    title: string
    listId: number | null
    formOptions: IProductDefaultDetails
    data: ICheckoutItemPropertyPrice[]
    type?: 'cart' | 'edit';
    onUpdate: (id: number) => void
    onDelete: (propertyId: number) => void
    setValue: (name: string, value: any) => void
    values: any
}


const steps = [
    {
        target: '.my-first-step',
        content: 'This is my awesome feature!',
        disableBeacon: true,
    },
    {
        target: '.edit',
        content: 'This another awesome feature!',
        disableBeacon: true,
    },
    {
        target: '.del',
        content: 'This another awesome feature!',
        disableBeacon: true,
    },
]

const Tooltip = ({
    continuous,
    index,
    step,
    backProps,
    closeProps,
    primaryProps,
    tooltipProps,
}: TooltipRenderProps) => (
    <Card sx={{ p: 3, direction: 'rtl' }} {...tooltipProps}>
        <>{(index + 1) + "/" + steps.length}</>
        {step.title && <Typography>{step.title}</Typography>}
        <CardContent>{step.content}</CardContent>
        <Box>
            {index > 0 && (
                <Button {...backProps}>
                    <Typography id="back">back</Typography>
                </Button>
            )}
            {continuous && (
                <Button {...primaryProps}>
                    <Typography id="next">next</Typography>
                </Button>
            )}
            {!continuous && (
                <Button {...closeProps}>
                    <Typography id="close">close</Typography>
                </Button>
            )}
        </Box>
    </Card>
);

export default function CartDialogView({
    title,
    formOptions,
    data,
    listId,
    type,
    onUpdate,
    onDelete,
    setValue,
    values,
}: Props) {
    const [disable, setDisable] = useState({
        profile_type: false,
        cover_type: true,
        frame_type: true,
        coating_type: true,
        dimension: true
    });

    const [state, setState] = useState({
        run: true,
        loading: false,
        stepIndex: 0,
        modalOpen: false,
    });

    useEffect(() => {
        // check for wich one is the first
        console.log(values.profile_type)
        if (values.profile_type) {
            if (formOptions.cover_type)
                setDisable({ ...disable, cover_type: false })
        }

        if (values.cover_type) {
            if (formOptions.frame_type)
                setDisable({ ...disable, frame_type: false })
        }

        if (values.frame_type) {
            if (formOptions.coating_type)
                setDisable({ ...disable, coating_type: false })
        }

        if (values.coating_type) {
            setDisable({ ...disable, dimension: false })
        }
    }, [values]);

    const handleJoyrideCallback = (data: any) => {
        const { action, index, status, type } = data;

        // setState((prevState) => ({ ...prevState, run: true }));
        // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        //     setState((prevState) => ({
        //         ...prevState,
        //         run: false,
        //         loading: true,
        //     }));

        //     setTimeout(() => {
        //         setState((prevState) => ({
        //             ...prevState,
        //             loading: false,
        //             run: true,
        //             stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
        //         }));
        //     }, 2000);
        // } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        //     setState((prevState) => ({ ...prevState, run: false }));
        //     // setJoyride(false);
        // } else if (type === EVENTS.TOUR_END) {
        //     setState((prevState) => ({ ...prevState, stepIndex: index + 1 }));
        // }

        // if (action === ACTIONS.NEXT && index === 3) {
        //     // openModal(true);
        //     setState((prevState) => ({ ...prevState, modalOpen: true }));
        // }
    };

    return (
        <Box>
            <Joyride
                callback={handleJoyrideCallback}
                tooltipComponent={Tooltip}
                steps={steps}
                run={state.run}
                // disableScrolling
                continuous
                scrollToFirstStep
                disableOverlayClose
                // showProgress
                showSkipButton
                styles={{
                    overlay: {
                        height: '100%',
                        position: 'fixed',
                    },
                    options: {
                        zIndex: 10000,
                    },
                    spotlight: {
                        borderRadius: 100,
                        width: '100px!important',
                        height: '100px!important',
                    }
                }}
                floaterProps={{
                    autoOpen: true,
                    hideArrow: true,
                }}
            />
            {/* // <Scrollbar sx={{ minHeight: 200 }}> */}
            <Grid container spacing={4} sx={{ width: 1, padding: 3 }}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ px: 0 }}>
                        <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2 }} variant='h3'>
                            {title}
                        </Typography>
                        <Box sx={{ pt: 2, borderBottom: '1px solid #D1D1D1', pb: 2 }}>
                            <Typography sx={{ pb: 2 }} variant='h6' color={'#727272'}>
                                ویژگی های مورد نظر را انتخاب کنید
                            </Typography>
                            <Box width={1}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    نوع پروفیل
                                </Typography>

                                <RHFRadioGroup
                                    name='profile_type'
                                    row
                                    sx={{
                                        width: 1,
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)',
                                            md: 'repeat(2, 1fr)',
                                        },
                                    }}
                                    FormControlSx={{
                                        width: 1
                                    }}
                                    options={formOptions.profile_type.map((profile_type) => {
                                        return {
                                            label: profile_type.name,
                                            value: profile_type.id,
                                        }
                                    })}
                                />
                            </Box>
                        </Box>

                        {formOptions.cover_type && (
                            <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                                <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                    width: 1, pb: 1
                                }}>
                                    پوشش نهایی
                                </Typography>
                                <RHFRadioGroupWithImage
                                    name='cover_type'
                                    disabled={disable.cover_type}
                                    sx={{
                                        width: 1,
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)',
                                            md: 'repeat(2, 1fr)',
                                        },
                                    }}
                                    FSx={{
                                        '&.MuiFormControlLabel-root': {
                                            mr: 0
                                        }
                                    }}
                                    options={formOptions.cover_type.map((cover_type) => {
                                        return {
                                            label: cover_type.name,
                                            value: cover_type.id,
                                            src: endpoints.cover_type.get_image(cover_type.icon_image_name)
                                        }
                                    })}
                                />
                            </Box>
                        )}

                        <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: 1
                            }}>
                                نوع قاب
                            </Typography>
                            <RHFRadioGroup
                                name='frame_type'
                                disabled={disable.frame_type}
                                row
                                sx={{
                                    mt: 2,
                                    width: 1,
                                    display: 'grid',
                                    rowGap: 1,
                                    gridTemplateColumns: {
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    },
                                }}
                                FormControlSx={{
                                    width: 1
                                }}
                                options={formOptions.frame_type.map((frame_type) => {
                                    return {
                                        label: frame_type.name,
                                        value: frame_type.id,
                                    }
                                })}
                            />
                        </Box>

                        <Box sx={{ py: 2, borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: 3, pt: 1
                            }}>
                                نوع روکش گیری
                            </Typography>
                            <RHFRadioGroup
                                name='coating_type'
                                row
                                disabled={disable.coating_type}
                                sx={{
                                    width: 1,
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    },
                                }}
                                FormControlSx={{
                                    width: 1
                                }}
                                options={[
                                    {
                                        label: 'جناقی',
                                        value: 'جناقی'
                                    },
                                    {
                                        label: 'غیر جناقی',
                                        value: 'غیر جناقی'
                                    }
                                ]}
                            />
                        </Box>

                        <Box sx={{ py: 2 }}>
                            <Typography variant="subtitle2" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: 3, pt: 1
                            }}>
                                ابعاد
                            </Typography>
                            <Stack direction={'row'}
                                sx={{ pb: 2 }}
                                spacing={2}
                                columnGap={2}
                                rowGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    md: 'repeat(2, 1fr)',
                                }}>
                                <RHFTitleTextField name='dimension.height' disabled={disable.dimension} custom_label='عرض (سانتی‌متر)' placeholder='26' />
                                <RHFTitleTextField name='dimension.width' disabled={disable.dimension} custom_label='طول - راه روکش (سانتی‌متر) ' placeholder='84' />
                            </Stack>
                            <Typography variant="subtitle1" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: 1, pt: 1
                            }}>
                                تعداد
                            </Typography>
                            <IncrementerButton
                                name="quantity"
                                // quantity={values.quantity || 1}
                                // quantity={values.quantity}
                                // disabledDecrease={values.quantity <= 1}
                                // disabledIncrease={values.quantity >= available}
                                // onIncrease={() => { }}
                                // onDecrease={() => { }}
                                onDecrease={() => setValue('quantity', values.quantity ? values.quantity + 1 : 1)}
                                onIncrease={() => {
                                    if (values.quantity != 1)
                                        setValue('quantity', values.quantity ? values.quantity - 1 : 1)
                                }}
                            />
                            <RHFTitleTextField name='quantity' disabled={disable.dimension} custom_label='تعداد' placeholder='2' />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 2, fontFamily: 'peyda-bold' }} variant='h5'>
                        لیست سفارش های ثبت شده
                    </Typography>
                    <Box>
                        <Scrollbar sx={{ maxHeight: 780 }}>
                            <Table size={'medium'}>
                                <TableHeadCustom
                                    sx={{
                                        backgroundColor: '#F2F2F2'
                                    }}
                                    cellSx={{ fontFamily: 'peyda-medium!important' }}
                                    headLabel={CartTableHead}
                                />
                                <TableBody>
                                    {data.map((item, index: number) => (
                                        <CartTableRow
                                            type={type}
                                            onDeleteRow={() => onDelete(item.id || index)}
                                            onEditRow={() => onUpdate(index)}
                                            selected={(listId === index)}
                                            key={index}
                                            row={{
                                                ...item,
                                                status: item.status,
                                                quality: item.quantity,
                                                coating: item?.coating_type,
                                                dimensions: item.dimension ? item.dimension.width + 'x' + item.dimension.height : '0*0',
                                                final_coating: item.cover_type?.name,
                                                frame_type: item.frame_type?.name,
                                                profile_type: item.profile_type?.name,
                                            }}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}