import React from 'react';
import {useForm} from 'react-hook-form';

import {Button} from '../../../components/Button';
import {LabelledInput} from '../../../components/Input';
import {Stack} from '../../../components/Stack';

export const RegistrationForm = () => {
  const {register, handleSubmit} = useForm();

  const onSubmit = (d) => console.log(d);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
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
  );
};
