import { useState } from 'react';

function ReceivedMessageItem({ displayName, message, timestamp }) {
  const [showTime, setShowTime] = useState(null);

  const convertedTimestamp = new Date(timestamp);
  const messageTimeSent = `${convertedTimestamp.getHours()}:${convertedTimestamp.getMinutes()}`;

  const timeElement = <h7 id='time-received'>{messageTimeSent}</h7>;

  const displayTime = () => {
    setShowTime(timeElement);
  };

  const removeTime = () => {
    setShowTime(null);
  };

  return (
    <li className='sent'>
      <h1>{displayName}</h1>
      <p onMouseOver={displayTime} onMouseOut={removeTime}>
        {message}
      </p>
      {showTime}
    </li>
  );
}

export default ReceivedMessageItem;
