export enum GameActions {
  gameId = 'GAME_ID',
  joinGame = 'JOIN_GAME',
  userJoin = 'USER_JOIN',
  userLeave = 'USER_LEAVE',
  leaveGame = 'LEAVE_GAME',
  subscribeToGame = 'SUB_TO_GAME',
  unsubscribeFromGame = 'UNSUB_FROM_GAME',
  createGame = 'CREATE_GAME',
  matchGame = 'MATCH_GAME',
  gameStarted = 'GAME_STARTED',
  gameStopped = 'GAME_STOPPED',
  cardsDealt = 'CARDS_DEALT',
  setBlackCard = 'SET_BLACK_CARD',
  setWhiteCards = 'SET_WHITE_CARDS',
  userSelectCard = 'USER_SELECT_CARD',
  roundUpdate = "ROUND_UPDATE",
  addJudgingCards = "ADD_JUDGING_CARDS",
  updateUsers = "UPDATE_USERS",
  userWinRound = "USER_WIN_ROUND",
}