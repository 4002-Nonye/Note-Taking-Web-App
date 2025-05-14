import { useState } from "react";
import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import logo from "../assets/icon-logo.svg";
import Button from "../components/Button";
import AuthHeader from "../components/AuthHeader";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisible = () => {
    setPasswordVisible((visible) => !visible);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex w-[30rem] flex-col items-center rounded-md bg-white px-3 py-7 shadow-md"
    >
      <AuthHeader
        logo={logo}
        header="Create Your Account"
        subHead="Sign up to start organizing your notes and boost your productivity."
      />

      <div className="mt-7 w-[85%]">
        <div className="flex flex-col gap-1">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="email@example.com"
            className="border-gray w-full rounded-md border-2 border-gray-300 p-2 outline-0"
            {...register("email")}
          />
        </div>

        <div className="relative mt-4 flex flex-col gap-1">
          <label htmlFor="userPassword">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="userPassword"
            id="userPassword"
            className="mb-3 w-full rounded-md border-2 border-gray-300 p-2 outline-0"
          />
          {passwordVisible ? (
            <FaEyeSlash
              className="absolute top-10 right-2 cursor-pointer"
              onClick={handlePasswordVisible}
            />
          ) : (
            <FaEye
              className="absolute top-10 right-2 cursor-pointer"
              onClick={handlePasswordVisible}
            />
          )}
        </div>
      </div>

      <Button type="authBtn">Sign up</Button>
      <div className="my-6 w-[85%] border-t-2 border-gray-200" />

      <p>or Log in with:</p>

      <Button type="googleBtn" purpose="link" href="/auth/google">
        <FcGoogle />
      </Button>

      <div className="my-7 w-[85%] border-t-2 border-gray-200" />

      <p>
        Already have an account?{" "}
        <Link to="/">
          <span className="text-primaryBlue underline">Log in</span>
        </Link>
      </p>
    </form>
  );
}

export default Register;
