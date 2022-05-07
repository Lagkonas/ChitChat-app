function UserItem(user) {
  const userName = user.user.data.name;

  return (
        <li className='contact'>
          <div className='wrap'>
            <div className='meta'>
              <p className='name'>{userName}</p>
            </div>
          </div>
        </li>
  );
}

export default UserItem;
