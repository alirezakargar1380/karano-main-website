import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { IProductPropertyValues } from "src/types/product";

interface Props {
    price: number
    dimention_id: number
    cover_type_id: number
    property_values: IProductPropertyValues[]
    quantity: number
    updatePrice: (price: number) => void
}

export default function ProductDetailsPrice({
    price,
    dimention_id,
    cover_type_id,
    property_values,
    quantity,
    updatePrice
}: Props) {
    const [newPrice, setNewPrice] = useState<number>(0)

    useEffect(() => {
        const property = property_values.find((p) => (p.dimension.id == dimention_id && p.cover_type.id == cover_type_id))
        if (property)
            setNewPrice(property.price * quantity)
        else
            setNewPrice(price * quantity)
    }, [property_values, dimention_id, cover_type_id])

    useEffect(() => {
        updatePrice(newPrice)
    }, [newPrice])

    return (
        <Stack sx={{ typography: 'h4!important' }} direction={'row'} spacing={1.5}>
            <Typography fontFamily={'peyda-bold'} variant="h4">قیمت:</Typography>


            <Typography fontFamily={'peyda-medium'} variant="h4">
                <CountUp useEasing start={price} end={newPrice} />
            </Typography>

            <Typography fontFamily={'peyda-light'} variant="h4">ریال</Typography>
        </Stack>
    )
}