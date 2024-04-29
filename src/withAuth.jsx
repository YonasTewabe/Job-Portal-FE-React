import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from './Components/Spinner';
import { Cookies } from "react-cookie";

const withAuth = (WrappedComponent) => {
    const HocComponent = (props) => {
      const navigate = useNavigate();
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [redirecting, setRedirecting] = useState(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const cookies = new Cookies(); // Create an instance of Cookies

      useEffect(() => {
        const checkAuth = async () => {
            console.log('Cookies:', cookies);
            const jwtToken = cookies.get('jwt'); // Use cookies.get('jwt') to get the JWT token
            console.log('JWT Token:', jwtToken);
            if (!jwtToken) {
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
