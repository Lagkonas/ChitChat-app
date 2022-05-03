import { useState } from 'react';
import { useSelector } from 'react-redux';
import { realtimeDB } from '../firebase.config';
import { set, ref } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

function TextInput() {
  const [message, setMessage] = useState('');

  const { user } = useSelector((state) => state.user);

  const { email, displayName } = user;

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const emailCopy = email.split('@')[0];

  const onClick = () => {
    const messageId = uuidv4();
    set(ref(realtimeDB, messageId), {
      emailCopy,
      displayName,
      message,
    });
    setMessage('');
  };

  return (
    <div className='message-input'>
      <div className='wrap'>
        <input
          id='message'
          value={message}
          onChange={onChange}
          type='text'
          placeholder='Write your message...'
        />
        <button id='submit' onClick={onClick} className='submit'></button>
      </div>
    </div>
  );
}

export default TextInput;
