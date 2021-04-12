import React from 'react';

import {styled} from '../../styled';

import {useMe} from '../../hooks/api/useMe';
import {Button} from '../../components/Button';
import {Stack} from '../../components/Stack';

export const MenuUser = () => {
  const {user} = useMe();

  return (
    <section>
      {user?.mock && (
        <Stack>
          <Button variant="link">Sign Up</Button>
          <Button variant="outline">Login</Button>
        </Stack>
      )}
      <MUContainer>
        <UserIcon>
          <span>{user.username[0]}</span>
        </UserIcon>
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
  // height: '75px',
  alignItems: 'center',
  marginTop: '2rem',
  // justifyContent: 'space-around',
});

const UserIcon = styled('div', {
  background: 'linear-gradient(56deg, #5c258d, #4389a2)',
  height: '35px',
  width: '35px',
  borderRadius: '18%',
  marginRight: '1em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
});

const UserName = styled('h5', {
  fontSize: '1rem',
  margin: 0,
  paddingBottom: '.25em',
});

const UserDisc = styled('h6', {
  margin: 0,
});
