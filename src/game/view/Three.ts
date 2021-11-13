import Game from "../logic/Game";
import Display from "./Display";
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';

type Score = {
    name: string,
    score: number
}

export default class Three implements Display{

    public static FONT = 'Inter';
    public static HEIGHT: number;
    public static WIDTH: number;

    public constructor(game: Game, scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, width: number, height: number) {
        Three.HEIGHT = height;
        Three.WIDTH = width;
        this.game = game;
        this.scores = [];
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial( { color: 0xffff00 } );
        this.cube = new Mesh( geometry, material );
        console.log(this.cube.position)
        this.camera.lookAt(this.cube.position)
        this.camera.position.z = 50;
        console.log(this.camera.position)
    this.obstacles = [];

    }

    private game: Game;
    private scores: Score[];
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private cube: Mesh;
    private obstacles: Mesh[];

    public render(): void {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        if (this.game.self) {
            this.cube.position.x = this.game.self.x;
            this.cube.position.y = this.game.self.y;

        }
        this.scene.add(this.cube);

        this.obstacles.forEach(o => this.scene.add(o));
        this.renderer.render(this.scene, this.camera);
    }

    public init(): void {
        this.obstacles = this.game.world.obstacles.map(o => {
            console.log(o)
            const i = new Mesh(new BoxGeometry(o.width, o.height, 1), new MeshBasicMaterial( { color: 0x00ff00 } ));
            i.position.setX(o.x);
            i.position.setY(o.y);
            return i;
        });
    }
}
