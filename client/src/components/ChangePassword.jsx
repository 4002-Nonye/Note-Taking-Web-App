import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import PasswordVisibility from "./PasswordVisibility";
import Button from "./Button";

import { useChangePassword } from "../features/authentication/useChangePassword";
import { useVisibility } from "../utils/useVisibility";
import MoveBack from "./MoveBack";
import { ClipLoader } from "react-spinners";
import ErrMsg from "./ErrMsg";

function ChangePassword() {
  const { visibility, toggleVisibility } = useVisibility();
  const { changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Password change submitted:", data);
    const { currentPassword, newPassword } = data;
    changePassword({ currentPassword, newPassword });
    reset();
  };
  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      <MoveBack
        text="Settings"
        navigateTo="/account/settings"
        className="group flex items-center gap-2 px-3 pt-3 text-sm text-gray-500 lg:hidden"
      />
      <div className="px-7 pt-9 pb-7">
        <h3 className="mb-6 text-lg font-bold">Change Password</h3>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
          >
            {/* Visually hidden username/email field for accessibility & autofill */}
            <input
              type="email"
              name="email"
              autoComplete="username"
              defaultValue="" // You can get this from context or props
              style={{
                position: "absolute",
                opacity: 0,
                height: 0,
                pointerEvents: "none",
              }}
              tabIndex={-1}
            />
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
                <ErrMsg err={errors.currentPassword.message} />
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
              {errors.newPassword && (
                <ErrMsg err={errors.newPassword.message} />
              )}
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
                <ErrMsg err={errors.confirmPassword.message} />
              )}
            </div>

            <div className="relative flex w-full justify-end md:w-3/4 xl:w-2/4">
              <Button
                customClass={`bg-primaryBlue text-white rounded-md justify-center md:w-[35%] w-2/4 ${isPending ? "pointer-events-none" : ""}`}
              >
                {isPending ? (
                  <ClipLoader color="white" size={22} />
                ) : (
                  "Save Password"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default ChangePassword;
