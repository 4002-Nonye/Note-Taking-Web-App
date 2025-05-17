import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import logo from "../assets/icon-logo.svg";
import Button from "../components/Button";
import AuthHeader from "../components/AuthHeader";
import PasswordVisibility from "../components/PasswordVisibility";
import { useForm } from "react-hook-form";
import Errors from "../components/Errors";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/login", data);
      navigate("/notes", { replace: true });
    } catch (err) {
      if (err) console.log(err.response.data.error);
    }
  };
  const onError = (err) => {
    console.log(err);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mt-10 flex w-[30rem] flex-col items-center rounded-md bg-white px-3 py-7 shadow-md"
      noValidate={true}
    >
      <AuthHeader
        logo={logo}
        header="Welcome to Note"
        subHead="Please login to continue"
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
            <label htmlFor="userPassword">Password</label>
            {errors.password && <Errors err={errors.password.message} />}
          </div>

          <input
            autoComplete="true"
            type={passwordVisible ? "text" : "password"}
            name="userPassword"
            id="userPassword"
            className="mb-3 w-full rounded-md border-2 border-gray-300 p-2 outline-0"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <PasswordVisibility
            customClass="absolute top-10 right-2"
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
          />
        </div>
      </div>

      <Button type="authBtn">Login</Button>
      <div className="my-6 w-[85%] border-t-2 border-gray-200" />

      <p>or Log in with:</p>

      <Button type="googleBtn" purpose="link" href="/auth/google">
        <FcGoogle />{" "}
        <span className="text-sm font-medium text-gray-500">
          {" "}
          &nbsp; Google
        </span>
      </Button>

      <div className="my-7 w-[85%] border-t-2 border-gray-200" />

      <p>
        No account yet?{" "}
        <Link to="/register">
          <span className="text-primaryBlue underline">Sign up</span>
        </Link>
      </p>
    </form>
  );
}

export default Login;
