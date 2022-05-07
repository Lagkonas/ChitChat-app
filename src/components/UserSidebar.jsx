import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserItem from './UserItem';
import Spinner from './UsersSpinner';

function UserSidebar() {
  const [searchedUser, setSearchedUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const usersRef = collection(db, 'users');
        const docSnap = await getDocs(usersRef);

        const users = [];

        docSnap.forEach((doc) => {
          return users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setUsers(users);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const onChange = async (e) => {
    const user = await findUser(e.target.value);
    setSearchedUser(user);
  };

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const findUser = async (inputName) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', inputName));

      const userSnapshot = await getDocs(q);

      const user = [];

      userSnapshot.forEach((doc) => {
        return user.push(doc.data());
      });

      return user;
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div id='sidepanel'>
      <div id='profile'>
        <div className='wrap'>
          <p id='user'>{user.displayName}</p>
        </div>
      </div>
      <div id='search'>
        <input
          type='text'
          onChange={debounce((e) => onChange(e), 500)}
          placeholder='Search contacts...'
        />
      </div>
      <div id='contacts'>
        {loading ? (
          <Spinner/>
        )
      : (
        searchedUser.length === 0 ? (
          <ul id='users'>
            {users.map((user, index) => (
              <UserItem user={user} key={index} />
            ))}
          </ul>
        ) : (
          <ul id='users'>
            <li className='contact'>
              <div className='wrap'>
                <div className='meta'>
                  <p className='name'>{searchedUser[0].name}</p>
                </div>
              </div>
            </li>
          </ul>
        )
      )}
      </div>
    </div>
  );
}

export default UserSidebar;
