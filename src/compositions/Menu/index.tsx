import {Award, Zap} from '@styled-icons/feather';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {styled} from '../../styled';
import {MenuUser} from './MenuUser';

const Container = styled('section', {
  minWidth: '185px',
  height: '100%',
  gridArea: 'left',
  background: '$background2',
  padding: '0.5em',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

const MenuBody = styled('div', {
  marginTop: '5em',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '6px',
});

const MenuItem = styled(NavLink, {
  transition: 'background 0.12s ease-in',
  fontWeight: 'bold',
  marginBottom: '1em',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  color: '$text',
  textDecoration: 'none',
  paddingLeft: '0.5em',
  borderRadius: '6px',
  boxShadow: '$active',
  fontVariant: 'full-width',

  '&.active': {
    background: '$background',
  },

  '&:hover': {
    background: '$background3',
  },

  '> svg': {
    marginRight: '0.5em',
    height: '68%',
    strokeWidth: '2px',
  },
});

export const Menu = () => (
  <Container>
    <MenuBody>
      <MenuItem to="/">
        {/* <Zap /> */}
        Practice
      </MenuItem>
      <MenuItem to="/play">
        {/* <Award /> */}
        Multiplayer
      </MenuItem>
    </MenuBody>
    <MenuUser />
  </Container>
);
