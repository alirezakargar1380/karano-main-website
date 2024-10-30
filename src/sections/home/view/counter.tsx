import { useEffect, useState } from "react";
import { toFarsiNumber } from "src/utils/change-case";

interface Props {
    end: number
}

export function Counter({ end }: Props) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const ease = 0.09; // adjust the ease value to your liking
        const progress = counter / end; // calculate the progress towards the target value

        const intervalTime = Math.max(10, (1 - progress) * (1 - progress) * 1000 * ease);

        const intervalId = setInterval(() => {
            if (counter < end) {
                setCounter((c) => c + 1);
            } else {
                clearInterval(intervalId);
            }
        }, intervalTime); // adjust the interval time as needed
        return () => clearInterval(intervalId); // clean up the interval
    }, [counter])

    return (<>{toFarsiNumber(counter)}</>)
}