import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { IProductPropertyValues } from "src/types/product";
import { toFarsiNumber } from "src/utils/change-case";
import { fCurrency } from "src/utils/format-number";

interface Props {
    price: number
    dimention_id: number
    cover_type_id: number
    properties: IProductPropertyValues[]
    quantity: number
    updatePrice: (price: number) => void
}

export default function ProductDetailsPrice({
    price,
    dimention_id,
    cover_type_id,
    properties,
    quantity,
    updatePrice
}: Props) {
    const [newPrice, setNewPrice] = useState<number>(0)

    useEffect(() => {
        let property
        if (cover_type_id !== 0 && dimention_id !== 0) {
            property = properties.find((p) => (p?.dimension?.id == dimention_id && p?.cover_type?.id == cover_type_id))
        } else if (dimention_id !== 0) {
            property = properties.find((p) => (p?.dimension?.id == dimention_id))
        } else {
            property = properties.find((p) => (p?.cover_type?.id == cover_type_id))
        }

        if (property)
            setNewPrice(property.price * quantity)
        else
            setNewPrice(price * quantity)
    }, [properties, dimention_id, cover_type_id, quantity])

    useEffect(() => {
        updatePrice(newPrice)
    }, [newPrice])

    return (
        <Stack alignItems={'center'} direction={'row'} spacing={1.5}>
            <Typography variant="title3">قیمت:</Typography>

            <Typography variant="body2">
                {toFarsiNumber(fCurrency(newPrice))}
            </Typography>

            <Typography variant="caption2">ریال</Typography>
        </Stack>
    )
}