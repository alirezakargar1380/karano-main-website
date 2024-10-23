import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';

import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

import { useBoolean, useBooleanReturnType } from 'src/hooks/use-boolean';
import { DialogActions, DialogTitle,IconButton, Stack,  Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import { CartDialogView } from 'src/sections/cart/view';
import { LoadingButton } from '@mui/lab';
import { StyledRoundedWhiteButton } from '../styles/props/rounded-white-button';
import { useGetOrderForm } from 'src/api/order-form';
import { ICheckoutItemPropertyPrice } from 'src/types/checkout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import { IOrderProductPropertyStatus } from 'src/types/order-products-property';
import { endpoints, server_axios } from 'src/utils/axios';
import { DefaultDialog } from '../custom-dialog';
import SvgColor from '../svg-color';
import { useShowOneTime } from 'src/hooks/use-show-one-time';

// ----------------------------------------------------------------------
interface Props {
    dialog: useBooleanReturnType;
    order_form_id: number;
    pId?: number;
    product_name: string;
    type?: 'cart' | 'edit' | 'view';
    currentData?: ICheckoutItemPropertyPrice | undefined;
    listId?: number | undefined;
    listData?: ICheckoutItemPropertyPrice[] | undefined
    onAddCart: (data: ICheckoutItemPropertyPrice[]) => void;
    onDelete?: (propertyId: number) => void;
    handleUpdateRow?: (data: ICheckoutItemPropertyPrice[]) => void;
}

export default function CartDialog({
    dialog,
    order_form_id,
    pId,
    product_name,
    currentData,
    listId,
    listData,
    onAddCart,
    onDelete,
    handleUpdateRow,
    type = 'cart'
}: Props) {
    const { show, update } = useShowOneTime('edit-product-dialog');

    dialog.onTrue();

    const infoDialog = useBoolean();

    const [hasRejected, setHasRejected] = useState<boolean>(false);
    const [list, setList] = useState<ICheckoutItemPropertyPrice[]>([]);
    const [id, setId] = useState<null | number>(null);
    const { form, formLoading } = useGetOrderForm(order_form_id);

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        profile_type: Yup.number().required('نوع پروفایل الزامی است'),
        // profile_type: Yup.object().shape({
        //     id: Yup.number(),
        //     name: Yup.string(),
        // }),
        cover_type: Yup.number().required('نوع پوشش الزامی است'),
        frame_type: Yup.number().required('نوع قاب الزامی است'),
        quantity: Yup.number().required('تعداد الزامی است').typeError('تعداد باید عدد باشد'),
        dimension: Yup.object().shape({
            width: Yup.number().required('عرض الزامی است').typeError('عرض باید عدد باشد'),
            height: Yup.number().required('ارتفاع الزامی است').typeError('ارتفاع باید عدد باشد'),
        })
    });

    const defaultValues: any = {
        quantity: 1,
        dimension: {
            width: 0,
            height: 0,
        },
        profile_type: 0,
        cover_type: 0,
        frame_type: 0,
        coating_type: ''
    };

    if (currentData?.id) defaultValues.id = currentData.id;

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitted }
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            const custom = { ...data }
            if (form.profile_type) custom.profile_type = form.profile_type.find((item) => item.id === data.profile_type);
            if (form.cover_type) custom.cover_type = form.cover_type.find((item) => item.id === data.cover_type);
            if (form.frame_type) custom.frame_type = form.frame_type.find((item) => item.id === data.frame_type);

            if (id === null) {
                setList([
                    ...list,
                    {
                        ...custom
                    }
                ]);
            } else {
                let iid = id;
                setId(null); // felan khali bashe

                list[iid] = custom;
                if (handleUpdateRow && type === 'edit') list[iid].status = IOrderProductPropertyStatus.edited;
                setList([...list]);

                if (handleUpdateRow) await server_axios.patch(endpoints.orderProductProperties.update(list[iid].id), {
                    ...list[iid],
                    is_approved: null
                })
                    .then(({ data }) => { })


            }
        } catch (error) {
            console.error(error);
        }
    });

    const customizeData = useCallback((item: ICheckoutItemPropertyPrice) => {
        return {
            ...item,
            cover_type: item.cover_type.id,
            profile_type: item.profile_type.id,
            frame_type: item.frame_type.id,
            dimension: {
                width: item.dimension?.width || 0,
                height: item.dimension?.height || 0,
            }
        }
    }, [form]);

    useEffect(() => {
        if ((id || id === 0) && type === 'edit' && !show) {
            infoDialog.onTrue();
            update("1");
        }
    }, [id])

    useEffect(() => {
        if (listId === undefined || listId === null) return;
        setId(listId)
    }, [listId])

    useEffect(() => {
        if (id === null) reset(defaultValues);
    }, [id])

    useEffect(() => {
        if (id === null || !list.length) return;
        const item = list[id];
        reset(customizeData(item));
    }, [id, list])

    useEffect(() => {
        if (!currentData) return;
        reset(customizeData(currentData));
    }, [currentData])

    const handleUpdate = useCallback((itemId: number) => {
        setId(itemId)
    }, [setId])

    const handleAddToList = useCallback(() => {
        if (type === "edit") enqueueSnackbar("اصلاحات کالای مورد نظر با موفقیت ثبت شد.", {
            color: "info",
            variant: "myCustomVariant"
        })
        if (!list.length) return enqueueSnackbar("ابتدا دکمه «افزودن به لیست» و سپس دکمه «افزودن به سبد خرید» را کلیک کنید.", {
            variant: 'error'
        })

        if (handleUpdateRow !== undefined)
            handleUpdateRow(list)
        else {
            onAddCart(list);
            setList([]);
            reset(defaultValues);
        }
    }, [list, type]);

    const onDeleteRow = (propertyIndex: number) => {
        if (propertyIndex === id) return enqueueSnackbar("آیتم انتخاب شده قابل حذف نیست", {
            variant: 'error'
        })

        // remove from list
        let newList = [...list];
        newList.splice(propertyIndex, 1);
        setList(newList);

        // remove from checkout
        // if (pId) checkout.onDeleteCart(pId, propertyIndex);
    }

    useEffect(() => {
        if (!listData?.length) {
            if (!listData?.length && id === null && !list.length) return setList([]);
            return
        }
        setList(listData)
        const findRjected = listData.find((item) => item.status === IOrderProductPropertyStatus.denied);
        if (findRjected) setHasRejected(true)
    }, [listData, id]);

    return (
        <>
            <DefaultDialog
                open={infoDialog.value}
                title="اصلاح کالا"
                content="شما می‌توانید با اصلاح ویژگی‌های کالا، تغییرات مورد نظر خود را اعمال کنید."
                action={
                    <LoadingButton variant="contained" onClick={infoDialog.onFalse} sx={{
                        borderRadius: '50px',
                        px: 2
                    }}>
                        متوجه شدم
                    </LoadingButton>
                }
            />

            <Dialog open={dialog.value} onClose={dialog.onFalse} fullWidth={true} maxWidth={'xl'}>
                <DialogTitle sx={{ p: 0, px: '40px', pt: '40px' }}>
                    <Stack spacing={'24px'} direction={'row'}>
                        <Typography sx={{ borderBottom: '1px solid #D1D1D1', pb: 1.5, minWidth: '400px' }} variant='title1'>
                            {product_name}
                        </Typography>
                        <Stack direction={'row'} width={1} borderBottom={'1px solid #D1D1D1'} justifyContent={'space-between'}>
                            <Typography sx={{ pb: 2, fontFamily: 'peyda-bold' }} variant='title2'>
                                لیست سفارش های ثبت شده
                            </Typography>
                            <IconButton sx={{ mb: 1 }} onClick={dialog.onFalse}>
                                <SvgColor src='/assets/icons/navbar/x-close.svg' sx={{ width: 16, height: 16 }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{
                    px: 0,
                    borderBottomRightRadius: '16px',
                    borderBottomLeftRadius: '16px'
                }}>
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        {(!formLoading) && (
                            <CartDialogView
                                formOptions={form}
                                data={list}
                                listId={id}
                                values={values}
                                type={type}
                                setValue={(name: string, value: any) => setValue(name, value)}
                                onUpdate={handleUpdate}
                                onDelete={onDelete || onDeleteRow}
                                infoDialog={infoDialog.value}
                                onClose={dialog.onFalse}
                            />
                        )}
                    </FormProvider>
                </DialogContent>
                <DialogActions sx={{
                    p: '40px',
                    width: 1,
                    backgroundColor: '#F8F8F8',
                    overflow: 'hidden',
                    borderBottomRightRadius: '16px',
                    borderBottomLeftRadius: '16px'
                }}>
                    <Stack direction={'row'} justifyContent={'space-between'} width={1}>
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            <Stack direction={'row'} spacing={2} width={'400px'}>
                                {(id !== null && id >= 0) && (
                                    <>
                                        <StyledRoundedWhiteButton
                                            variant='outlined'
                                            sx={{ borderRadius: '24px', px: 4 }}
                                            onClick={() => setId(null)}
                                        >
                                            انصراف
                                        </StyledRoundedWhiteButton>
                                        <LoadingButton
                                            variant='contained'
                                            sx={{ borderRadius: '24px', px: 4 }}
                                            type='submit'
                                        >
                                            اعمال تغییرات
                                        </LoadingButton>
                                    </>
                                )}
                                {
                                    // (listId === undefined && id === null && !listData?.length)
                                    (id === null && type === 'cart')
                                    && (
                                        <StyledRoundedWhiteButton variant='outlined' type='submit' sx={{ px: 6, width: '400px' }}>
                                            افزودن به لیست
                                        </StyledRoundedWhiteButton>
                                    )}
                            </Stack>
                        </FormProvider>
                        <Stack direction={'row'} spacing={2}>
                            {(id === null) && (
                                <>
                                    <StyledRoundedWhiteButton variant='outlined' sx={{ px: 3 }} onClick={() => {
                                        dialog.onFalse();
                                        setList([]);
                                        setId(null);
                                    }}>
                                        انصراف
                                    </StyledRoundedWhiteButton>
                                    <LoadingButton
                                        variant='contained'
                                        sx={{ borderRadius: '24px', px: 4 }}
                                        onClick={handleAddToList}
                                        disabled={(type === 'edit') ?
                                            (hasRejected) ? !isSubmitted : false
                                            : false}
                                    >
                                        {(type === 'cart') ? 'افزودن به سبد خرید' : 'ثبت تغییرات'}
                                    </LoadingButton>
                                </>
                            )}
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}
