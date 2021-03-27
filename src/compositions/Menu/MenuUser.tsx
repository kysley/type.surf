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
        {user ? (
          <span>
            {user.username}#{user.discriminator}
          </span>
        ) : (
          <span>Anonymous #1234</span>
        )}
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
  height: '50px',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const UserIcon = styled('div', {
  background: 'green',
  height: '30px',
  width: '30px',
  borderRadius: '50%',
});
