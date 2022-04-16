import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
