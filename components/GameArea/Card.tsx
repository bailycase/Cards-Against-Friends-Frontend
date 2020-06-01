import React from 'react';
import { Box, Heading } from 'grommet';

interface CardArgs {
  type: string;
  text?: string;
  backSide?: boolean;
  user?: string;
  handleClick?: (text: string) => {};
}

const Card: React.FunctionComponent<CardArgs> = ({
  type,
  text = '',
  backSide = true,
  user,
  handleClick,
}: CardArgs) => (
    <Box
      round="small"
      background={type === 'white' ? 'white' : 'black'}
      elevation="xlarge"
      margin={type === 'white' ? '5px' : { right: '5%', left: '5%' }}
      hoverIndicator={!backSide && true}
      onClick={() => handleClick && handleClick(text, user)}
      height="250px"
      width="250px"
      justify="center"
    >
      {backSide ? (
        <Heading responsive size="small" level="2" textAlign="center">
          Cards Against Friends
        </Heading>
      ) : (
          <Heading responsive size="small" level="2" textAlign="center">
            {text}
          </Heading>
        )}
    </Box>
  );

export default Card;
