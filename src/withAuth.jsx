import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from './Components/Spinner';
import { useCookies } from "react-cookie";

const withAuth = (WrappedComponent) => {
    const HocComponent = (props) => {
      const navigate = useNavigate();
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [redirecting, setRedirecting] = useState(false);
      const [cookies] = useCookies(['jwt']);

      useEffect(() => {
        const checkAuth = async () => {
            console.log('Cookies:', cookies);
            const isAuth = cookies.jwt;
            console.log('isAuth:', isAuth);
            if (!isAuth) {
                setRedirecting(true);
                console.log('Redirecting to login');
                navigate('/login');
            } else {
                setLoading(false);
                setUser(true);
            }
        };
        
        checkAuth();
      }, [navigate, cookies]);

      console.log('user:', user);

      if (loading || redirecting) {
        return <div><Spinner /></div>;
      }
  
      return <WrappedComponent {...props} />;
    };
  
    return HocComponent;
};

export default withAuth;
