export interface GameStatus {
  joining: boolean;
  gameName: string;
}
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
}
export interface UserState {
  loggedIn: boolean;
  gameStatus: GameStatus;
  details: UserDetails;
}
