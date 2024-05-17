import {ReactElement} from "react";
import TileFactory from "@/app/ui/Tiles/TileFactory"
import styles from "@app/ui/Factory/factory.module.css";

/**
 *
 * @constructor
 */
export default function Factory(tileFactory : TileFactory) : ReactElement | null {

    return <div className={styles.factory}></div>;
}