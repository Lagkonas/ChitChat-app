import { useState } from 'react';
import { useSelector } from 'react-redux';
import { realtimeDB } from '../firebase.config';
import { set, ref, serverTimestamp } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify';

function TextInput() {
  const [message, setMessage] = useState('');

  const { user } = useSelector((state) => state.user);

  const { email, displayName } = user;

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const emailCopy = email.split('@')[0];

  const onClick = () => {
    if (message === '') {
      return toast.error('Please enter your message')
    }
    const messageId = uuidv4();
    set(ref(realtimeDB, messageId), {
      emailCopy,
      displayName,
      message: message.trim(),
      timestamp: serverTimestamp(),
      uid: messageId
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
          onKeyDown={e=> e.key === 'Enter' && onClick()}
          type='text'
          placeholder='Write your message...'
          autoComplete='off'
        />
        <button type='button' id='submit' onClick={onClick}  className='submit'>
        </button>
      </div>
    </div>
  );
}

export default TextInput;
