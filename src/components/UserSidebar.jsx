import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getDocs, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import UserSearchInput from './UserSearchInput';
import UserItem from './UserItem';
import Spinner from './Spinner';

function UserSidebar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
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
        console.log(error);
      }
    };
    fetchUsers();
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  if (users.length > 0) {
    return (
      <div id='sidepanel'>
        <div id='profile'>
          <div className='wrap'>
            <p id='user'>{user.displayName}</p>
          </div>
        </div>
        <UserSearchInput />
        <div id='contacts'>
          <ul id='users'>
            {users.map((user, index) => (
              <UserItem user={user} key={index} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserSidebar;
