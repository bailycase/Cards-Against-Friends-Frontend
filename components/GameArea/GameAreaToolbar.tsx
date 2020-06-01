import React from 'react';
import {
  Header, Button, Box, Heading,
} from 'grommet';
import { Play, Stop } from 'grommet-icons';

interface GameAreaToolbarArgs {
  currentGame: string;
  gameRunning: boolean;
  handleStartGame: (e: React.SyntheticEvent<HTMLButtonElement>) => any;
  handleStopGame: (e: React.SyntheticEvent<HTMLButtonElement>) => any;
  isHost: boolean;
}

const GameAreaToolbar: React.FunctionComponent<GameAreaToolbarArgs> = ({
  currentGame,
  handleStartGame,
  handleStopGame,
  gameRunning,
  isHost,
}) => (
  <Header flex>
    {currentGame ? (
      <Heading size="small">{`Current  Game: ${currentGame}`}</Heading>
    ) : (
      <Heading>Game Area</Heading>
    )}
    {isHost && (
      <Box direction="row" flex="grow" justify="center" gap="medium">
        {gameRunning ? (
          <Button onClick={handleStopGame} label="Stop Game" icon={<Stop />} />
        ) : (
          <Button onClick={handleStartGame} label="Start Game" icon={<Play />} />
        )}
      </Box>
    )}
  </Header>
);

export default GameAreaToolbar;
