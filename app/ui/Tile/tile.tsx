import styles from "./tile.module.css"
import {ReactElement} from "react";
import {TileColor} from "@/app/ui/Tile/TileColor";

export default function SquareTile(color : TileColor, column : number, row : number) : ReactElement {
    return (<button onClick={() => alert("my color is: " + color)}
                   className={styles.squareTile}
                   style={{backgroundColor: color,
                       gridColumnStart: column,
                       gridRowStart: row}} key={color}></button>);
}