import React from 'react';
import { Box, Grid, Heading } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGameDetailsSubscription,
  useGetUserCardsQuery,
  useSelectCardMutation,
  UserCards,
  GameDetailsSubscriptionResult,
  useSelectWinningCardMutation,
} from '../../__generated__/types';
import Card from './Card';
import { ReduxState } from '../../redux/types';
import { GameActions } from '../../redux/game/actions';
import { JudgingCardsContainer, CardContainer } from './CardContainer'

interface PlayersCardsProps {
  gameId: string
  visible: boolean
}

const PlayersCards = ({ gameId, visible }: PlayersCardsProps) => {
  if (!gameId || !visible) return null;
  const dispatch = useDispatch();
  const name = useSelector((state: ReduxState) => state.User.details.name);
  const { cards, cardCzar } = useSelector((state: ReduxState) => state.Game);

  const handleCardReceive = (userCards: UserCards) => {
    const { cards: incomingWhiteCards, blackCard: incomingBlackCard } = userCards;
    dispatch({
      type: 'SET_BLACK_CARD',
      payload: { blackCard: incomingBlackCard },
    });
    dispatch({
      type: 'SET_WHITE_CARDS',
      payload: { whiteCards: incomingWhiteCards },
    });
  };

  useGetUserCardsQuery({
    variables: { gameId, name },
    onCompleted: ({ getUserCards }) => handleCardReceive(getUserCards),
    fetchPolicy: 'network-only',
  });

  const [selectCard] = useSelectCardMutation();

  const handleClick = async (cardText: string): Promise<void> => {
    console.log(cardText)
    await selectCard({ variables: { gameId, name, card: cardText } });
  };

  const playersCard = cards.map(card => ({ cardName: card }))

  if (cardCzar === name) return null;
  return <CardContainer cards={playersCard} onCardClick={handleClick} />;
};



interface CardAreaProps {
  gameId: string;
  visible: boolean;
  isHost: boolean;
}
const CardArea: React.FunctionComponent<CardAreaProps> = ({ gameId, visible }: CardAreaProps) => {
  if (!gameId) return null;
  const handleSubscriptionData = (subscriptionResult: GameDetailsSubscriptionResult) => {
    const { data } = subscriptionResult
    if (!data || !data.gameDetails) return;
    const subscriptionData = data.gameDetails
    const { event, running, cardCzar } = subscriptionData
    switch (event) {
      case GameActions.gameStarted: {
        dispatch({
          type: GameActions.gameStarted,
          payload: { running, cardCzar, currentRound: subscriptionData.roundStatus },
        });
        break;
      }
      case GameActions.gameStopped: {
        dispatch({ type: GameActions.gameStopped, payload: running, currentRound: subscriptionData.roundStatus });
        break;
      }
      case GameActions.roundUpdate: {
        dispatch({ type: GameActions.roundUpdate, payload: { currentRound: subscriptionData.roundStatus, cardCzar: subscriptionData.cardCzar } })
        if (subscriptionData.roundStatus === "JUDGING_ROUND") {
          dispatch({ type: GameActions.addJudgingCards, payload: { cardsToJudge: subscriptionData.cardsToJudge } })
        }
        break;
      }
    }
  }
  useGameDetailsSubscription({ variables: { gameId }, onSubscriptionData: ({ subscriptionData }) => handleSubscriptionData(subscriptionData) });
  const dispatch = useDispatch();
  const blackCard = useSelector((state: ReduxState) => state.Game.blackCard);
  const currentRound = useSelector((state: ReduxState) => state.Game.currentRound)
  const cardsToJudge = useSelector((state: ReduxState) => state.Game.cardsToJudge)
  const cardCzar = useSelector((state: ReduxState) => state.Game.cardCzar)
  const currentUser = useSelector((state: ReduxState) => state.User.details.name)


  const [judgingCards, setJudgingCards] = React.useState<Array<any>>()
  const [selectWinningCard] = useSelectWinningCardMutation()

  React.useEffect(() => {
    if (!cardsToJudge) return;
    if (cardsToJudge.length > 0) {
      setJudgingCards(cardsToJudge)
    }
  }, [cardsToJudge])

  if (!visible) {
    return (
      <>
        <Heading textAlign="center">The game is not running (◕ ◡ ◕)</Heading>
      </>
    );
  }
  const handleJudgingCard = (cardText: string, user?: string) => {
    if (currentUser !== cardCzar || !user) return;
    selectWinningCard({ variables: { gameId, card: cardText, winningUser: user, name: currentUser } })
  }
  return (
    <Grid
      columns={['auto']}
      rows={['xsmall', 'auto', 'small']}
      fill
      areas={[
        { name: 'status', start: [0, 0], end: [0, 0] },
        { name: 'game', start: [0, 1], end: [0, 1] },
        { name: 'cards', start: [0, 2], end: [0, 2] },
      ]}
    >
      <Box gridArea="status" fill />
      <Box gridArea="game" direction="row" justify="around" align="center" flex>
        {currentRound === "PICKING_CARDS" &&
          <Card
            key={blackCard}
            type={'black'}
            text={blackCard}
            backSide={false}
          />
        }
        {(currentRound === "JUDGING_ROUND") && judgingCards &&
          <JudgingCardsContainer cardsToJudge={judgingCards} blackCard={blackCard} onCardClick={(cardText, user) => handleJudgingCard(cardText, user)} />
        }
      </Box>

      <Box gridArea="cards" direction="row">
        <PlayersCards gameId={gameId} visible={currentRound === "PICKING_CARDS" ? true : false} />
      </Box>
    </Grid>
  );
};

export default CardArea;
