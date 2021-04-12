import React from 'react';
import {useForm} from 'react-hook-form';

import {Button} from '../../../components/Button';
import {LabelledInput} from '../../../components/Input';
import {ProtectedAction} from '../../../components/ProtectedAction';
import {Stack} from '../../../components/Stack';
import {useAuthorizedComponent} from '../../../hooks/useAuthorizedComponent';
import {styled} from '../../../styled';

export const PrivateCreate = () => {
  const {lock} = useAuthorizedComponent(undefined, undefined, {eager: true});
  const {handleSubmit, register} = useForm();

  if (lock) return null;

  return (
    <Container>
      <Title>Create a Private Game</Title>
      <Form onSubmit={handleSubmit(console.log)}>
        <Stack>
          <LabelledInput label="Room Name" {...register('name')} />
          <LabelledInput label="password" {...register('password')} />
          <LabelledInput label="mode" {...register('mode')} />
          <ProtectedAction>
            <Button type="submit">Continue</Button>
          </ProtectedAction>
        </Stack>
      </Form>
    </Container>
  );
};

const Container = styled('section', {
  paddingTop: '10vh',
  paddingLeft: '5vw',
});

const Form = styled('form', {
  backgroundColor: '$background3',
  width: '70%',
  padding: '1.25em',
  borderRadius: '4px',
});

export const Title = styled('h1', {
  fontSize: '56px',
});
