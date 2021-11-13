import Game from './Game';
import Listener from "../utils/Listener";
import Display from "../view/Display";

export default class Logic {

  private static FPS = 60;
  private game: Game;
  private display: Display;
  private listener: Listener;
  private stop: boolean;
  private readonly interval: number;
  private delta: number;
  private then: number;
  private now: number;

  public constructor(game: Game, display: Display, listener: Listener) {
    this.stop = false;
    this.interval = 1000 / Logic.FPS;
    this.delta = 0;
    this.then = 0;
    this.now = Date.now();
    this.game = game;
    this.display = display;
    this.listener = listener;
  }

  public init(): void {
    this.listener.init();
    this.game.init();
    this.display.init();
  }

  public start(): void {
    this.then = Date.now();
    this.render();
  }

  public update(): void {
    this.display.render();
    this.game.update();
  }

  public render(): void {
    requestAnimationFrame(this.render.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;
    if (this.delta > this.interval && !this.stop) {
      this.then = this.now - (this.delta % this.interval);
      this.update();
    }
  }

  public pause(): void {
    this.stop = true;
  }

  public unpause(): void {
    this.stop = false;
  }

}
