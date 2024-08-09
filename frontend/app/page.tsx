"use client"

import styles from "./page.module.css";
import {GameCenter} from "@/app/ui/gameCenter"
import {ReactElement } from "react";
import SquareBoard from "@/app/ui/board/board";
import {Player, Factory, Board, Center} from "@/app/game/Game";

export default function Home() : ReactElement | null {
    const players = getPlayers();
    const factories = getFactories();
    const center = getCenter();
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.side}>
                    {SquareBoard(players[0].board)}
                    {SquareBoard(players[1].board)}
                </div>
                {GameCenter(factories, center)}
                <div className={styles.side} style={{alignContent:"flex-end"}}>
                    {SquareBoard(players[2].board)}
                    {SquareBoard(players[3].board)}
                </div>
            </div>
        </main>
    );
}

async function getPlayers(): Promise<Player[]> {
    const headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const request: RequestInfo = new Request('https://localhost:8000/players.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Player[]);
}

async function getFactories(): Promise<Factory[]> {
    const headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const request: RequestInfo = new Request('https://localhost:8000/factories.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Factory[]);
}

async function getCenter(): Promise<Center> {
    const headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const request: RequestInfo = new Request('https://localhost:8000/center.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Center);
}