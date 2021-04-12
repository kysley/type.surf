import React from 'react';
import {animated} from 'react-spring';

import {Box} from '../../components/Box';
import {styled} from '../../styled';

export const Progress = ({players}: {players: any[]}) => {
  // const transitions = useTransition(players, (player) => player.id, {
  //   from: {height: 0, opacity: 0},
  //   leave: {height: 0, opacity: 0},
  //   enter: ({y, height}) => ({y, height, opacity: 1}),
  //   update: ({y, height}) => ({y, height}),
  // });

  // return (
  //   <ProgressContainer>
  //     <List>
  //       {transitions.map(({item, props: {y, ...rest}, key}, index) => (
  //         <ListItem key={key}>style={{}}</ListItem>
  //       ))}
  //     </List>
  //   </ProgressContainer>
  // );
  const fastestPlayer =
    players.reduce((prev, cur) => (prev.stats.wpm > cur.stats.wpm ? prev : cur))
      .stats?.wpm || 0;

  console.log(fastestPlayer);

  return (
    <ProgressContainer>
      <List>
        {players.map((player, idx) => (
          //@ts-ignore
          <ListItem bg="secondary" key={player.userId}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span style={{zIndex: 1}}>
                {player.username}#{player.discriminator}
              </span>
              <span style={{fontStyle: 'italic'}}>{player.stats.wpm}</span>
            </Box>

            <Box
              style={{position: 'absolute', opacity: 0.5}}
              width={`${(player.stats.wpm / fastestPlayer) * 100}%`}
              height="100%"
              bg="primary"
            />
          </ListItem>
        ))}
      </List>
    </ProgressContainer>
  );
};

const ProgressContainer = styled('div', {
  display: 'flex',
  gridArea: 'gl',
});

const List = styled(animated.ul, {
  position: 'relative',
  listStyle: 'none',
  display: 'grid',
  gridAutoRows: '50px',
  gap: '1em',
  alignSelf: 'center',
  margin: 0,
  padding: 0,
  width: '80%',
  // opacity: 0.5,
});

const ListItem = styled(animated.li, {
  padding: '.51em',
  display: 'grid',
  gap: '1em',
  position: 'relative',
  color: '$text',
  opacity: 0.4,
});
