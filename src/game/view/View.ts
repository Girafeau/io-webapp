import Game from '../logic/Game';

type Score = {
  name: string,
  score: number
}

export default class View {

  public static FONT = 'Inter';
  public static HEIGHT: number;
  public static WIDTH: number;

  public constructor(game: Game, canvas: any, width: number, height: number) {
    View.HEIGHT = height;
    View.WIDTH = width;
    this.game = game;
    this.canvas = canvas;
    this.numStars = 500;
    this.radius = '0.' + Math.floor(Math.random() * 9) + 1;
    this.scores = [];
  }

  private readonly numStars: number;
  private game: Game;
  private canvas;
  private scores: Score[];
  private readonly radius: string;


  public render(): void {
    this.map();
    this.background();
    this.self();
    this.infos();
    this.enemies();
    this.projectiles();
    this.world();
    this.score();
  }

  private background(): void {

  }

  public infos(): void {
    if (this.game.self && this.game.self.dead) {
      this.canvas.fillStyle = 'white';
      this.canvas.font = '60px ' + View.FONT;
      this.canvas.fillText('You\'ve been destroyed. 💥', 200, 300);
      this.canvas.fillText('Repair in :', 200, 400);
      this.canvas.fillText(String(this.game.self.timer), 200, 500);
      this.canvas.font = '20px ' + View.FONT;
    }
  }

  public map(): void {
    this.canvas.save();
    this.canvas.clearRect(0, 0, this.game.camera.wView, this.game.camera.hView);
  }

  public world(): void {
    this.canvas.fillStyle = 'white';
    this.game.world.obstacles.forEach(o => {
      this.canvas.fillRect(o.x - this.game.camera.xView, o.y - this.game.camera.yView, o.width, o.height);
    });
  }

  public self(): void {
    if (this.game.self) {
      this.canvas.fillStyle = 'white';
      if (this.game.self.dead) {
        this.canvas.fillStyle = 'red';
      }
      this.canvas.beginPath();
      this.canvas.moveTo(this.game.self.x - this.game.self.width - this.game.camera.xView, this.game.self.y + this.game.self.width - this.game.camera.yView);
      this.canvas.lineTo(this.game.self.x + this.game.self.width - this.game.camera.xView, this.game.self.y + this.game.self.width - this.game.camera.yView);
      this.canvas.lineTo(this.game.self.x - this.game.camera.xView, this.game.self.y - this.game.self.width - this.game.camera.yView);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.fillStyle = 'white';
      this.canvas.font = '15px ' + View.FONT;
      this.canvas.fillText(`${this.game.self.x}`, this.game.self.x - 20 - this.game.camera.xView, this.game.self.y - 45 - this.game.camera.yView);
      this.canvas.fillText(`${this.game.self.y}`, this.game.self.x - 20 - this.game.camera.xView, this.game.self.y - 25 - this.game.camera.yView);
      this.canvas.fillText(`${this.game.self.name}`, this.game.self.x - 45 - this.game.camera.xView, this.game.self.y  + 50 - this.game.camera.yView);
      this.canvas.font = '20px ' + View.FONT;
      this.canvas.fillStyle = 'grey';
      this.canvas.fillRect(this.game.self.x - 15 - this.game.camera.xView, this.game.self.y + 25 - this.game.camera.yView, 30, 5);
      this.canvas.fillStyle = 'red';
      this.canvas.fillRect(this.game.self.x - 15 - this.game.camera.xView, this.game.self.y + 25 - this.game.camera.yView, this.game.self.refill * 30 / this.game.self.refillMax, 5);
    }
  }

  public enemies(): void {
    this.game.enemies.forEach(enemy => {
      this.canvas.fillStyle = enemy.color;
      if (enemy.dead) {
        this.canvas.fillStyle = 'red';
      }
      this.canvas.beginPath();
      this.canvas.moveTo(enemy.x - enemy.width - this.game.camera.xView, enemy.y + enemy.width - this.game.camera.yView);
      this.canvas.lineTo(enemy.x + enemy.width - this.game.camera.xView, enemy.y + enemy.width - this.game.camera.yView);
      this.canvas.lineTo(enemy.x - this.game.camera.xView, enemy.y - enemy.width - this.game.camera.yView);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.fillStyle = 'white';
      this.canvas.font = '15px ' + View.FONT;
      this.canvas.fillText(`${enemy.name}`, enemy.x - 45 - this.game.camera.xView, enemy.y  + 50 - this.game.camera.yView);
      this.canvas.font = '20px ' + View.FONT;
    });
  }

  public score(): void  {
    if (this.game.self) {
      this.canvas.font = '20px ' + View.FONT;
      this.canvas.fillStyle = 'white';
      this.canvas.fillText(`You have ${this.game.self.score} point(s).`, 200 - this.game.camera.xView, 70 - this.game.camera.yView);
      this.canvas.fillText(`Scores : `, 500 - this.game.camera.xView, 70 - this.game.camera.yView);
      this.scores = this.game.enemies.map(e => {
        return {
          name: e.name,
          score: e.score
        };
      });
      this.scores.push({
        name: this.game.self.name,
        score: this.game.self.score
      });
      this.scores.sort((a, b) => b.score - a.score).forEach((e, i) => {
        this.canvas.fillText(`${i + 1}. ${e.name} : ${e.score}`, 500 - this.game.camera.xView, (100 + i * 30) - this.game.camera.yView);
      });
      this.canvas.lineWidth = 2;
      this.canvas.strokeStyle = 'red';
      this.canvas.strokeRect(475 - this.game.camera.xView, 25 - this.game.camera.yView, 300, (this.scores.length + 1) * 30 + 50);

    }
  }

  public projectiles(): void {
    this.canvas.fillStyle = 'red';
    this.game.projectiles.forEach(projectile => {
      this.canvas.beginPath();
      this.canvas.lineCap = 'round';
      this.canvas.lineWidth = 4;
      this.canvas.lineTo(projectile.old.x - this.game.camera.xView, projectile.old.y - this.game.camera.yView);
      this.canvas.lineTo(projectile.x - this.game.camera.xView, projectile.y - this.game.camera.yView);
      this.canvas.stroke();
      this.canvas.closePath();
    });
  }


  public init(): void {
    this.canvas.font = '20px ' + View.FONT;
  }
}
