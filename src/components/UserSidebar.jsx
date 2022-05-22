import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, reset } from '../features/user/userSlice';
import UserItem from './UserItem';
import SearchedUsersItem from './SearchedUsersItem';
import Spinner from './UsersSpinner';

function UserSidebar() {
  const [searchedUser, setSearchedUser] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { authUser, users, isLoading,} = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUsers());


    return () => {
      if (users) {
        dispatch(reset());
      }
    };
    // eslint-disable-next-line
  }, [dispatch]);

  const onChange = (e) => {
    setSearchInput(e.target.value);

    if (!isLoading) {
      const usersNameArray = users.map((element) => {
        return element.data.name;
      });
      const filterUsers = (array, query) => {
        return array.filter((element) => {
          return element.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
      };
      setSearchedUser(filterUsers(usersNameArray, searchInput));
    }
  };

  return (
    <div id='sidepanel'>
      <div id='profile'>
        <div className='wrap'>
          <p id='user'>{authUser.userName}</p>
        </div>
      </div>
      <div id='search'>
        <input
          type='text'
          value={searchInput}
          onChange={onChange}
          placeholder='Search contacts...'
        />
      </div>
      <div id='contacts'>
        {isLoading ? (
          <Spinner />
        ) : searchInput.length === 0 ? (
          <ul id='users'>
            {users.map((user, index) => (
              <UserItem user={user} key={index} />
            ))}
          </ul>
        ) : (
          <ul id='users'>
            {searchedUser.map((users, index) => (
              <SearchedUsersItem users={users} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserSidebar;
