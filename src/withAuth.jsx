import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Components/Spinner";
import { Cookies } from "react-cookie";

const withAuth = (WrappedComponent) => {
  const HocComponent = (props) => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookies = new Cookies(); // Create an instance of Cookies

    useEffect(() => {
      const checkAuth = async () => {
        const jwtToken = cookies.get("jwt"); // Use cookies.get('jwt') to get the JWT token
        if (!jwtToken) {
          setRedirecting(true);
          navigate("/login");
        } else {
          setLoading(false);
          setUser(true);
        }
      };

      checkAuth();

      // Add event listener for beforeunload to clear storage
      window.addEventListener("beforeunload", clearStorageOnUnload);

      return () => {
        // Remove event listener on cleanup
        window.removeEventListener("beforeunload", clearStorageOnUnload);
      };
    }, [navigate, cookies]);

    const clearStorageOnUnload = () => {
      localStorage.clear();
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    if (loading || redirecting) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return HocComponent;
};

export default withAuth;
