import {TileColor} from "@/app/ui/Tile/TileColor";

export interface Player {
    id: number;
    name: string;
    board: Board;
}

function defaultPlayer(): Player {
    return {id: 0, name: "", board: defaultBoard()} as Player;
}

export interface Board {
    pattern: (TileColor | null)[][];
    wall: (TileColor | null)[][];
    floor: (TileColor | FirstPlayerTile)[];
    score: number;
}

function defaultBoard(): Board {
    return {
        pattern: new Array<Array<TileColor | null>>(),
        wall: new Array<Array<TileColor | null>>(),
        floor: new Array<TileColor | FirstPlayerTile>(),
        score: 0,
    } as Board;
}

export interface Factory {
    tiles: (TileColor | undefined)[];
}

function defaultFactory(): Factory {
    return {tiles: new Array<TileColor | undefined>} as Factory
}

export interface Center {
    tiles: (TileColor | FirstPlayerTile)[];
}

export function defaultCenter(): Center {
    return {tiles: []} as Center
}

export interface FirstPlayerTile {}