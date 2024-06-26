import styles from "@/app/ui/gameCenter.module.css"
import {ReactElement, ReactNode} from "react";
import Factory from "@/app/ui/Factory/factory";
import {FirstPlayerSquareTile} from "@/app/ui/Tile/tile";
import {SquareTileBag} from "@/app/tilebag/SquareTileBag";
import {TileBag} from "@/app/tilebag/TileBag";

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
    let tileBag: TileBag = new SquareTileBag();
    const factories : ReactNode[] = props.map(() : ReactNode => {
        const angle = cnt++ * (2 * Math.PI) / props.length + 3 * Math.PI / 2;
        return Factory(tileBag.drawTile, angle);
    });
    return (<div className={styles.gameCenter}>
        {factories}
        <div className={styles.boardCenter}>
            {FirstPlayerSquareTile()}
        </div>
    </div>);
}