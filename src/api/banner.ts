import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "src/hooks/use-local-storage";

export function useHandleBanner() {
    const { state, update, reset } = useLocalStorage("banner", "0"); // Initialize showBanner to true

    const memoizedValue = useMemo(
        () => ({
            showBanner: state.banner == 1 ? true : false,
            toggle: () => update("banner", state.banner == "1" ? "0" : "1")
        }),
        [state.banner, update]
    );

    return memoizedValue;
}