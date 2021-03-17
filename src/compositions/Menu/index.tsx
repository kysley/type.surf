import React from 'react';
import {NavLink} from 'react-router-dom';

import {styled} from '../../styled';

const Container = styled('section', {
  height: '100%',
  gridArea: 'left',
  background: '$background2',
  padding: '1em',
});

const MenuBody = styled('div', {
  background: '$background3',
  marginTop: '5em',
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',
});

const MenuItem = styled(NavLink, {
  fontWeight: 'bold',
  padding: '1em',
  '&:hover': {
    background: '$caret',
  },
});

export const Menu = () => (
  <Container>
    <MenuBody>
      <MenuItem to="/">Practice</MenuItem>
      <MenuItem to="/play">Multiplayer</MenuItem>
    </MenuBody>
  </Container>
);
