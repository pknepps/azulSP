import styles from "./board.module.css";
import {ReactElement} from "react";
import {TileColor} from "@/app/ui/Tile/TileColor";
import SquareTile from "@/app/ui/Tile/tile"

/**
 *
 * @constructor
 */
export default function SquareBoard() : ReactElement | null{
    let makePattern = () : Array<ReactElement | null> => {
        let tiles = new Array<ReactElement | null>();
        for (let i = 1; i <= 5; i++) {
            for (let j = 5; j > 5 - i; j--) {
                tiles.push(SquareTile(TileColor.empty, j, i));
            }
        }
        return tiles;
    }

    let makeWall = () : Array<ReactElement | null> => {
        let tiles = new Array<ReactElement | null>();
        for (let i = 1; i <= 5; i++) {
            tiles.push(SquareTile(TileColor.blue, i, i));
            tiles.push(SquareTile(TileColor.yellow, i % 5 + 1, i));
            tiles.push(SquareTile(TileColor.red, (i + 1) % 5 + 1, i));
            tiles.push(SquareTile(TileColor.black, (i + 2)% 5 + 1, i));
            tiles.push(SquareTile(TileColor.white, (i + 3)% 5 + 1, i));
        }
        return tiles;
    }

    let makeFloor = () : Array<ReactElement | null> => {
        let scores = [-1, -1, -2, -2, -2, -3, -3];
        let elements = new Array<ReactElement | null>
        for (let i = 0; i < scores.length; i++) {
            elements.push(<div className={styles.floorText} style={{gridColumnStart: i + 1}}>
                {scores[i]}
            </div>);
            elements.push(SquareTile(TileColor.empty, i + 1, 1));
        }
        return elements;
    }

    return (<div className={styles.board}>
        <div className={styles.score}>121</div>
        <div className={styles.boardHalf} style={{gridColumnStart: 1}}>
            {makePattern()}
        </div>
        <div className={styles.boardHalf} style={{gridColumnStart : 2}}>
            {makeWall()}
        </div>
        <div className={styles.floor}>
            {makeFloor()}
        </div>
    </div>);
}