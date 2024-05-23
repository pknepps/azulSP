import styles from "./board.module.css";
import {ReactElement} from "react";
import {TileColor} from "@/app/ui/Tile/TileColor";
import SquareTile from "@/app/ui/Tile/tile"

/**
 * A player's board. Each player has their own board with identical walls, patterns and floor. The
 * players place tiles onto the pattern line which move to the wall in the respective row if filled
 * during the scoring phase. The floor is where overflow tiles go. All tiles on the floor in the
 * scoring phase count as negative points. A player can never drop below zero points.
 * @returns A board with 4 sections. The player's score, pattern lines, wall, and floor.
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
            tiles.push(SquareTile(TileColor.blue, i, i, true));
            tiles.push(SquareTile(TileColor.yellow, i % 5 + 1, i, true));
            tiles.push(SquareTile(TileColor.red, (i + 1) % 5 + 1, i, true));
            tiles.push(SquareTile(TileColor.black, (i + 2)% 5 + 1, i, true));
            tiles.push(SquareTile(TileColor.white, (i + 3)% 5 + 1, i, true));
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
        <div className={styles.boardHalf} style={{gridColumnStart: 2, pointerEvents:"none"}}>
            {makeWall()}
        </div>
        <div className={styles.floor}>
            {makeFloor()}
        </div>
    </div>);
}