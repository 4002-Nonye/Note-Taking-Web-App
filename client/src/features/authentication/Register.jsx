import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import darkLogo from '../../assets/icon-logo.svg';
import logo from '../../assets/icon-logo-white.svg';
import AuthHeader from '../../components/AuthHeader';
import Button from '../../components/Button';
import ErrMsg from '../../components/ErrMsg';
import PasswordVisibility from '../../components/PasswordVisibility';

import { useRegister } from './useRegister';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register: signUp, isPending } = useRegister();
  const onSubmit = async (data) => {
    signUp(data);
  };
  const onError = (err) => {
    console.log(err);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="dark:bg-darkbg mt-10 mb-9 flex w-[90%] flex-col items-center rounded-md bg-white px-3 py-7 shadow-md md:w-[30rem] lg:mb-0"
      noValidate
    >
      <AuthHeader
        header="Create Your Account"
        subHead="Sign up to start organizing your notes and boost your productivity."
      >
        <img src={darkLogo} alt="logo" className="block p-3 dark:hidden" />
        <img src={logo} alt="logo" className="hidden p-3 dark:block" />
      </AuthHeader>

      <div className="mt-7 w-[85%]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="userEmail">Email</label>
            {errors.email && <ErrMsg err={errors.email.message} />}
          </div>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="email@example.com"
            className="border-gray dark:border-darkBorder w-full rounded-md border-2 border-gray-300 p-2 outline-0 dark:text-gray-400"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
          />
        </div>

        <div className="relative mt-4 flex flex-col gap-1">
          <div className="flex justify-between">
            {' '}
            <label htmlFor="userPassword">Password</label>
            {errors.password && <ErrMsg err={errors.password.message} />}
          </div>

          <input
            type={passwordVisible ? 'text' : 'password'}
            name="userPassword"
            id="userPassword"
            autoComplete="true"
            className="dark:border-darkBorder w-full rounded-md border-2 border-gray-300 p-2 text-sm text-gray-500 outline-0 dark:text-gray-400"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'at least 8 characters',
              },
            })}
          />
          <PasswordVisibility
            customClass="absolute top-10 right-2 dark:text-gray-400"
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
          />
          <span className="mb-3 text-[12px] text-gray-700 italic">At least 8 characters</span>
        </div>
      </div>

      <Button type="authBtn" customClass={isPending ? 'pointer-events-none' : ''}>
        {isPending ? <ClipLoader color="white" size={22} /> : 'Sign up'}
      </Button>
      <div className="dark:border-darkBorder my-6 w-[85%] border-t-2 border-gray-200" />

      <p className="dark:text-gray-400">or Log in with:</p>

      <Button type="googleBtn" purpose="link" href="/auth/google">
        <FcGoogle /> <span className="text-sm font-medium text-gray-500"> &nbsp; Google</span>
      </Button>

      <div className="dark:border-darkBorder my-7 w-[85%] border-t-2 border-gray-200" />

      <p className="dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/">
          <span className="text-primaryBlue underline">Log in</span>
        </Link>
      </p>
    </form>
  );
}

export default Register;
