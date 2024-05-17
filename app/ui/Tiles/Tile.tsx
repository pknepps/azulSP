import {TileColor} from "@/app/ui/Tiles/TileColor";

export default interface Tile extends HTMLElement {
    color : TileColor,
    img : HTMLImageElement,
}