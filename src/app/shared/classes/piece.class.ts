export abstract class Piece {
  public name: string;
  public team: string;

  constructor( name: string,team: string ) {
    this.name = name;
    this.team = team;
  }

  public abstract move(): void;
}
