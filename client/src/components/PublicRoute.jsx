import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";

function PublicRoute({ children }) {
  const { user, isLoading } = useUser();
  const isDark = document.documentElement.classList.contains("dark");
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/notes");
    }
  }, [user, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader
          size={50}
          color={isDark ? "#ffffff" : "#000000"}
          cssOverride={{
            borderWidth: "5px",
          }}
        />
      </div>
    );

  return children;
}

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node,
};
