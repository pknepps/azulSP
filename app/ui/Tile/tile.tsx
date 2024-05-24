import styles from "./tile.module.css"
import {ReactElement, useState} from "react";
import {TileColor} from "@/app/ui/Tile/TileColor";

/**
 * Creates a square, colored tile which is a button.
 * @param color The color of the tile.
 * @param column The grid column of the tile.
 * @param row The grid row of the tile.
 * @param disabled If the tile should be clickable.
 * @returns A tile which is a button.
 */
export function SquareTile(color : TileColor, column : number, row : number,
                                   disabled = false) : ReactElement | null {
    const [isDisabled, setDisabled] = useState(disabled);
    return (<button onClick={() => alert("my color is: " + color)}
                   className={styles.squareTile}
                   style={{backgroundColor: color,
                       gridColumnStart: column,
                       gridRowStart: row,
                       }} key={color}
                   disabled={isDisabled}></button>);
}

/**
 * Makes the first player tile for the original form of azul. This is not clickable.
 * @returns The first player square tile.
 */
export function FirstPlayerSquareTile() : ReactElement | null {
    return <div className={styles.squareTile}
                style={{backgroundColor: "#e0e0e0"}}>1</div>
}