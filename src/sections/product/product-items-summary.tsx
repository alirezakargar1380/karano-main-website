import { useEffect, useState } from "react"
import { IProductCoverType, IProductDimension } from "src/types/product";

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
        if (d) newText = newText + d.width + 'x' + d.height + 'x' + d.length + ", "

        setText(newText)
    }, [values])

    return (
        <>{text}</>
    )
}