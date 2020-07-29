import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from 'grommet';
import { ReduxState } from '../../redux/types';
import {
  useJoinGameMutation,
  useGameSubscription,
  useGetGameLazyQuery,
  useStartGameMutation,
  useStopGameMutation,
} from '../../__generated__/types';
import PlayerList from './GamePlayerList';
import GameAreaToolbar from './GameAreaToolbar';
import CardArea from './CardArea';

interface GameAreaProps {
  gameId?: string;
}
const GameArea: React.FunctionComponent<GameAreaProps> = ({ gameId }: GameAreaProps) => {
  if (!gameId) return null;
  const dispatch = useDispatch();
  const [joinGame] = useJoinGameMutation();
  const { addToast } = useToasts();

  const {
    Game: {
      subscribedToGame, host, running
    },
    User: {
      details: { name },
    },
  } = useSelector((state: ReduxState) => state);

  const isMobile = useSelector((state: ReduxState) => state.Utils.isMobile)

  const handleError = (error: any) => {
    addToast(error.graphQLErrors[0].message, {
      appearance: 'error',
      autoDismiss: true,
    });
  };

  const { data } = useGameSubscription({
    variables: { gameId },
  });

  const [getGame, { data: gameData }] = useGetGameLazyQuery({
    onError: handleError,
  });

  const [startGame] = useStartGameMutation({
    onError: handleError,
  });

  const [stopGame] = useStopGameMutation({
    onError: handleError,
  });

  const handleStartGame = () => {
    startGame({ variables: { gameId, name } });
  };
  const handleStopGame = () => {
    stopGame({ variables: { gameId, name } });
  };

  // Lifecycle
  React.useEffect(() => {
    if (!subscribedToGame) {
      dispatch({ type: 'JOIN_GAME', payload: { gameId, name } });
      joinGame({ variables: { gameId, name } });
      getGame({ variables: { gameId, name } });
    }
  }, [subscribedToGame]);

  React.useEffect(() => {
    if (!data || !data.game) return;
    if (data.game.userJoined) {
      const newUser = data.game.userJoined.name;
      if (newUser === name) return;
      dispatch({ type: 'USER_JOIN', payload: { newUser } });
    }
    if (data.game.userLeft) {
      dispatch({
        type: 'USER_LEAVE',
        payload: { user: data.game.userLeft.name },
      });
    }
  }, [data]);
  React.useEffect(() => {
    if (!host) {
      getGame({ variables: { gameId, name } });
      if (gameData) {
        dispatch({
          type: 'MATCH_GAME',
          payload: { gameData: gameData.getGame },
        });
      }
    }
  }, [gameData]);
  const isHost = host === name && true;

  const desktopGrid = {
    rows: ['xsmall', 'small', 'auto'],
    columns: ['auto', 'medium'],
    areas: [
      { name: 'gameAreaToolbar', start: [0, 0], end: [1, 0] },
      { name: 'gameArea', start: [0, 1], end: [0, 2] },
      { name: 'players', start: [1, 1], end: [1, 1] },
      { name: 'chat', start: [1, 2], end: [1, 2] },
    ]
  }

  const mobileGrid = {
    columns: ['auto'],
    rows: ['xsmall', 'auto'],
    areas: [
      { name: 'gameAreaToolbar', start: [0, 0], end: [0, 0] },
      { name: 'gameArea', start: [0, 1], end: [0, 1] },
    ]
  }

  return (
    <Grid
      columns={isMobile ? mobileGrid.columns : desktopGrid.columns}
      rows={isMobile ? mobileGrid.rows : desktopGrid.rows}
      gap="small"
      pad="small"
      fill
      areas={isMobile ? mobileGrid.areas : desktopGrid.areas}
    >
      <Box gridArea="gameAreaToolbar">
        <GameAreaToolbar
          currentGame={gameId}
          gameRunning={running}
          handleStartGame={handleStartGame}
          handleStopGame={handleStopGame}
          isHost={isHost}
        />
      </Box>
      <Box gridArea={isMobile ? undefined : 'gameArea'}>
        <CardArea isHost={isHost} visible={running} gameId={gameId} />
      </Box>
      {!isMobile && <Box gridArea="players">
        <PlayerList gameId={gameId} />
      </Box>}
    </Grid>
  );
};

export default GameArea;
