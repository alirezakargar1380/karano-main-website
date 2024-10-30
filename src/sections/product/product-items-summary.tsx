import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { IProductCoverType, IProductDimension } from "src/types/product";
import { toFarsiNumber } from "src/utils/change-case";

interface Props {
    values: any;
    cover_type: IProductCoverType[]
    dimension: IProductDimension[]
}

export const ProductItemsSummary = ({ values, cover_type, dimension }: Props) => {
    const [text, setText] = useState('')

    useEffect(() => {
        setText('')
        let newText = ''
        const ct = cover_type?.find((cover_type) => cover_type.id == values?.cover_type_id)
        if (ct) newText = newText + ct.name + ", "

        const d = dimension?.find((dimension) => dimension.id == values?.dimension_id)
        if (d) newText = newText + toFarsiNumber(d.width) + 'x' + toFarsiNumber(d.height) + 'x' + toFarsiNumber(d.length) + ", "

        setText(newText)
    }, [values])

    return (
        <Typography variant="title3">{text}</Typography>
    )
}