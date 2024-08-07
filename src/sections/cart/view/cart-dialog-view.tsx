import {
    Button,
    Card,
    CardContent,
    DialogTitle,
    Grid, IconButton, Stack, TableBody, Typography
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
import Iconify from 'src/components/iconify';
import { StyledRoundedWhiteButton } from 'src/components/styles/props/rounded-white-button';
import SvgColor from 'src/components/svg-color';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import Image from 'src/components/image';

export const CartTableHead = [
    { id: 'name', label: 'نوع پروفیل', width: 160 },
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
    type?: 'cart' | 'edit' | 'view';
    onUpdate: (id: number) => void
    onDelete: (propertyId: number) => void
    onClose: () => void
    setValue: (name: string, value: any) => void
    values: any
}


const steps = [
    {
        target: '.my-first-step',
        title: 'وضعیت ردشده',
        content: 'کالاهایی که وضعیت رد‌شده دارند، توسط ادمین تایید نشده‌اند.',
        disableBeacon: true,
    },
    {
        target: '.reason',
        title: 'مشاهده علت',
        content: 'توضیحات ادمین برای دلایل رد محصول از طریق این دکمه نمایش داده می‌شود.',
        disableBeacon: true,
    },
    {
        target: '.edit',
        title: 'ویرایش محصول',
        content: 'با کلیک بر روی این آیکون،می‌توانید سفارش خود را ویرایش و جهت بررسی دوباره، برای ادمین ارسال کنید.',
        disableBeacon: true,
    },
    {
        target: '.del',
        title: 'حذف محصول',
        content: 'در صورتی که مایل باشید میتوانید محصول رد شده را از سبد خرید حذف کنید.',
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
    <Card sx={{ p: 2.5, direction: 'rtl', borderRadius: '24px', minWidth: 320, maxWidth: 320 }} {...tooltipProps}>

        <Stack direction={'row-reverse'} justifyContent={'space-between'} borderBottom={'1px solid #D1D1D1'} pb={2}>
            {step.title && <Typography mt={1} fontFamily={'peyda-bold'}>{step.title}</Typography>}
            <Stack direction={'row'}>
                <IconButton  {...primaryProps}>
                    <Iconify id="next" icon={'icon-park-outline:left'} />
                </IconButton>
                <Stack direction={'row'} mt={1} spacing={1}>
                    <Typography>{(index + 1)}</Typography>
                    <Box>/</Box>
                    <Typography border={'1px solid #D1D1D1'} borderRadius={'8px'} px={0.5}>{steps.length}</Typography>
                </Stack>
                <IconButton {...backProps}>
                    <Iconify id="back" icon={'icon-park-outline:right'} />
                </IconButton>
            </Stack>
        </Stack>
        <CardContent sx={{ direction: 'ltr', textAlign: 'left', px: 0, fontFamily: 'peyda-regular' }}>{step.content}</CardContent>
        <Box sx={{ direction: 'rtl' }}>
            {/* {index > 0 && (
                <Button {...backProps}>
                    <Typography id="back">back</Typography>
                </Button>
            )} */}
            {/* {continuous && ( */}
            {/* <Button {...primaryProps}>
                <Typography id="next">next</Typography>
            </Button> */}
            {/* )} */}
            {/* {!continuous && ( */}
            <StyledRoundedWhiteButton variant="outlined" sx={{ mt: 0 }} {...closeProps}>
                <Box id="close">متوجه شدم</Box>
            </StyledRoundedWhiteButton>
            {/* )} */}
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
    onClose,
    setValue,
    values,
}: Props) {
    const [ind, setInd] = useState<number | undefined>()

    const [disable, setDisable] = useState((type === "edit" || listId || listId === 0) ? {
        profile_type: false,
        cover_type: false,
        frame_type: false,
        coating_type: false,
        dimension: false
    } : {
        profile_type: false,
        cover_type: true,
        frame_type: true,
        coating_type: true,
        dimension: true
    });

    const [state, setState] = useState({
        run: false,
        loading: false,
        stepIndex: 0,
        modalOpen: false,
    });

    useEffect(() => {
        setTimeout(() => setState({ ...state, run: true }), 1000 / 2);
        setInd(data.findIndex((d) => d.status === IOrderProductPropertyStatus.denied))
    }, []);

    useEffect(() => {
        // check for wich one is the first
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
    }, [values, formOptions]);

    const handleJoyrideCallback = (data: any) => {
        const { action, index, status, type } = data;

        if (action === "close") setState({ ...state, run: false })

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
                        borderRadius: 100
                    }
                }}
                floaterProps={{
                    // autoOpen: true,
                    autoOpen: state.run,
                    hideArrow: true,
                }}
            />

            <Box sx={{ pl: 3, pt: 3 }}>
                <Grid container spacing={4} sx={{ width: 1 }}>
                    <Grid item xs={12} md={4}>
                        <DialogTitle sx={{ p: 0 }}>
                            <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 1.5 }} variant='h4'>
                                {title}
                            </Typography>
                        </DialogTitle>
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
                                disabled={disable.dimension}
                                onDecrease={() => setValue('quantity', values.quantity ? values.quantity + 1 : 1)}
                                onIncrease={() => {
                                    if (values.quantity != 1)
                                        setValue('quantity', values.quantity ? values.quantity - 1 : 1)
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DialogTitle sx={{ p: 0 }}>
                            <Stack direction={'row'} borderBottom={'1px solid #D1D1D1'} justifyContent={'space-between'}>
                                <Typography sx={{ pb: 2, fontFamily: 'peyda-bold' }} variant='h5'>
                                    لیست سفارش های ثبت شده
                                </Typography>
                                <IconButton sx={{ mb: 1 }} onClick={onClose}>
                                    <SvgColor src='/assets/icons/navbar/x-close.svg' sx={{ width: 16, height: 16 }} />
                                </IconButton>
                            </Stack>
                        </DialogTitle>
                        <Box>
                            {data.length ? (
                                <Scrollbar>
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
                                                    key={index}
                                                    index={index}
                                                    indexEqual={ind}
                                                    onDeleteRow={() => onDelete(item.id || index)}
                                                    onEditRow={() => onUpdate(index)}
                                                    selected={(listId === index)}
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
                            ) : (
                                <Box sx={{ width: 1, textAlign: 'center', my: 24 }}>
                                    <Image src='/assets/images/cart/Empty State.png' />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}