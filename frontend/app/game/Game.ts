import {TileColor} from "@/app/ui/Tile/TileColor";

export class Player {
    public id: number = 0;
    public board: Board = new Board();
}

export class Board {
    public pattern: (TileColor | null)[][] = [];
    public wall: (TileColor | null)[][] = [];
    public floor: (TileColor | FirstPlayerTile)[] = [];
    public score: number = 0;
}

export class Factory {
    public tiles: (TileColor | undefined)[] = [];
}

export class Center {
    public tiles: (TileColor | FirstPlayerTile)[] = [];
}

export class FirstPlayerTile {}