import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Sidebar, Button, Nav, Avatar, Main, Grid, Layer, Box, Heading, Paragraph, TextInput, Text,
} from 'grommet';
import { Help, Gamepad, Chat } from 'grommet-icons';
import GameArea from '../GameArea/GameArea';
import GameModal from '../Reusables/GameModal';
import { ReduxState } from '../../redux/types';
import {
  useUpdateUserMutation, UpdateUserMutation,
} from '../../__generated__/types';
import { UserActions } from '../../redux/user/actions';

const Dashboard = () => {
  const { User, Game } = useSelector((state: ReduxState) => state);
  const { _id, name } = User.details;
  const { gameId } = Game;
  const [gameModal, setGameModal] = React.useState<boolean>();
  const [isNewUser, setIsNewUser] = React.useState<boolean>(false);
  const [newName, setName] = React.useState<string>();
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
  return (
    <Grid
      rows={['xxsmall', 'auto']}
      columns={['xsmall', 'auto']}
      gap="small"
      fill
      areas={[
        { name: 'nav', start: [0, 0], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
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
          <Main gridArea="main" fill="vertical">
            {gameId && <GameArea gameId={gameId} />}
          </Main>
          {
            gameModal && (
              <Layer onEsc={() => setGameModal(false)} onClickOutside={() => setGameModal(false)}>
                <GameModal name={name} closeModal={closeModal} />
              </Layer>
            )
          }
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
