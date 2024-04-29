import {useAuth} from './withAuth'
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const withRoleCheck = (allowedRoles) => (WrappedComponent) => {
    const WithRoleCheck = (props) => {
      const { isAuthenticated, user } = useAuth();
      const navigate = useNavigate();
  
      if (!isAuthenticated || !allowedRoles.includes(user.role)) {
        navigate('/unauthorized');
         return (
                <section className='bg-indigo-50'>
                  <div className='container m-auto max-w-2xl py-24'>
                    <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                      <h2 className='text-3xl text-center font-semibold mb-6'>Unauthorized Access</h2>
                      <p className='text-center'>You do not have permission to access this page.</p>
                    </div>
                  </div>
                </section>
              );
      }
  
      return <WrappedComponent {...props} />;
    };
  
    return WithRoleCheck;
  };
  