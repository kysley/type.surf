import {Menu, MenuButton, MenuItem, MenuList} from '@reach/menu-button';
import {Hexagon} from '@styled-icons/feather';
import React from 'react';

import {useMe} from '../../hooks/api/useMe';
import {Box} from '../../components/Box';
import {styled} from '../../styled';

const HeaderContainer = styled(Box, {
  display: 'grid',
  gridTemplateAreas: '"reserved nav userspace"',
  gridTemplateColumns: '1fr 20vw 1fr',
});

const StyledMenuButton = styled(MenuButton, {
  borderRadius: '5px',
  minWidth: '150px',
  textTransform: 'uppercase',
  border: 'none',
  cursor: 'pointer',
  background: '$background2',
  color: 'text',
  fontWeight: 'bold',
  transition: 'all .09s ease-in',
  ':hover': {
    background: '$background3',
  },
});

const StyledMenuItem = styled(MenuItem, {
  display: 'grid',
  gridAutoColumns: '200px',
  gridAutoRows: '80px',
  gridAutoFlow: 'column',
  gap: '2em',
});

export const Header = () => {
  const {user} = useMe();
  return (
    // <HeaderContainer gridArea="header">
    <HeaderContainer>
      <Box
        gridArea="nav"
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        p={2}
        alignItems="stretch"
        style={{position: 'relative'}}
      >
        <Menu>
          <StyledMenuButton>Practice</StyledMenuButton>
          <MenuList
            style={{
              // background: 'white', // this will have to be theme background
              display: 'grid',
              gridAutoColumns: '200px',
              gridAutoRows: '80px',
              gridAutoFlow: 'column',
              gap: '1em',
              padding: '.5em',
            }}
          >
            <StyledMenuItem style={{background: 'red'}} onSelect={() => {}}>
              Random Text
            </StyledMenuItem>
            <StyledMenuItem style={{background: 'blue'}} onSelect={() => {}}>
              Challenges
            </StyledMenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <StyledMenuButton>Multiplayer</StyledMenuButton>
          <MenuList>
            <StyledMenuItem>Something here</StyledMenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box gridArea="userspace" display="flex">
        {user && (
          <>
            <span>
              {user?.username}#{user?.discriminator}
            </span>
            <Box display="flex">
              <div>
                Lv
                {user.level}
              </div>
              <div>
                <Hexagon size="18" stroke="3px" />
                {user.exp}
              </div>
            </Box>
          </>
        )}
      </Box>
    </HeaderContainer>
  );
};
