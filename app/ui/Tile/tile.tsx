import styles from "./tile.module.css"
import {ReactElement, useState} from "react";
import {TileColor} from "@/app/ui/Tile/TileColor";

export default function SquareTile(color : TileColor, column : number, row : number, disabled = false) : ReactElement {
    const [isDisabled, setDisabled] = useState(disabled);
    return (<button onClick={() => alert("my color is: " + color)}
                   className={styles.squareTile}
                   style={{backgroundColor: color,
                       gridColumnStart: column,
                       gridRowStart: row,
                       }} key={color}
                   disabled={isDisabled}></button>);
}