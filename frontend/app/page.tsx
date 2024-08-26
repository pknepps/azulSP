"use client"

import styles from "./page.module.css";
import {GameCenter} from "@/app/ui/gameCenter"
import {ReactElement, useEffect, useState} from "react";
import SquareBoard from "@/app/ui/board/board";
import {Player, defaultPlayer, Factory, defaultFactory, defaultCenter, Center} from "@/app/game/Game";
import {useWindowDimensions} from "@/app/ui/customHooks/useWindowDimensions";

export default function Home() : ReactElement | null {
    const [players, setPlayers] = useState(new Array<Player>(4).fill(defaultPlayer()));
    const [factories, setFactories] = useState(new Array<Factory>(5).fill(defaultFactory()));
    const [center, setCenter] = useState(defaultCenter());
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
        'pending'
    );
    const [error, setError] = useState<Error>();
    const {width, height} = useWindowDimensions();
    console.log("checkpoint 0");
    useEffect(() => {
        async function fetch() {
            setStatus('pending');
            try {
                const players = await getPlayers();
                console.log("checkpoint 1");
                const factories = await getFactories();
                console.log("checkpoint 2");
                const center = await getCenter();
                console.log("checkpoint 3");
                setPlayers(players);
                setFactories(factories);
                setCenter(center);
                setStatus('success');
            } catch (e) {
                console.log('error checkpoint');
                console.log(e);
                setStatus('error')
                setError(e as Error)
            }
        }
        fetch();
    }, []);
    if (status === 'error') {
        console.log('error');
        return <h1>Error: {error?.message}</h1>;
    }
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.side}>
                    {SquareBoard(players[0].board)}
                    {SquareBoard(players[1].board)}
                </div>
                {GameCenter(factories, center, width, height)}
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
    headers.append("Origin", "http://localhost:3000");
    headers.append("Access-Control-Request-Method", "GET");
    const request: RequestInfo = new Request('http://localhost:8000/players.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Player[]);
}

async function getFactories(): Promise<Factory[]> {
    const headers: Headers = new Headers();
    headers.append("Origin", "http://localhost:3000");
    headers.append("Access-Control-Request-Method", "GET");
    const request: RequestInfo = new Request('http://localhost:8000/factories.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Factory[]);
}

async function getCenter(): Promise<Center> {
    const headers: Headers = new Headers();
    headers.append("Origin", "http://localhost:3000");
    headers.append("Access-Control-Request-Method", "GET");
    const request: RequestInfo = new Request('http://localhost:8000/center.json', {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then(response => response.json())
        .then(response => response as Center);
}