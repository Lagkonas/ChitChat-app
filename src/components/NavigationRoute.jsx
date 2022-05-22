import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavigationRoute() {
  const { authUser } = useSelector((state) => state.user);

  return !authUser ? <Outlet /> : <Navigate to='/chat' />;
}

export default NavigationRoute;
