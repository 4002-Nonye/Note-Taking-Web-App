import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { ClipLoader } from "react-spinners";
import { useTheme } from "../contexts/ThemeContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();
  const { themeColor } = useTheme();

  useEffect(() => {
    if (!user && !isLoading) navigate("/");
  }, [isLoading, navigate, user]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader
          size={50}
          color={themeColor === "dark" ? "#ffffff" : "#000000"}
          cssOverride={{
            borderWidth: "5px",
          }}
        />
      </div>
    );

  if (user) return children;

  //  Fix: ensure something is always returned
  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
