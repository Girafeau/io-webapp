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

  public connect(url: string, room: string, seed: string, handle: () => void, err: () => void): void {
    Remote.url = url;
    Remote.room = room;
    Remote.socket = io(url);
    Remote.socket.on("connect", () => {
        const data = {
          room,
          seed
        };
        Remote.notify('connection', data);
    });
    Remote.socket.on("l", () => {

    });

    Remote.socket.on("error", (error) => {
      err();
    });

  }
}
