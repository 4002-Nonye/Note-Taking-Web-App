import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";

import logo from "../assets/icon-logo.svg";
import Button from "../components/Button";
import AuthHeader from "../components/AuthHeader";
import PasswordVisibility from "../components/PasswordVisibility";
import Errors from "../components/Errors";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/register", data);
      navigate("/notes", { replace: true });
    } catch (err) {
      if (err) console.log("Login failed:", err.response?.data || err.message);
    }
  };
  const onError = (err) => {
    console.log(err);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mt-10 flex w-[30rem] flex-col items-center rounded-md bg-white px-3 py-7 shadow-md"
      noValidate
    >
      <AuthHeader
        logo={logo}
        header="Create Your Account"
        subHead="Sign up to start organizing your notes and boost your productivity."
      />

      <div className="mt-7 w-[85%]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label htmlFor="userEmail">Email</label>
            {errors.email && <Errors err={errors.email.message} />}
          </div>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="email@example.com"
            className="border-gray w-full rounded-md border-2 border-gray-300 p-2 outline-0"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
        </div>

        <div className="relative mt-4 flex flex-col gap-1">
          <div className="flex justify-between">
            {" "}
            <label htmlFor="userPassword">Password</label>
            {errors.password && <Errors err={errors.password.message} />}
          </div>

          <input
            type={passwordVisible ? "text" : "password"}
            name="userPassword"
            id="userPassword"
            autoComplete="true"
            className="w-full rounded-md border-2 border-gray-300 p-2 text-sm text-gray-500 outline-0"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "at least 8 characters",
              },
            })}
          />
          <PasswordVisibility
            customClass="absolute top-10 right-2"
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
          />
          <span className="mb-3 text-[12px] text-gray-700 italic">
            At least 8 characters
          </span>
        </div>
      </div>

      <Button type="authBtn">Sign up</Button>
      <div className="my-6 w-[85%] border-t-2 border-gray-200" />

      <p>or Log in with:</p>

      <Button type="googleBtn" purpose="link" href="/auth/google">
        <FcGoogle /> <span className="text-gray-500 text-sm font-medium"> &nbsp; Google</span>
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
