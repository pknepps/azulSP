import {ReactElement} from "react";
import styles from "./factory.module.css";
import {useWindowDimensions} from "@/app/ui/customHooks/useWindowDimensions";
import {Factory as TileFactory} from "@/app/game/Game"
import {TileColor} from "@/app/ui/Tile/TileColor";
import {SquareTile} from "@/app/ui/Tile/tile";

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
export default function Factory(factory: TileFactory, angle : number, width: number | null, height: number | null) : ReactElement | null {


    if (width == null || height == null) {
        return <div></div>;
    }
    const factoryRadius = 75;
    const radius = Math.min(height, width) / 3;
    const verticalOffset = height / 2;
    const horizontalOffset = width / 2;

    const coordinates: [number, number][] = [[1, 1], [1, 2], [2, 1], [2, 2]];
    const tiles: (ReactElement | null)[] = [];
    for (let i = 0; i < coordinates.length; i++) {
        tiles.push(SquareTile(factory.tiles[i], coordinates[i][0], coordinates[i][1]));
    }

    return (<div className={styles.factory}
                style = {{position: "absolute",
                          right: (Math.cos(angle) * radius + horizontalOffset - factoryRadius),
                          top: ((Math.sin(angle) * radius) + verticalOffset - factoryRadius)}}>
        <div className={styles.factoryContents}>
            {tiles}
        </div>
    </div>);
}

function placeTile(color: TileColor, coordinates: [number, number]) {

}