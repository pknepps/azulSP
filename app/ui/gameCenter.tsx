import styles from "@/app/ui/gameCenter.module.css"
import {ReactElement, ReactNode} from "react";
import Factory from "@/app/ui/Factory/factory";
import {TileColor} from "@/app/ui/Tile/TileColor";
import Tile from "@/app/ui/Tile/tile";

/**
 * Temp method
 */
const pickTileTest = () : ReactElement[] => {
    const colors = [TileColor.red, TileColor.blue, TileColor.black, TileColor.yellow];
    let cnt = 0;
    return colors.map((x : TileColor) : ReactElement => {
        const col = (cnt % 2) + 1;
        const row = Math.floor(cnt / 2) + 1;
        cnt++;
        return Tile(x, col, row);
    });
};

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
    const elements : ReactNode[] = props.map(() : ReactNode => {
        const angle = cnt++ * (2 * Math.PI) / props.length + 3 * Math.PI / 2;
        return Factory(pickTileTest, angle);
    });
    return (<div className={styles.gameCenter}> {elements} </div>);
}