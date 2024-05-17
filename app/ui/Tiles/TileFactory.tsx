import {TileColor} from "@/app/ui/Tiles/TileColor";
import {ReactElement} from "react";

/**
 * An interface for factory that makes tiles. Inheriting factories should make tiles of a specific
 * unique shape (e.g. square, rhombus, hexagon).
 * This interface not to be confused with the factory React Element which holds tiles.
 */
export default interface TileFactory {

    /**
     * Makes a tile of the given color.
     * @param color The color of the tile.
     * @returns A tile of the given color.
     */
    makeTile: (color: TileColor) => ReactElement;

}