import styles from "@/app/ui/gameCenter.module.css"
import {ReactElement, ReactNode} from "react";
import Factory from "@/app/ui/Factory/factory";
import {Factory as TileFactory, Center} from "@/app/game/Game"
import {FirstPlayerSquareTile} from "@/app/ui/Tile/tile";

/**
 * The center of the game. The center contains all tiles which have yet to be drafted. These tiles
 * are found in the center of this component and on factories which lie along the circumference
 * of this component. The center can have any number of factories, and adjusts so that the
 * factories are always evenly distributed along the circumference.
 * @param props The elements to place along the radius of the center component.
 * @returns An html element which describes a ring of elements.
 */
export function GameCenter(tileFactories : TileFactory[], center: Center) : ReactElement | null {
    let cnt = 0;
    const factories : ReactNode[] = tileFactories.map(factory => {
        const angle = cnt++ * (2 * Math.PI) / tileFactories.length + 3 * Math.PI / 2;
        return Factory(factory, angle);
    });
    return (<div className={styles.gameCenter}>
        {factories}
        <div className={styles.boardCenter}>
            {FirstPlayerSquareTile()}
        </div>
    </div>);
}