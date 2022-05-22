import { useState } from 'react';

function SentMessageItem({ message, timestamp }) {
  const [showTime, setShowTime] = useState(null);

  const timeInterval = new Date(timestamp);
  const messageTimeSent = `${timeInterval.getHours()}:${timeInterval.getMinutes()}`;

  const timeElement = <h7 id='time-sent'>{messageTimeSent}</h7>;

  const displayTime = () => {
    setShowTime(timeElement);
  };

  const removeTime = () => {
    setShowTime(null);
  };

  return (
    <li className='replies'>
      <p onMouseOver={displayTime} onMouseOut={removeTime}>
        {message}
      </p>
      {showTime}
    </li>
  );
}

export default SentMessageItem;
