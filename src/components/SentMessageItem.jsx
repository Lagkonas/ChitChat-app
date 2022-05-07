function SentMessageItem({displayName, message}) {
  return (
    <li className='replies'>
      {/* <h1>{displayName}</h1> */}
      <p>{message}</p>
    </li>
  );
}

export default SentMessageItem;
