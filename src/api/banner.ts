import { useMemo, useState } from "react";
import { useLocalStorage } from "src/hooks/use-local-storage";

export function useHandleBanner() {
    const { state, update, reset } = useLocalStorage("banner", "0"); // Initialize showBanner to true

    console.log(state.banner, state)

    const memoizedValue = useMemo(
        () => ({
            showBanner: state.banner == 1 ? true : false,
            toggle: () => update("banner", state.banner == "1" ? "0" : "1")
        }),
        [state.banner]
    );

    return memoizedValue;
}

export function useHideBanner() {
    const memoizedValue = useMemo(
        () => ({
            showBanner: false,
        }),
        []
    );

    return memoizedValue;
}