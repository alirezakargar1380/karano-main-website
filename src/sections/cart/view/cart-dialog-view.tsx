import {
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    TableBody,
    Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { RHFRadioGroup, RHFRadioGroupWithImage } from 'src/components/hook-form';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import CartTableRow from '../cart-table-row';
import { TableHeadCustom } from 'src/components/table';
import RHFTitleTextField from 'src/components/hook-form/rhf-title-text-field';
import { CoatingType, EAlgorithm, EBackToBackDimension, EFrameCore, IProductDefaultDetails, ProductOrderType } from 'src/types/product';
import { endpoints } from 'src/utils/axios';
import { useCallback, useEffect, useState } from 'react';
import IncrementerButton from 'src/sections/product/common/incrementer-button';
import { ICheckoutItemPropertyPrice } from 'src/types/checkout';
import Joyride, { TooltipRenderProps } from 'react-joyride';
import Iconify from 'src/components/iconify';
import { SecondaryButton } from 'src/components/styles/buttons/secondary';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import Image from 'src/components/image';
import { useShowOneTime } from 'src/hooks/use-show-one-time';
import { PrimaryButton } from '../../../components/styles/buttons/primary';
import { toFarsiNumber } from '../../../utils/change-case';
import { ECoatingTexture, ECoverEdgeTape } from 'src/types/cart';
import { useGetProductRoomDoor } from 'src/api/product';

const frame_width = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export function getHeadLabel(algorithm: EAlgorithm, order_type: ProductOrderType) {
    const defult = order_type === ProductOrderType.custom_made ? [
        { id: 'dimension', label: 'ابعاد', width: 110 },
        { id: 'quntity', label: 'تعداد', width: 110 },
        { id: 'zzz', width: 88 },
    ] : [
        { id: 'quntity', label: 'تعداد', width: 110 },
        { id: 'zzz', width: 88 },
    ]
    switch (algorithm) {
        case EAlgorithm.room_door:
            return [
                { id: 'createdAt', label: 'پوشش نهایی', width: 160 },
                { id: 'inventoryType', label: 'نوع قاب', width: 160 },
                { id: 'price', label: 'روکش گیری', width: 140 },
                { id: 'frame_width', label: 'پهنای چارچوب', width: 140 },
                { id: 'frame_core', label: 'مغز چارچوب', width: 200 },
                { id: 'rim', label: 'زهوار', width: 260 },
                ...defult
            ];
        case EAlgorithm.cabinet_door:
            return [
                { id: 'name', label: 'نوع پروفیل', width: 140 },
                { id: 'createdAt', label: 'پوشش نهایی', width: 120 },
                { id: 'inventoryType', label: 'نوع قاب', width: 140 },
                { id: 'coating_texture', label: 'نوع بافت روکش', width: 140 },
                { id: 'price', label: 'روکش گیری', width: 140 },
                ...defult
            ];
        case EAlgorithm.cover_sheet:
            if (order_type === ProductOrderType.custom_made) {
                return [
                    { id: "cover_type", label: "نوار لبه روکش" },
                    { id: "inlaid_flower", label: "بافت روکش" },
                    ...defult
                ];
            } else {
                return [
                    { id: "cover_type", label: "نوار لبه روکش" },
                    ...defult
                ];
            }
        case EAlgorithm.cabinet_cloumn:
            if (order_type === ProductOrderType.custom_made) {
                return [
                    { id: 'createdAt', label: 'پوشش نهایی', width: 160 },
                    { id: "inlaid_flower", label: "گل منبت" },
                    { id: "inlaid_flower_emty_space", label: "زمینه خالی جهت منبت" },
                    ...defult
                ];
            } else {
                return [
                    { id: 'createdAt', label: 'پوشش نهایی' },
                    ...defult
                ];
            }
        case EAlgorithm.room_door:
            return [
                { id: "cover_type", label: "نوار لبه روکش" },
                { id: "inlaid_flower", label: "بافت روکش" },
                ...defult
            ];
        case EAlgorithm.shutter_door:
            return [
                { id: 'createdAt', label: 'پوشش نهایی' },
                // { id: "cover_type", label: "نوار لبه روکش" },
                // { id: "inlaid_flower", label: "بافت روکش" },
                ...defult
            ];
    }
}

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
    listIndex: number | null
    product_id: number;
    formOptions: IProductDefaultDetails
    data: ICheckoutItemPropertyPrice[]
    algorithm: EAlgorithm;
    order_type: ProductOrderType;
    type?: 'cart' | 'edit' | 'view';
    onUpdate: (id: number) => void
    onDelete: (propertyId: number) => void
    setValue: (name: string, value: any) => void
    infoDialog: boolean
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
            {step.title && <Typography mt={1} variant={'title2'}>{step.title}</Typography>}
            <Stack direction={'row'} alignItems={'center'}>
                <IconButton  {...primaryProps}>
                    <Iconify id="next" icon={'icon-park-outline:left'} />
                </IconButton>
                <Stack direction={'row'} mt={1} spacing={1}>
                    <Typography>{toFarsiNumber(index + 1)}</Typography>
                    <Box>/</Box>
                    <Typography border={'1px solid #D1D1D1'} borderRadius={'8px'} px={0.5}>
                        {toFarsiNumber(steps.length)}
                    </Typography>
                </Stack>
                <IconButton {...backProps}>
                    <Iconify id="back" icon={'icon-park-outline:right'} />
                </IconButton>
            </Stack>
        </Stack>
        <CardContent sx={{ direction: 'ltr', textAlign: 'left', px: 0, typography: 'body4' }}>{step.content}</CardContent>
        <Box sx={{ direction: 'rtl' }}>
            {(steps.length === (index + 1)) ? (
                <>
                    <PrimaryButton size={'small'} sx={{ ml: 1, height: '36px' }} {...closeProps}>
                        <Box id="close">متوجه شدم</Box>
                    </PrimaryButton>
                    <SecondaryButton size={'small'} sx={{ height: '36px' }} {...backProps}>
                        <Box id="back">مرحله قبل</Box>
                    </SecondaryButton>
                </>
            ) : (
                <>
                    <SecondaryButton size={'small'} sx={{ mt: 0, ml: 1, fontFamily: 'peyda-bold' }} {...primaryProps}>
                        <Box id="next">مرحله بعد</Box>
                    </SecondaryButton>
                    <Button color={"inherit"} sx={{ mt: 0, fontFamily: 'peyda-bold' }} {...closeProps}>
                        <Box id="close">بستن راهنما</Box>
                    </Button>
                </>
            )}
        </Box>
    </Card>
);

