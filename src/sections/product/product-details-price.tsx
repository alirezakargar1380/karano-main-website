import { Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { IPriceList } from "src/types/price-list";
import { IProductCodes, IProductProperties, IProductPropertyValues } from "src/types/product";
import { endpoints, server_axios } from "src/utils/axios";
import { toFarsiNumber } from "src/utils/change-case";
import { fCurrency } from "src/utils/format-number";

interface Props {
    price: number
    dimention_id: number
    cover_type_id: number
    values: IProductProperties
    properties: IProductPropertyValues[]
    quantity: number
    product_code: IProductCodes
    updatePrice: (price: number) => void
}

export default function ProductDetailsPrice({
    price,
    dimention_id,
    cover_type_id,
    properties,
    quantity,
    values,
    product_code,
    updatePrice
}: Props) {
    const [newPrice, setNewPrice] = useState<IPriceList>()

    const [loading, setLoading] = useState<boolean>(false)

    // useEffect(() => {
    //     let property
    //     if (cover_type_id !== 0 && dimention_id !== 0) {
    //         property = properties.find((p) => (p?.dimension?.id == dimention_id && p?.cover_type?.id == cover_type_id))
    //     } else if (dimention_id !== 0) {
    //         property = properties.find((p) => (p?.dimension?.id == dimention_id))
    //     } else {
    //         property = properties.find((p) => (p?.cover_type?.id == cover_type_id))
    //     }

    //     if (property)
    //         setNewPrice(property.price * quantity)
    //     else
    //         setNewPrice(price * quantity)
    // }, [properties, dimention_id, cover_type_id, quantity])

    // useEffect(() => {
    //     updatePrice(newPrice)
    // }, [newPrice])

    const getNewPrice = async () => {
        const cleanedValues = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value?.id != 0)
        );

        server_axios.post(endpoints.price_list.search, {
            ...cleanedValues,
            code: { id: product_code.id }
        })
            .then(({ data }) => {

                setNewPrice(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        getNewPrice()
    }, [values.profile_type.id, values.coating_type, values.cover_type.id])

    return (newPrice) && (
        <Stack alignItems={'center'} direction={'row'} spacing={1.5}>
            <Typography variant="title3">قیمت:</Typography>

            {loading ?
                <Skeleton sx={{ width: '120px', height: 28 }} />
                :
                <>
                    <Typography variant="body2">
                        {toFarsiNumber(fCurrency(newPrice?.price))}
                    </Typography>

                    <Typography variant="caption2">ریال</Typography>
                </>
            }
        </Stack>
    )
}