import Game from '../logic/Game';
import {io, Socket} from "socket.io-client";

export default class Remote {

  public constructor(game: Game) {
    this.game = game;
  }

  public static socket: Socket;
  public static url: string;
  public static room: string;
  private game: Game;

  public static notify(message: string, object: object): void {
    Remote.socket.emit(message, object);
  }

  public connect(url: string, accessToken: string, room: string, seed: string, handle: () => void, err: () => void): void {
    Remote.url = url;
    Remote.room = room;
    Remote.socket = io(url, {
      withCredentials: true,
      query: {
        accessToken
      }
    });
    Remote.socket.on("connect", () => {
      const data = {
        room,
        seed
      };
      Remote.notify('connection', data);
    });

    Remote.socket.on("disconnect" , () => {

    });

    Remote.socket.on('map', (data: {
      map: {
        seed: string
      }
    }) => {
      this.game.world.create(data.map.seed);
    });

    Remote.socket.on('self', (data: {
      self: {
        id: string,
        name: string,
        color: string,
        x: number,
        y:number,
        score: number
      }
    }) => {
      this.game.setSelf(data.self.id, data.self.name, data.self.color, data.self.x, data.self.y, data.self.score);
      handle();
    });

    Remote.socket.on('enemies', (data: {
      enemies: {
        id: string,
        name: string,
        color: string,
        x: number,
        y: number,
        score: number
      }[]
    }) => {
      data.enemies.forEach(enemy => {
        this.game.addEnemy(enemy.id, enemy.name, enemy.color, enemy.x, enemy.y, enemy.score);
      });
    });

    Remote.socket.on('enemy', (data: {
      enemy: {
        id: string,
        name: string,
        color: string,
        x: number,
        y: number,
        score: number
      }
    }) => {
      this.game.addEnemy(data.enemy.id, data.enemy.name, data.enemy.color, data.enemy.x, data.enemy.y, data.enemy.score);
    });


    Remote.socket.on('moved', (data: {
      enemy: {
        id: string,
        x: number,
        y: number
      }
    }) => {
      this.game.updateEnemyPosition(data.enemy.id, data.enemy.x, data.enemy.y);
    });

    Remote.socket.on('fired', (data: {
      projectile: {
        x: number,
        y: number,
        angle: number,
        shooter: string
      }
    }) => {
      this.game.addProjectile(data.projectile.x, data.projectile.y, data.projectile.angle, data.projectile.shooter);
    });

    Remote.socket.on('died', (data: {
      enemy: {
        id: string,
        shooter: string
      }
    }) => {
      this.game.updateEnemyDeath(data.enemy.id, true);
      if (this.game.self?.id === data.enemy.shooter) {
        Remote.notify('shot', {
          self: {
            id: data.enemy.shooter
          }
        });
      }
    });

    Remote.socket.on('respawned', (data: {
      enemy: {
        id: string
      }
    }) => {
      this.game.updateEnemyDeath(data.enemy.id, false);
    });

    Remote.socket.on('score', (data: {
      score: {
        id: string,
        amount: number
      }
    }) => {
      if (data.score.id === this.game.self?.id) {
        this.game.self.score = data.score.amount;
      }
      else {
        this.game.updateEnemyScore(data.score.id, data.score.amount);
      }
    });

    Remote.socket.on('leave', (data: {
      enemy: {
        id: string
      }
    }) => {
      this.game.removeEnemy(data.enemy.id);
    });

    Remote.socket.on("error", error => {
      err();
    });

  }
}
