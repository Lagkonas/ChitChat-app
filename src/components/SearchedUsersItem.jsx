function SearchedUsersItem({ users }) {
  return (
    <li className='contact'>
      <div className='wrap'>
        <div className='meta'>
          <p className='name'>{users}</p>
        </div>
      </div>
    </li>
  );
}

export default SearchedUsersItem;
