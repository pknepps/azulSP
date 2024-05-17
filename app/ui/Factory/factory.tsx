import {ReactElement} from "react";
import styles from "./factory.module.css";
import useWindowDimensions from "@/app/ui/customHooks/useWindowDimensions";

/**
 * A board element which holds 4 tiles. The tiles on a factory have yet to be drafted, and once one
 * tile is picked, all tiles of the same color go to that player, and the rest go to the center.
 * Is not a factory design pattern.
 * @param pickTiles The tile factory pattern function used to populate this factory. This function
 *                  should pick 4 remaining colors from the bag, and make an array of 4 elements.
 *                  It is preferred that these elements are buttons.
 * @param angle The angle to place this factory on.
 * @returns An html element which holds 4 tiles.
 */
export default function Factory(pickTiles : () => ReactElement[], angle : number) : ReactElement | null {
    let {width, height} = useWindowDimensions();
    if (width == null || height == null) {
        return <div></div>;
    }
    const factoryRadius = 75;
    const radius = Math.min(height, width) / 3;
    const verticalOffset = height / 2;
    const horizontalOffset = width / 2;
    return (<div className={styles.factory}
                style = {{position: "absolute",
                          right: (Math.cos(angle) * radius + horizontalOffset - factoryRadius),
                          top: ((Math.sin(angle) * radius) + verticalOffset - factoryRadius)}}>
        <div className={styles.factoryContents}>
            {pickTiles()}
        </div>
    </div>);
}