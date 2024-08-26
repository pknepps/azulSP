import {useState, useEffect, EffectCallback, DependencyList, useRef} from "react";

/** If a window to view exists. */
const hasWindow = typeof window !== 'undefined';

/**
 * A custom hook which retrieves the dimensions of the current window, with each dimension being
 * null if no browser instance exists.
 * @returns an object with 2 number fields: height and width, being the height and width of the
 *      window respectively.
 */
export function useWindowDimensions() : {width: number | null, height: number | null} {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    try {
        useEffect(() => {
            if (typeof window !== "undefined") {
                let handleResize = () => {
                    setWindowDimensions(getWindowDimensions());
                }

                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }
        }, []);
    } catch (e) {
        console.log(e);
    }
    return windowDimensions;
}

/**
 * Gets the dimensions of the current window.
 * @return The height and width of the current window.
 */
function getWindowDimensions() : {width: number | null, height: number | null} {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
        width,
        height,
    };
}