import React, { useEffect, useRef } from "react";
import Remote from "../game/net/Remote";
import Camera from "../game/logic/Camera";
import World from "../game/logic/World";
import Logic from "../game/logic/Logic";
import Game from "../game/logic/Game";
import Listener from "../game/utils/Listener";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { useAppSelector } from "../hooks/useAppSelector";
import Three from "../game/view/Three";
import * as THREE from "three";

// Styling

const Map = styled.div`
    background-color: black;
`

// Render

const BattleBis = () => {
    const element = useRef<HTMLDivElement>(null);
    let { id } = useParams<{ id: string }>();
    const user = useAppSelector((state) => state.auth.user);
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
        const world = new World(width, height);
        const camera = new Camera(0, 0, window.innerWidth, window.innerHeight);
        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        element.current!.appendChild(renderer.domElement);
        const game = new Game(camera, world);
        const view = new Three(game, scene, cam, renderer, world.width, world.height);
        const listener = new Listener(game, renderer.domElement);
        const logic = new Logic(game, view, listener);
        const remote = new Remote(game);
        logic.init();
        remote.connect(SERVER_URL, user ? user.token : '', room, seed, () => {
            logic.start();
        }, () => {
            console.log("cannot connect to server...");
        });

    }, []);
    return (<Map ref={element}/>);
}

export default BattleBis;
