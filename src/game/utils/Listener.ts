import Key from './Key';
import Game from '../logic/Game';

export default class Listener {

  private game: Game;
  x: number;
  y: number;
  private mouseX: any;
  private mouseY: any;
  private context: any;

  public constructor(game: Game, context: any) {
    this.game = game;
    this.context = context;
    this. x = 0;
    this.y = 0;
  }

  public init(): void {
    window.addEventListener('keydown', e => {
      Key.push(e.key);
      e.preventDefault();
    });

    window.addEventListener('keyup',  e => {
      Key.pop(e.key);
      e.preventDefault();
    });

    this.context.addEventListener('click',  (e: { clientX: number; clientY: number; }) => {
      if (this.game.self) {
        this.game.self.fire(e.clientX + this.game.camera.xView, e.clientY + this.game.camera.yView);
      }
    });

    window.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
}
