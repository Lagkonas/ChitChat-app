function ReceivedMessageItem({displayName, message}) {
  return (
    <li className='sent'>
      <h1>{displayName}</h1>
      <p>{message}</p>
    </li>
  );
}

export default ReceivedMessageItem;
