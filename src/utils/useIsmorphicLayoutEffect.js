const isSSR = typeof window === "undefined" || !window.navigator;

export const useIsmophicLayoutEffect = isSSR ? useEffect : useLayoutEffect;
