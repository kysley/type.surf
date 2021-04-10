import {DialogOverlay, DialogContent} from '@reach/dialog';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTransition} from 'react-spring';
import {animated} from 'react-spring';
import {Button} from '../../../components/Button';
import {Stack} from '../../../components/Stack';

import {styled} from '../../../styled';

const StyledDialogContent = styled(DialogContent, {
  // width: '100%',
  // height: '100%',
  padding: '1em',
  background: '$background3',
  color: '$text',
  maxWidth: '25vw',
  justifyContent: 'center',
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

const Input = styled('input', {
  background: '$background2',
  height: '40px',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid $background3',
  // borderColor: '$background3',
  transition: 'border-color .2s ease-in-out',
  outline: 'none',
  color: '$text',

  '&:hover': {
    borderColor: '$secondary',
  },

  '&:focus': {
    borderColor: '$primary',
  },
});

type LabelledInputProps = {
  type?: string;
  label: string;
};
export const LabelledInput: React.FC<LabelledInputProps> = React.forwardRef(
  ({type = undefined, label, ...rest}) => {
    return (
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '.78rem',
          textTransform: 'uppercase',
        }}
      >
        {label}
        <Input type={type} {...rest} />
      </label>
    );
  },
);

export const RegistrationModal = () => {
  const {register, handleSubmit} = useForm();

  const onSubmit = (d) => {
    console.log('submit', d);
  };

  return (
    <Modal title="Join type.surf" visible>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <LabelledInput
            {...register('username', {required: true})}
            label="username"
          />
          <LabelledInput
            {...register('email', {required: true})}
            type="email"
            label="email"
          />
          <LabelledInput
            {...(register('password'), {required: true})}
            type="password"
            label="password"
          />
          <Button type="submit" style={{fontWeight: 'bold'}}>
            Continue
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
