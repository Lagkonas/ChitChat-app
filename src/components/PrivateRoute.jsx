import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { authUser } = useSelector(state => state.user);

  return authUser ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
