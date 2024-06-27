import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { IProductPropertyValues } from "src/types/product";

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

        console.log('property', property)

        if (property)
            setNewPrice(property.price * quantity)
        else
            setNewPrice(price * quantity)
    }, [properties, dimention_id, cover_type_id, quantity])

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