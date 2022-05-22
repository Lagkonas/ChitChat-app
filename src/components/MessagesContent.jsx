import { useSelector} from 'react-redux';
import {useCurrentMessages} from '../hooks/useCurrentMessages'
import ReceivedMessageItem from './ReceivedMessageItem';
import SentMessageItem from './SentMessageItem';
import TextInput from './TextInput';

function MessagesContent() {
  const { authUser } = useSelector((state) => state.user);
  const userName = authUser.userName;

  const {messages} = useCurrentMessages()

  return (
    <div className='content'>
      <div className='contact-profile'>
        <p>Global Chat</p>
      </div>
      <div className='messages'>
        <ul id='messages'>
          {messages.map((message, index) => {
            return userName === message.userName ? (
              <SentMessageItem
                displayName={message.userName}
                message={message.message}
                timestamp={message.timestamp}
                key={index}
              />
            ) : (
              <ReceivedMessageItem
                displayName={message.userName}
                message={message.message}
                timestamp={message.timestamp}
                key={index}
              />
            );
          })}
        </ul>
      </div>
      <TextInput />
    </div>
  );
}

export default MessagesContent;
