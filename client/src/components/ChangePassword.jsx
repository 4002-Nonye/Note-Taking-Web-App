import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";

import PasswordVisibility from "./PasswordVisibility";
import Button from "./Button";
import Errors from "./Errors";

function ChangePassword() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Password change submitted:", data);
    // Add your password change logic here
  };
  const onError = (err) => {
    console.log(err);
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <Button
        onclick={() => navigate("/account/settings")}
        customClass="group flex gap-2 pt-3 px-3 text-gray-500 block lg:hidden  items-center xl:hidden text-sm"
      >
        <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
        <span>Settings</span>
      </Button>
      <div className="px-7 pt-9 pb-7">
        <h3 className="mb-6 text-lg font-bold">Change Password</h3>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-4"
        >
          {/* Current Password */}
          <div className="relative w-full md:w-3/4 xl:w-2/4">
            <label htmlFor="currentPassword" className="text-sm">
              Old Password
            </label>

            <input
              autoComplete="current-password"
              type={visibility.current ? "text" : "password"}
              id="currentPassword"
              className="dark:border-darkBorder mt-2 w-full rounded-md border-2 border-gray-300 p-3 outline-0"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            <PasswordVisibility
              customClass="absolute top-12 right-2"
              passwordVisible={visibility.current}
              setPasswordVisible={() => toggleVisibility("current")}
            />
            {errors.currentPassword && (
              <Errors err={errors.currentPassword.message} />
            )}
          </div>

          {/* New Password */}
          <div className="relative w-full md:w-3/4 xl:w-2/4">
            <label htmlFor="newPassword" className="text-sm">
              New Password
            </label>

            <input
              autoComplete="new-password"
              type={visibility.new ? "text" : "password"}
              id="newPassword"
              className="dark:border-darkBorder mt-2 w-full rounded-md border-2 border-gray-300 p-3 outline-0"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "New password must be at least 8 characters",
                },
              })}
            />
            <PasswordVisibility
              customClass="absolute top-12 right-2"
              passwordVisible={visibility.new}
              setPasswordVisible={() => toggleVisibility("new")}
            />

            <p className="text-[12px] text-gray-700 italic dark:text-gray-500">
              At least 8 characters
            </p>
            {errors.newPassword && <Errors err={errors.newPassword.message} />}
          </div>

          {/* Confirm Password */}
          <div className="relative w-full md:w-3/4 xl:w-2/4">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm New Password
            </label>

            <input
              autoComplete="new-password"
              type={visibility.confirm ? "text" : "password"}
              id="confirmPassword"
              className="dark:border-darkBorder mt-2 w-full rounded-md border-2 border-gray-300 p-3 outline-0"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
            />
            <PasswordVisibility
              customClass="absolute top-12 right-2"
              passwordVisible={visibility.confirm}
              setPasswordVisible={() => toggleVisibility("confirm")}
            />
            {errors.confirmPassword && (
              <Errors err={errors.confirmPassword.message} />
            )}
          </div>

          <div className="relative flex w-full justify-end md:w-3/4 xl:w-2/4">
            <Button
              type="submit"
              customClass="bg-primaryBlue text-white rounded-md justify-center md:w-[35%] w-2/4"
            >
              Save Password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
