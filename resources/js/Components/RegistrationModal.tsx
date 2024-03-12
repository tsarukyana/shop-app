import { type FC, useEffect, useRef, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomizedModal from './CustomizedModal';
import Input from './Input';
import registrationScheme from '@/utils';

type TRegistrationModalProps = {
    open: boolean
    onClose: () => void
    openLoginModal: () => void
}

const RegistrationModal: FC<TRegistrationModalProps> = ({ open, onClose, openLoginModal }) => {
  const {
    reset,
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitted, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationScheme),
  });

  const password = watch(['password'])[0];
  const passwordConfirm = watch(['passwordConfirm'])[0];

  const isDisabled = !!isDirty && isValid;

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit = (data) => console.log('submitted');

  useEffect(() => {
    if (password === passwordConfirm) {
      clearErrors(['password', 'passwordConfirm']);
    }
  }, [clearErrors, password, passwordConfirm]);

  return (
    <CustomizedModal
      closable
      open={open}
      onClose={handleClose}
      title='Create Account'
    >
      <div className='mt-3 w-full flex flex-col gap-5 bg-primary'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-between gap-3'>
            <Input
              name='name'
              type='text'
              placeholder='Name'
              register={register}
              error={errors?.name?.message}
            />
            <Input
              type='email'
              name='email'
              register={register}
              error={errors?.email?.message}
              placeholder='Email'
            />
            <Input
              name='password'
              type='password'
              placeholder='Password'
              register={register}
              error={errors?.password?.message}
            />
            <Input
              type='password'
              register={register}
              name='passwordConfirm'
              placeholder='Confirm Password'
              error={errors?.passwordConfirm?.message}
            />
          </div>

          <button
            type='submit'
            className='bg-secondary rounded-lg text-white py-2 px-3 hover:cursor-pointer'
            disabled={isDisabled}
          >
            Create Account
          </button>
        </form>
        <div className={'styles.container__account'}>
          <p
            className={
              'flex items-center gap-2 text-white styles.container__account__btn'
            }
          >
            Have you already an account ?
            <span role='button' className='text-primary10'>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </CustomizedModal>
  );
};
export default RegistrationModal;
