import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlertModal from '../Reusables/AlertModal'
import {
  Sidebar, Button, Nav, Avatar, Main, Grid, Layer, Box, Heading, Paragraph, TextInput, Text, Footer,
} from 'grommet';
import { Group, Gamepad, Chat, Help } from 'grommet-icons';
import GameArea from '../GameArea/GameArea';
import GameModal from '../Reusables/GameModal';
import { ReduxState } from '../../redux/types';
import {
  useUpdateUserMutation, UpdateUserMutation,
} from '../../__generated__/types';
import { UserActions } from '../../redux/user/actions';
import { useMediaQuery } from 'react-responsive'
import { Swipeable, EventData } from 'react-swipeable'
import Drawer from '../Reusables/Drawer'
import PlayerList from '../GameArea/GamePlayerList'


const Dashboard = () => {
  const { User, Game } = useSelector((state: ReduxState) => state);
  const { _id, name } = User.details;
  const { gameId } = Game;
  const [gameModal, setGameModal] = React.useState<boolean>();
  const [isNewUser, setIsNewUser] = React.useState<boolean>(false);
  const [newName, setName] = React.useState<string>();
  const [playerListOpen, setPlayerListOpen] = React.useState<boolean>(false)
  const dispatch = useDispatch();


  const handleUpdateUserResponse = ({ updateUser: { name } }: UpdateUserMutation) => {
    dispatch({ type: UserActions.updateUser, payload: { name } });
  };
  const [updateUser] = useUpdateUserMutation({ onCompleted: handleUpdateUserResponse });

  React.useEffect(() => {
    if (!name) {
      setIsNewUser(true);
    }
  }, []);
  const handleNewGame = () => {
    setGameModal(true);
  };
  const closeModal = () => {
    setGameModal(false);
  };
  const handleSubmitName = (): void => {
    updateUser({ variables: { args: { _id, name: newName } } });
    setIsNewUser(false);
  };

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const desktopGrid = {
    rows: ['xxsmall', 'auto'],
    columns: ['xsmall', 'auto'],
    areas: [
      { name: 'nav', start: [0, 0], end: [0, 1] },
      { name: 'main', start: [1, 1], end: [1, 1] },
    ]
  }
  const mobileGrid = {
    rows: ['auto', 'xxsmall'],
    columns: ['auto'],
    areas: [
      { name: 'nav', start: [0, 1], end: [0, 1] },
      { name: 'main', start: [0, 0], end: [0, 0] },
    ]
  }
  const toggleDrawers = (eventData: EventData): void => {
    const { dir } = eventData
    if (!gameId) return
    if (dir === 'Left' && !playerListOpen) {
      setPlayerListOpen(true)
    }
    if (dir === 'Right' && playerListOpen) {
      setPlayerListOpen(false)
    }
  }

  return (
    <>
      <Drawer open={playerListOpen} location="right" disabled={!isMobile} >
        <PlayerList gameId={gameId} />
      </Drawer>
      <Swipeable onSwipedRight={toggleDrawers} onSwipedLeft={toggleDrawers}>
        <Grid
          rows={isMobile ? mobileGrid.rows : desktopGrid.rows}
          columns={isMobile ? mobileGrid.columns : desktopGrid.columns}
          gap="small"
          fill
          areas={isMobile ? mobileGrid.areas : desktopGrid.areas}
        >
          {isNewUser && (
            <Layer>
              <Box gap="medium" direction="column" pad="large" align="center" width="large" justify="evenly">
                <Heading size="medium" margin="none">
                  What should we call you..?
          </Heading>
                <Paragraph size="medium" margin="none">
                  We recommend you do not use your real name
          </Paragraph>
                <Box width="medium" gap="medium">
                  <TextInput onChange={(e: React.SyntheticEvent<HTMLInputElement>) => setName(e.currentTarget.value)} placeholder="Space Man Jim" />
                  <Button onClick={handleSubmitName} primary label="Submit Name" />
                </Box>

              </Box>
            </Layer>
          )}
          {name && (
            <>
              {isMobile ?
                // <Box gridArea="nav" background="brand" height="100%" align="center" hidden={true} /> :
                <>
                  <Footer fill background="brand" justify="center" >
                    <Button icon={<Chat />} hoverIndicator disabled />
                    <Button icon={<Gamepad />} hoverIndicator onClick={handleNewGame} />
                    <Button icon={<Group />} onClick={() => setPlayerListOpen(!playerListOpen)} disabled={!gameId} />
                  </Footer>
                </>
                :
                <Sidebar
                  gridArea="nav"
                  background="brand"
                  height="100%"
                  align="center"
                  pad={{ top: '15px' }}
                  header={<Avatar background="white" color="brand"><Text size="xxlarge" color="brand">{name.charAt(0)}</Text></Avatar>}
                  footer={<Button icon={<Help />} hoverIndicator />}
                >
                  <Nav gap="small">
                    <Button icon={<Gamepad />} hoverIndicator onClick={handleNewGame} />
                    <Button icon={<Chat />} hoverIndicator />
                  </Nav>
                </Sidebar>
              }
              <Main gridArea="main" fill="vertical">
                {gameId ? <GameArea gameId={gameId} /> : <AlertModal />}
              </Main>
              {
                gameModal && (
                  <Layer responsive={false} onEsc={() => setGameModal(false)} onClickOutside={() => setGameModal(false)}>
                    <GameModal name={name} closeModal={closeModal} />
                  </Layer>
                )
              }
            </>
          )}
        </Grid>
      </Swipeable>
    </>
  );
};

export default Dashboard;
