import {useState, useEffect} from "react";

/**
 * A custom hook which retrieves the dimensions of the current window, with each dimension being
 * null if no browser instance exists.
 * @returns an object with 2 number fields: height and width, being the height and width of the
 *      window respectively.
 */
export default function useWindowDimensions() : {width: number | null, height: number | null} {
    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() : {width: number | null, height: number | null} {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            let handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, getWindowDimensions]);

    return windowDimensions;
}
