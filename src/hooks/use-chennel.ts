export function useChannel(key: string) {
    const channel = new BroadcastChannel(key);

    return {
        channel
    }
}