export default function CartDialogView({
    formOptions,
    product_id,
    data,
    listIndex,
    type,
    algorithm,
    onUpdate,
    onDelete,
    setValue,
    order_type,
    infoDialog,
    values,
}: Props) {

    const { door } = useGetProductRoomDoor(product_id, algorithm);

    const [ind, setInd] = useState<number | undefined>();

    const [maxHeight, setMaxHeight] = useState(400);

    const [editDimention, setEditDimension] = useState<boolean>(false);

    const { show, update } = useShowOneTime("spot-light");

    useEffect(() => {
        const updateMaxHeight = () => {
            const dialogContent = document.querySelector('.MuiDialogContent-root');
            if (dialogContent) {
                setMaxHeight(dialogContent.clientHeight);
            }
        };

        updateMaxHeight();
        window.addEventListener('resize', updateMaxHeight);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);

    const [disable, setDisable] = useState({
        profile_type: true,
        cover_type: true,
        frame_type: true,
        coating_type: true,
        inlaid_flower: true,
        coating_texture: true,
        dimension: true,
        back_to_back_dimension: true,
        raised_rim: true,
    });

    const [state, setState] = useState({
        run: false,
        loading: false,
        stepIndex: 0,
        modalOpen: false,
    });

    useEffect(() => {
        setInd(data.findIndex((d) => d.status === IOrderProductPropertyStatus.denied))
    }, []);

    useEffect(() => {
        if (!infoDialog && !show && data.find((item) => item.status === IOrderProductPropertyStatus.denied))
            setTimeout(() => setState({ ...state, run: true }), 1000);
        else
            setTimeout(() => setState({ ...state, run: false }), 1000);
    }, [infoDialog])

    // disable algorithm
    useEffect(() => {
        let newDisable = { ...disable };

        const findCover = formOptions.cover_type.find((p: any) => p.id == values.cover_type);
        const findFrame = formOptions.frame_type.find((p: any) => p.id == values.frame_type);

        switch (algorithm) {
            case EAlgorithm.room_door:
                if (+values?.dimension?.length > 0 && +values.dimension?.width > 0)
                    newDisable.cover_type = false

                if (values.cover_type)
                    newDisable.frame_type = false

                if (values.frame_type)
                    newDisable.coating_type = false

                if (values.coating_type || findCover?.is_raw || findFrame?.is_glass)
                    newDisable.back_to_back_dimension = false

                if (values.frame_type && !findFrame?.is_glass && !findCover?.is_raw)
                    newDisable.coating_type = false
                else
                    newDisable.coating_type = true

                // if (findCover?.is_raw == true)
                //     newDisable.back_to_back_dimension = true

                if (values.back_to_back_dimension)
                    newDisable.raised_rim = false

                if (values.raised_rim)
                    newDisable.dimension = false

                break;
            case EAlgorithm.cabinet_door:

                if (+values?.dimension?.length > 0 && +values.dimension?.width > 0)
                    newDisable.profile_type = false

                if (values.profile_type)
                    newDisable.cover_type = false

                // if (
                //     (values.dimension?.length <= 21 || values.dimension?.width <= 21) &&
                //     values.dimension?.length !== '' && values.dimension?.width !== '' && !editDimention
                // ) {
                //     newDisable.profile_type = true
                // }

                if (values.cover_type)
                    newDisable.frame_type = false

                if (values.frame_type && !findFrame?.is_glass && !findCover?.is_raw)
                    newDisable.coating_texture = false

                if (values.coating_texture && !findFrame?.is_glass && !findCover?.is_raw)
                    newDisable.coating_type = false

                if (values.coating_type)
                    newDisable.dimension = false

                if (findFrame?.is_glass === true || findCover?.is_raw === true)
                    newDisable.dimension = false

                break;
            case EAlgorithm.cabinet_cloumn:
                if (+values?.dimension?.length > 0 && +values.dimension?.width > 0)
                    newDisable.cover_type = false

                if (values.cover_type)
                    newDisable.inlaid_flower = false


                if (values.cover_type)
                    newDisable.dimension = false

                break;
            case EAlgorithm.cover_sheet:
                // if (+values?.dimension?.length > 0 && +values.dimension?.width > 0)
                //     newDisable.cover_type = false;

                newDisable.coating_texture = false
                newDisable.dimension = false
                break;
            case EAlgorithm.shutter_door:
                newDisable.cover_type = false
                break;

        }

        setDisable(newDisable);
    }, [values, formOptions]);

    // if user has updating data, enable all form
    useEffect(() => {
        if (listIndex || listIndex === 0) {
            setDisable({
                profile_type: false,
                cover_type: false,
                frame_type: false,
                coating_type: false,
                inlaid_flower: false,
                coating_texture: false,
                dimension: false,
                back_to_back_dimension: false,
                raised_rim: false,
            })
        }
        // else {
        //     setDisable({
        //         profile_type: false,
        //         cover_type: true,
        //         frame_type: true,
        //         coating_type: true,
        //         inlaid_flower: true,
        //         dimension: true
        //     })
        // }
    }, [listIndex])

    // handle change value for raw profile and glass covers!
    useEffect(() => {
        if (algorithm === EAlgorithm.cabinet_door || algorithm === EAlgorithm.room_door) {
            const findCover = formOptions.cover_type.find((p: any) => p.id == values.cover_type);
            const findFrame = formOptions.frame_type.find((p: any) => p.id == values.frame_type);

            if (findFrame?.is_glass || findCover?.is_raw) {
                setDisable({
                    ...disable,
                    coating_type: true,
                    coating_texture: true,
                })
                setValue('coating_type', CoatingType.none)
                setValue('coating_texture', ECoatingTexture.none)
            }
        }

        // if (algorithm === EAlgorithm.room_door) {
        //     const findCover = formOptions.cover_type.find((p: any) => p.id == values.cover_type);
        //     if (findCover?.is_raw) {
        //         setDisable({
        //             ...disable,
        //             back_to_back_dimension: true,
        //         })
        //         setValue('back_to_back_dimension', EBackToBackDimension.none)
        //     }
        // }
    }, [values.frame_type, values.cover_type])

    const handleJoyrideCallback = (data: any) => {
        const { action } = data;

        if (action === "close") {
            update("1")
            setState({ ...state, run: false })
        }
    };

    // build frame types options based on dimension
    const frame_types = useCallback(() => {

        let frame_types = [...formOptions.frame_type.map((frame_type) => {
            return {
                label: frame_type.name,
                value: frame_type.id,
            }
        })]

        if (algorithm !== EAlgorithm.cabinet_door || values.dimension?.length === '' || values.dimension?.width === '')
            return frame_types

        const profile_type = formOptions.profile_type.find((type) => type.id == values.profile_type)

        if (values.dimension?.length <= 29 || values.dimension?.width <= 29) {
            frame_types = frame_types.filter((frame_type) => {
                return frame_type.label.includes('شیشه') === false
            })

            if (profile_type?.name.includes('کابینتی')) {
                frame_types = frame_types.filter((frame_type) => {
                    return frame_type.label.includes('تخت') === true
                })
            }

            // const find = frame_types.find((ft) => ft.value == values.frame_type)
            // if (!find && values.frame_type != 0) setValue('frame_type', 0)
        }

        if (values.dimension?.length <= 21 || values.dimension?.width <= 21) {
            frame_types = frame_types.filter((frame_type) => {
                return frame_type.label.includes('تخت') === true
            })

            // const findFrame = formOptions.frame_type.find((p) => p.name.includes('تخت'))
            // if (findFrame && values.frame_type != findFrame?.id)
            //     setValue('frame_type', findFrame.id)

            // const findKesho = formOptions.profile_type.find((p) => p.name.includes('کشو'))
            // if (findKesho && values.profile_type != findKesho?.id)
            //     setValue('profile_type', findKesho.id)
        }

        return frame_types
    }, [values.dimension, values.profile_type, values.frame_type, editDimention])

    // set value for frame types options based on dimension
    useEffect(() => {
        if (editDimention === true || algorithm !== EAlgorithm.cabinet_door || values.dimension?.length === '' || values.dimension?.width === '')
            return

        const profile_type = formOptions.profile_type.find((type) => type.id == values.profile_type)

        if (values.dimension?.length <= 29 || values.dimension?.width <= 29) {
            if (values.frame_type != 0) setValue('frame_type', 0)

            if (profile_type?.name.includes('کابینتی')) {
                const findFrame = formOptions.frame_type.find((p) => p.name.includes('تخت'))
                if (findFrame && values.frame_type != findFrame?.id)
                    setValue('frame_type', findFrame.id)
            }
        }

        if (values.dimension?.length <= 21 || values.dimension?.width <= 21) {

            const findFrame = formOptions.frame_type.find((p) => p.name.includes('تخت'))
            if (findFrame && values.frame_type != findFrame?.id)
                setValue('frame_type', findFrame.id)


            // const findKesho = formOptions.profile_type.find((p) => p.name.includes('کشو'))
            // if (findKesho && values.profile_type != findKesho?.id)
            //     setValue('profile_type', findKesho.id)
        }
    }, [values.dimension.length, values.dimension.width, editDimention])

    return (
        <Box sx={{ px: '40px' }}>
            {(!show) && (
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
                        autoOpen: state.run,
                        hideArrow: true,
                    }}
                />
            )}

            <Stack direction={'row'} spacing={'24px'}>
                <Scrollbar
                    sx={{
                        width: '400px',
                        maxHeight,
                    }}
                >
                    <Box>
                        <Typography sx={{ py: '12px' }} variant='title2' color={'#727272'} display={'block'}>
                            ویژگی های مورد نظر را انتخاب کنید
                        </Typography>

                        {(order_type === ProductOrderType.custom_made) && (
                            <Box width={1} pb={'24px'} sx={{ borderBottom: '1px solid #D1D1D1' }}>
                                <Typography
                                    variant="title3"
                                    fontFamily={'peyda-bold'}
                                    sx={{
                                        width: 1, pb: '16px'
                                    }}
                                >
                                    ابعاد
                                </Typography>
                                <Stack
                                    direction={'row'}
                                    spacing={2}
                                    columnGap={2}
                                    rowGap={3}
                                    display="grid"
                                    gridTemplateColumns={{
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    }}>
                                    <RHFTitleTextField name='dimension.width'
                                        onFocus={() => {
                                            console.log('enter edit')
                                            setEditDimension(true)
                                        }}
                                        onBlur={() => {
                                            console.log('close edit')
                                            setEditDimension(false)
                                        }}
                                        // disabled={disable.dimension}
                                        custom_label='عرض (سانتی‌متر)'
                                        placeholder='افزودن محتوا'
                                    />
                                    <RHFTitleTextField name='dimension.length'
                                        onFocus={() => {
                                            console.log('enter edit')
                                            setEditDimension(true)
                                        }}
                                        onBlur={() => {
                                            console.log('close edit')
                                            setEditDimension(false)
                                        }}
                                        // disabled={disable.dimension}
                                        custom_label='طول - راه روکش (سانتی‌متر) '
                                        placeholder='افزودن محتوا'
                                    />
                                </Stack>
                            </Box>
                        )}

                    </Box>

                    {(formOptions.profile_type?.length > 0) && (
                        <Box width={1} sx={{ py: '24px', borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{ width: 1, pb: '16px' }}>
                                نوع پروفیل
                            </Typography>

                            <RHFRadioGroup
                                name='profile_type'
                                row
                                sx={{
                                    width: 1,
                                    display: 'grid',
                                    rowGap: 1,
                                    gridTemplateColumns: {
                                        xs: 'repeat(1, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                    },
                                }}
                                disabled={disable.profile_type}
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
                    )}

                    {formOptions.cover_type?.length > 0 && (
                        <Box sx={{ py: '24px', borderBottom: '1px solid #D1D1D1' }}>
                            <Typography
                                variant="title3"
                                fontFamily={'peyda-bold'}
                                sx={{
                                    width: 1,
                                    pb: '16px'
                                }}
                            >
                                پوشش نهایی
                            </Typography>
                            <RHFRadioGroupWithImage
                                name='cover_type'
                                disabled={disable.cover_type}
                                sx={{
                                    width: 1,
                                    display: 'grid',
                                    rowGap: 1,
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

                    {(formOptions.frame_type?.length > 0) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                نوع قاب
                            </Typography>
                            <RHFRadioGroup
                                name='frame_type'
                                disabled={disable.frame_type}
                                row
                                sx={{
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
                                options={frame_types()}
                            />
                        </Box>
                    )}

                    {(algorithm === EAlgorithm.cover_sheet || algorithm === EAlgorithm.cabinet_door) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                نوع بافت روکش:
                            </Typography>
                            <RHFRadioGroup
                                name='coating_texture'
                                row
                                disabled={disable.coating_texture}
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
                                        label: 'بلوط رگه راست',
                                        value: ECoatingTexture.right_vein
                                    },
                                    {
                                        label: 'بلوط موج دار',
                                        value: ECoatingTexture.wavy
                                    },
                                ]}
                            />
                        </Box>
                    )}

                    {(formOptions.coating_type === true) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
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
                                helperText={'روکش‌گیری جناقی به صورت هشتی انجام می‌شود.'}
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
                    )}

                    {(algorithm === EAlgorithm.cover_sheet && order_type === ProductOrderType.custom_made) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                نوار لبه روکش:
                            </Typography>
                            <RHFRadioGroup
                                name='cover_edge_tape'
                                row
                                // disabled={disable.inlaid_flower}
                                sx={{
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
                                options={[
                                    {
                                        label: 'ندارد',
                                        value: ECoverEdgeTape.does_not_have
                                    },
                                    {
                                        label: '1 طول و 1 عرض',
                                        value: ECoverEdgeTape.length_width
                                    },
                                    {
                                        label: '4 طرف',
                                        value: ECoverEdgeTape.sides
                                    },
                                ]}
                            />
                        </Box>
                    )}

                    {(algorithm === EAlgorithm.room_door) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                ابعاد پشت تا پشت:
                            </Typography>
                            <RHFRadioGroup
                                name='back_to_back_dimension'
                                row
                                disabled={disable.back_to_back_dimension}
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
                                        label: 'لنگه',
                                        value: EBackToBackDimension.lame
                                    },
                                    {
                                        label: 'چهارچوب',
                                        value: EBackToBackDimension.framework
                                    },
                                ]}
                            />
                        </Box>
                    )}

                    {(algorithm === EAlgorithm.room_door && values.back_to_back_dimension === EBackToBackDimension.framework) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                پهنای چارچوب:
                            </Typography>
                            <RHFRadioGroup
                                name='frame_width'
                                row
                                // disabled={disable.inlaid_flower}
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
                                options={frame_width.map((width) => {
                                    return {
                                        label: width + " سانتی متر",
                                        value: width.toString()
                                    }
                                })}
                            />
                        </Box>
                    )}

                    {(algorithm === EAlgorithm.room_door && values.back_to_back_dimension === EBackToBackDimension.lame) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                مغز چارچوب:
                            </Typography>
                            <RHFRadioGroup
                                name='frame_core'
                                row
                                // disabled={disable.inlaid_flower}
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
                                        label: 'ترکیب چوب و ام دی اف',
                                        value: EFrameCore.mdf
                                    },
                                    {
                                        label: 'پلای وود',
                                        value: EFrameCore.ply
                                    },
                                ]}
                            />
                        </Box>
                    )}

                    {(door?.is_raised === true) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                زهوار برجسته :
                            </Typography>
                            <RHFRadioGroup
                                name='has_raised_rim'
                                row
                                disabled={disable.raised_rim}
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
                                        label: 'دارد',
                                        value: 1
                                    },
                                    {
                                        label: 'ندارد',
                                        value: 0
                                    },
                                ]}
                            />
                        </Box>
                    )}

                    {(values.has_raised_rim === true || values.has_raised_rim === "1") && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                نوع زهوار برجسته :
                            </Typography>
                            <RHFRadioGroup
                                name='raised_rim'
                                row
                                // disabled={disable.inlaid_flower}
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
                                options={formOptions.raised_rims.map((item) => ({
                                    label: "(" + item.code + ")" + " " + item.name,
                                    value: item.id
                                }))}
                            />
                        </Box>
                    )}

                    {(algorithm === EAlgorithm.cabinet_cloumn && order_type === ProductOrderType.custom_made) && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <Typography variant="title3" fontFamily={'peyda-bold'} sx={{
                                width: 1, pb: '16px'
                            }}>
                                گل منبت
                            </Typography>
                            <RHFRadioGroup
                                name='inlaid_flower'
                                row
                                disabled={disable.inlaid_flower}
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
                                        label: 'دارد',
                                        value: "1"
                                    },
                                    {
                                        label: 'ندارد',
                                        value: "0"
                                    }
                                ]}
                            />
                        </Box>
                    )}

                    {(values.inlaid_flower === false || values.inlaid_flower === "0") && (
                        <Box sx={{ py: "24px", borderBottom: '1px solid #D1D1D1' }}>
                            <RHFTitleTextField name='inlaid_flower_emty_space' custom_label='زمینه خالی جهت منبت (سانتی متر)' placeholder='26' />
                        </Box>
                    )}

                    <Box sx={{ py: "24px" }}>
                        <Typography variant="body3" fontFamily={'peyda-bold'} sx={{
                            width: 1, pb: '8px', pt: '24px'
                        }}>
                            تعداد
                        </Typography>
                        <IncrementerButton
                            name="quantity"
                            onDecrease={() => setValue('quantity', values.quantity ? values.quantity + 1 : 1)}
                            onIncrease={() => {
                                if (values.quantity != 1)
                                    setValue('quantity', values.quantity ? values.quantity - 1 : 1)
                            }}
                        />
                    </Box>
                </Scrollbar>
                <Scrollbar sx={{ maxHeight }}>
                    {data.length ? (
                        <Table size={'medium'}>
                            <TableHeadCustom
                                sx={{
                                    backgroundColor: '#F2F2F2'
                                }}
                                cellSx={{ fontFamily: 'peyda-medium!important' }}
                                headLabel={getHeadLabel(algorithm, order_type)}
                            />
                            <TableBody>
                                {data.map((item, index: number) => (
                                    <CartTableRow
                                        key={index}
                                        index={index}
                                        indexEqual={ind}
                                        onDeleteRow={() => onDelete(item.id || index)}
                                        onEditRow={() => onUpdate(index)}
                                        algorithm={algorithm}
                                        order_type={order_type}
                                        selected={(listIndex === index)}
                                        type={type}
                                        row={{
                                            ...item,
                                            status: item.status,
                                            quality: item.quantity,
                                            coating: item?.coating_type,
                                            dimensions: item.dimension ? item.dimension.length + 'x' + item.dimension.width : '0x0',
                                            final_coating: item.cover_type?.name,
                                            frame_type: item.frame_type?.name,
                                            profile_type: item.profile_type?.name,
                                            raised_rim: item.raised_rim?.name + " (" + item.raised_rim?.code + ")",
                                        }}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Box sx={{ width: 1, textAlign: 'center', my: 14 }}>
                            <Image src='/assets/images/cart/Empty State.png' />
                        </Box>
                    )}
                </Scrollbar>
            </Stack>

        </Box>
    );
}
