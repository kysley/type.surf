import React from 'react';

import {styled} from '../../styled';

import {useMe} from '../../hooks/api/useMe';
import {Button} from '../../components/Button';

export const MenuUser = () => {
  const {user} = useMe();

  return (
    <section>
      {user ? null : (
        <div>
          <Button>Sign Up</Button>
          <Button variant="secondary">Login</Button>
        </div>
      )}
      <MUContainer>
        <UserIcon />
        <div>
          <UserName>{user.username}</UserName>
          <UserDisc>#{user.discriminator}</UserDisc>
        </div>
      </MUContainer>
    </section>
  );
};

const MUContainer = styled('div', {
  display: 'flex',
  background: '$background3',
  borderRadius: '4px',
  padding: '.5em',
  // margin: '1em',
  height: '75px',
  alignItems: 'center',
  // justifyContent: 'space-around',
});

const UserIcon = styled('div', {
  background: 'green',
  height: '35px',
  width: '35px',
  borderRadius: '18%',
  marginRight: '1em',
});

const UserName = styled('h5', {
  fontSize: '1rem',
  margin: 0,
  paddingBottom: '.25em',
});

const UserDisc = styled('h6', {
  margin: 0,
});
