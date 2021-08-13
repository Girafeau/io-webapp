import Player from './Player';
import Key from '../utils/Key';
import Physic from './Physic';
import Remote from '../net/Remote';
import View from '../view/View';

export default class Self extends Player {

  public v: {
    x: number;
    y: number;
  };
  public old: {
    x: number;
    y: number;
  };
  public readonly speed: number;
  public respawnTime: number;
  public timer: number;
  private angle: number;

  public constructor(id: string, name: string, color: string, x: number, y: number, score: number) {
    super(id, name, color, x, y, score);
    this.v = {
      x: 2,
      y: 2
    };
    this.old = {
      x: this.x,
      y: this.y
    };
    this.speed = 5;
    this.respawnTime = 250;
    this.timer = 250;
    this.angle = 90;
  }

  public rotate(x: number, y: number, angle: number): { y1: number; x1: number } {
    let diffX, diffY, x1, y1;
    angle *= Math.PI / 180;
    diffX = x - this.x;
    diffY = y - this.y;
    x1 = diffX * Math.cos(angle) + diffY * Math.sin(angle) + this.x;
    y1 = diffX * Math.sin(angle) + diffY * Math.cos(angle) + this.y;
    return ({x1, y1});
  }

  public move(isXBlocked: boolean, isYBlocked: boolean): void {
    if (Key.KEYS[Key.KEY_UP] || Key.KEYS[Key.KEY_UP_2]) {
      if (this.v.y > -this.speed) {
        this.v.y--;
      }
    }

    if (Key.KEYS[Key.KEY_DOWN]) {
      if (this.v.y < this.speed) {
        this.v.y++;
      }
    }
    if (Key.KEYS[Key.KEY_RIGHT]) {
      if (this.v.x < this.speed) {
        this.v.x++;
      }
    }
    if (Key.KEYS[Key.KEY_LEFT] || Key.KEYS[Key.KEY_LEFT_2]) {
      if (this.v.x > -this.speed) {
        this.v.x--;
      }
    }

    this.v.y *= Physic.FRICTION;
    this.v.x *= Physic.FRICTION;

    if (!isXBlocked) {
      this.x += this.v.x;
    }
    if (!isYBlocked) {
      this.y += this.v.y;
    }

    if (this.x >= View.WIDTH - 5) {
      this.x = View.WIDTH;
    } else if (this.x <= 5) {
      this.x = 5;
    }

    if (this.y > View.HEIGHT - 5) {
      this.y = View.HEIGHT - 5;
    } else if (this.y <= 5) {
      this.y = 5;
    }

    this.x = Math.round(this.x * 10) / 10;
    this.y = Math.round(this.y * 10) / 10;

    if (this.x !== this.old.x || this.y !== this.old.y) {
      Remote.notify('move', {
        self: {
          id: this.id,
          x: this.x,
          y: this.y
        }
      });
    }

    this.old = {
      x: this.x,
      y: this.y
    };
  }
}
