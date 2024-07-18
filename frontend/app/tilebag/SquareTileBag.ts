import {TileBag} from "@/app/tilebag/TileBag";
import {TileColor} from "@/app/ui/Tile/TileColor";

/**
 * The bag of tiles for the original version of azul.
 */
export class SquareTileBag extends TileBag {

    private MAX_TILES_OF_COLOR = 20;

    /**
     * Creates a new bag of tiles. With all tiles to their max number.
     */
    public constructor  () {
        super();
        [TileColor.white, TileColor.black, TileColor.red, TileColor.blue, TileColor.yellow]
            .forEach((color : TileColor) : void => {
                for (let _ = 0; _ < this.MAX_TILES_OF_COLOR; _++) {
                    this.useTile(color)
                }
            });
        this.shuffle();
    };

}
