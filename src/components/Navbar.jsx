import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';

function Navbar() {
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.user);

  const onClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='navbar h-auto flex bg-neutral text-neutral-content '>
        <div className='flex-1 mx-1 justify-between '>
          <Link to='/' className=' items-center flex normal-case text-xl'>
            <img src='/icons8-chat-48.png' alt='logo' />
            ChitChat
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal p-0'>
            {!authUser ? (
              <>
                <li>
                  <Link to='/sign-up'>Sign Up</Link>
                </li>
                <li tabIndex='0'>
                  <Link to='/sign-in'>Sign In</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/sign-in'>
                    <button onClick={onClick}>Logout</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
