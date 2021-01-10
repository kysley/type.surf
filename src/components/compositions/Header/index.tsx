import {Hexagon} from '@styled-icons/feather';
import React from 'react';
import styled from 'styled-components';
import {useMe} from '../../../hooks/api/useMe';

import {Box} from '../../Box';
import {Button} from '../../Button';

const HeaderContainer = styled(Box)({
  display: 'grid',
  gridTemplateAreas: '"reserved nav userspace"',
  gridTemplateColumns: '1fr 1fr 1fr',
});

export const Header = () => {
  const {user} = useMe();
  return (
    <HeaderContainer>
      <Box gridArea="nav" flexDirection="row" display="flex">
        <Button>solo</Button>
        <Button>multiplayer</Button>
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
