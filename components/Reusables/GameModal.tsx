import React from 'react';
import {
  Box, Heading, Paragraph, Button, TextInput,
} from 'grommet';
import { Add, Aggregate, Logout } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCreateGameMutation,
  useJoinGameMutation,
  useLeaveGameMutation,
} from '../../__generated__/types';

const GameModal = ({ name, closeModal }) => {
  const dispatch = useDispatch();
  const [joinGame, { data: joinGameData }] = useJoinGameMutation();
  const [createGame, { data }] = useCreateGameMutation();
  const [leaveGame] = useLeaveGameMutation();

  const currentGameId = useSelector((state) => state.Game.gameId);

  const [joiningGame, setJoiningGame] = React.useState<boolean>(false);
  const [creatingGame, setCreatingGame] = React.useState<boolean>(false);
  const [gameId, setGameId] = React.useState<string>();

  const handleJoinGame = async () => {
    setJoiningGame(true);
    setCreatingGame(false);
    if (!gameId) return;
    // Dispatch an action that we are starting to join a game
    // After we actually join the game, dispatch an action to the
    // game store

    dispatch({ type: 'START_JOINING_GAME', payload: { name } });
    const didJoin = await joinGame({ variables: { gameId, name } });
    if (didJoin) {
      dispatch({ type: 'JOIN_GAME', payload: { gameId, name } });
      dispatch({ type: 'JOINED_GAME' });
      setJoiningGame(false);
      setGameId('');
      closeModal();
    }
  };
  const handleCreateGame = () => {
    setCreatingGame(true);
    setJoiningGame(false);
    if (!gameId) return;
    createGame({ variables: { gameId, host: name } });
    dispatch({ type: 'CREATE_GAME', payload: { gameId } });
    setCreatingGame(false);
    setGameId('');
    closeModal();
  };
  const handleLeaveGame = () => {
    dispatch({ type: 'LEAVE_GAME' });
    leaveGame({ variables: { gameId: currentGameId, name } });
    // closeModal()
  };
  // React.useEffect(() => {
  // if (gameId && creatingGame) {
  // handleJoinGame();
  // setCreatingGame(false);
  // }
  // }, [data]);

  return (
    <Box gap="medium" direction="column" pad="medium" align="center">
      <Heading margin="none">
        Hiya&nbsp;
        {name}
        !
      </Heading>
      <Paragraph>What would you like to do?</Paragraph>
      {!currentGameId ? (
        <Box direction="row" gap="large">
          <Button
            icon={<Add />}
            label="Create Game"
            onClick={handleCreateGame}
            disabled={creatingGame}
            active={creatingGame}
            focusIndicator={creatingGame}
          />
          <Button
            icon={<Aggregate />}
            label="Join Game"
            onClick={handleJoinGame}
            disabled={joiningGame}
            active={joiningGame}
            focusIndicator={joiningGame}
          />
          {(joiningGame || creatingGame) && (
            <Box>
              <TextInput
                placeholder="Game Name"
                onChange={(e) => setGameId(e.target.value)}
              />
              <Button
                label={joiningGame ? 'Join Game' : 'Create Game'}
                onClick={joiningGame ? handleJoinGame : handleCreateGame}
              />
            </Box>
          )}
        </Box>
      ) : (
          <Box>
            <Paragraph>
              {' '}
            you are already in a game :) do you want to leave...?
          </Paragraph>
            <Button
              icon={<Logout />}
              label="Leave Game"
              onClick={handleLeaveGame}
            />
          </Box>
        )}
    </Box>
  );
};

export default GameModal;
