import styles from "@/app/ui/gameCenter.module.css"
import {ReactElement, ReactNode} from "react";
import useWindowDimensions from "@/app/ui/customHooks/useWindowDimensions";

/**
 * The center of the game. The center contains all tiles which have yet to be drafted. These tiles
 * are found in the center of this component and on factories which lie along the circumference
 * of this component. The center can have any number of factories, and adjusts so that the
 * factories are always evenly distributed along the circumference.
 * @param props The elements to place along the radius of the center component.
 * @returns An html element which describes a ring of elements.
 */
export function GameCenter(props : number[]) : ReactElement | null {
    let cnt = 0;
    const elements : ReactNode[] = props.map((x : number) : ReactNode => {
        const angle = cnt++ * (2 * Math.PI) / props.length;
        return Circle(x, angle);
    });
    return (<div className={styles.gameCenter}> {elements} </div>)
}

/**
 * Test function. creates a circle from the given int.
 */
export function Circle(num : number, angle : number) : ReactNode {
    let {width, height} = useWindowDimensions();
    if (width == null || height == null) {
        return <div></div>;
    }
    const radius = Math.min(height, width) / 3;
    const verticalOffset = height / 2;
    const horizontalOffset = width / 2;
    return <div className={styles.circle} style = {{position : "absolute", right: (Math.cos(angle) * radius + horizontalOffset), top: ((Math.sin(angle) * radius) + verticalOffset)}} key={num}> {num} </div>;
}

