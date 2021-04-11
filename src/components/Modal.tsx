import React from 'react';
import {DialogContent, DialogOverlay} from '@reach/dialog';
import {animated, useTransition} from 'react-spring';

import {styled} from '../styled';

const StyledDialogContent = styled(DialogContent, {
  // width: '100%',
  // height: '100%',
  padding: '1em',
  background: '$background3',
  color: '$text',
  maxWidth: '25vw',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const AnimatedDialogOverlay = animated(DialogOverlay);

const Title = styled('h1', {});

type ModalProps = {
  title: string;
  visible: boolean;
};
export const Modal: React.FC<ModalProps> = ({children, title, visible}) => {
  const transition = useTransition(visible, null, {
    from: {opacity: 0, transform: 'translateY(-40px)'},
    enter: {opacity: 1, transform: 'translateY(0px)'},
    leave: {opacity: 0, transform: 'translateY(-40px)'},
  });
  return (
    <>
      {transition.map(
        ({item, key, props}) =>
          item && (
            <AnimatedDialogOverlay key={key} style={props}>
              <StyledDialogContent>
                <Title>{title}</Title>
                {children}
              </StyledDialogContent>
            </AnimatedDialogOverlay>
          ),
      )}
    </>
  );
};
