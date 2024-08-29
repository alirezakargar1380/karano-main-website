import { useMemo } from "react";
import { useLocalStorage } from "src/hooks/use-local-storage";

export function useShowOneTime(section_name: string) {
    const { state, update } = useLocalStorage(section_name, "0");

    const memoizedValue = useMemo(
        () => ({
            show: state[section_name] == 1 ? true : false,
            toggle: () => update(section_name, state[section_name] == "1" ? "0" : "1")
        }),
        [state[section_name], update, state]
    );

    return memoizedValue;
}