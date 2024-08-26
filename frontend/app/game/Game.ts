import {TileColor} from "@/app/ui/Tile/TileColor";
import {FirstPlayerSquareTile} from "@/app/ui/Tile/tile";

export interface Player {
    id: number;
    name: string;
    board: Board;
}

export function defaultPlayer(): Player {
    return {id: 0, name: "Player", board: defaultBoard()} as Player;
}

export interface Board {
    pattern: (TileColor | null)[][];
    wall: (TileColor | null)[][];
    floor: (TileColor | FirstPlayerTile)[];
    score: number;
}

function defaultBoard(): Board {
    return {
        pattern: new Array<Array<TileColor | null>>(5).fill(new Array<TileColor | null>(5).fill(null)),
        wall: new Array<Array<TileColor | null>>(5).fill(new Array<TileColor | null>(5).fill(null)),
        floor: new Array<TileColor | FirstPlayerTile>(),
        score: 0,
    } as Board;
}

export interface Factory {
    tiles: (TileColor | undefined)[];
}

export function defaultFactory(): Factory {
    return {tiles: new Array<TileColor | undefined>(4).fill(TileColor.black)} as Factory
}

export interface Center {
    tiles: (TileColor | FirstPlayerTile)[];
}

export function defaultCenter(): Center {
    return {tiles: [{}]} as Center
}

export interface FirstPlayerTile {}