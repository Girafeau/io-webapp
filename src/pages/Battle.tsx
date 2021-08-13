import React, {useEffect, useRef} from "react";
import Remote from "../game/net/Remote";
import Camera from "../game/logic/Camera";
import World from "../game/logic/World";
import Logic from "../game/logic/Logic";
import View from "../game/view/View";
import Game from "../game/logic/Game";
import Listener from "../game/utils/Listener";
import styled from "styled-components";
import {
    useParams
} from "react-router-dom";
import {API_URL, SERVER_URL} from "../constants";

const Map = styled.div`
    background-color: black;
    
`

const Battle = () => {
    const element = useRef<HTMLCanvasElement>(null);
    // @ts-ignore
    let { id } = useParams();
    useEffect(() => {
        const query = window.location.search;
        const params = new URLSearchParams(query);
        const room = id;
        let seed = params.get('seed');
        if (!seed) {
            seed = '';
        }
        const width = 4000;
        const height = 2500;
        if (element.current) {
            const canvas = element.current;
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            const world = new World(width, height);
            const camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
            const game = new Game(canvas, camera, world);
            const view = new View(game, context, world.width, world.height);
            const listener = new Listener(game, canvas);
            const logic = new Logic(game, view, listener);
            const remote = new Remote(game);
            logic.init();
            remote.connect(SERVER_URL, room, seed, () => {
                logic.start();
            }, () => {
                console.log("cannot connect to server...");
            });
        }
    }, []);
    return (<Map>
            <canvas ref={element}/>
        </Map>
    );
}

export default Battle;

