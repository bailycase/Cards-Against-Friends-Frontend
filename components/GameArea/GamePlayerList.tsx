import React from 'react';
import {
  List, Box, Text, Heading,
} from 'grommet';
// import { UserPolice } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGamePlayersSubscription,
  GamePlayers,
  GamePlayersSubscriptionResult,
} from '../../__generated__/types';
import { GameActions } from '../../redux/game/actions';
import { ReduxState } from '../../redux/types';

interface UserProps {
  name: string;
  points: Number;
  isHost: boolean;
  isCardCzar: boolean;
  selectedCard: boolean;
}

// Individual User Component // Migrate to its own component later
const User: React.FunctionComponent<UserProps> = ({
  name,
  points,
  isHost,
  isCardCzar,
  selectedCard,
}) => (
    <Box>
      <Box direction="row" gap="15px">
        {isHost && (
          <Text size="small" margin="0" color="neutral-3" weight="bold">
            Host
          </Text>
        )}
        {isCardCzar && (
          <Text size="small" margin="0" color="neutral-3" weight="bold">
            Card Czar
          </Text>
        )}
      </Box>
      <Box direction="row" gap="75%">
        <Text color={selectedCard ? 'green' : !isHost ? 'red' : 'black'}>{name}</Text>
        <Text>{points}</Text>
      </Box>
    </Box>
  );

interface GamePlayersArgs {
  gameId: string;
}
// The list of game players
const GamePlayers: React.FunctionComponent<GamePlayersArgs> = ({ gameId }: GamePlayersArgs) => {
  const dispatch = useDispatch();
  const { users, cardCzar, host } = useSelector((state: ReduxState) => state.Game);

  const handleSubscriptionData = (subscriptionResult: GamePlayersSubscriptionResult) => {
    const { data } = subscriptionResult;
    console.log(subscriptionResult)
    if (!data || !data.gamePlayers) return;
    const subscriptionData = data.gamePlayers;
    switch (subscriptionData.event) {
      case GameActions.userJoin: {
        const { userJoined } = subscriptionData;
        if (!userJoined) break;
        dispatch({ type: GameActions.userJoin, payload: { newUser: userJoined.name } });
        break;
      }
      case GameActions.userLeave: {
        const { userLeft } = subscriptionData;
        if (!userLeft) break;
        dispatch({ type: GameActions.userLeave, payload: { user: userLeft.name } });
        break;
      }
      case GameActions.userSelectCard: {
        const { user } = subscriptionData;
        if (!user) break;
        dispatch({ type: GameActions.userSelectCard, payload: { user } });
        break;
      }
      case GameActions.userWinRound: {
        const { users } = subscriptionData;
        dispatch({ type: GameActions.updateUsers, payload: { users } })
        break;
      }

      default:
        break;
    }
  };

  useGamePlayersSubscription({
    variables: { gameId },
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => handleSubscriptionData(subscriptionData),
  });
  const hasSelectedCard = (name: string): boolean => {
    const { cardSelected } = users.filter((user) => user.name === name)[0];
    if (cardSelected) return true;
    return false;
  };
  return (
    <>
      <Heading size="small">Players</Heading>
      <List
        primaryKey="name"
        secondaryKey="points"
        data={users}
        margin="xsmall"
        children={(item: UserProps) => (
          <User
            name={item.name}
            points={item.points}
            isHost={item.name === host}
            isCardCzar={item.name === cardCzar}
            selectedCard={hasSelectedCard(item.name)}
          />
        )}
      />
    </>
  );
};
export default GamePlayers;
