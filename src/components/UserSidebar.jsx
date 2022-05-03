import UserItem from './UserItem';

function UserSidebar() {
  return (
    <div id='sidepanel'>
      <div id='profile'>
        <div className='wrap'>
          <p id='user'>Mike Ross</p>
        </div>
      </div>
      <div id='search'>
        <label>
          <i className='fa fa-search' aria-hidden='true'></i>
        </label>
        <input type='text' placeholder='Search contacts...' />
      </div>
      <UserItem />
    </div>
  );
}

export default UserSidebar;
