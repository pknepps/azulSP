import {TileColor} from "@/app/ui/Tile/TileColor";
import {random} from "nanoid";
import {SquareTile} from "@/app/ui/Tile/tile";
import {ReactElement} from "react";

/**
 * An interface for a bag to draw tiles from. It contains a list of TileColors which represent the
 * tiles. Tiles can be drawn one at a time. When a tile is used, it should go to the tileBin array
 * held within this TileBag. After all tiles have been exhausted, the tiles from the tileBin will
 * be reshuffled and added back into the bag.
 * @author Preston Knepper
 * @version May 27, 2024
 */
export abstract class TileBag {

    /** All tiles which remain in the bag */
    private tiles: TileColor[] = [];

    /** All used tiles. */
    private tileBin: TileColor[] = [];

    /**
     * Draws a tile from the bag, does not replace tile. When the bag is empty, refills the bag
     * with the tileBin.
     * @param row The row to put the tile in.
     * @param col The column to put the tile in
     * @returns The tile drawn.
     */
    public drawTile = (row: number, col: number) : ReactElement | null => {
        if (this.tiles.length == 0) {
            this.shuffle();
        }
        return SquareTile(this.tiles.pop(), col, row);
    }

    /**
     * Adds the color to the tileBin.
     * @param color The color to add to the bin.
     */
    public useTile = (color: TileColor) => this.tileBin.push(color);

    /**
     * Shuffles the bag.
     */
    protected shuffle = () => {
        for (let i in this.tileBin) {
            let other = Math.floor(Math.random() * (this.tileBin.length))
            let temp = this.tileBin[other];
            this.tileBin[other] = this.tileBin[i];
            this.tileBin[i] = temp;
        }
        this.tiles = this.tiles.concat(this.tileBin);
        this.tileBin = [];
    }

}