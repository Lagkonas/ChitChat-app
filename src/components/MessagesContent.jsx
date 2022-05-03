import ReceivedMessageItem from './ReceivedMessageItem';
import SentMessageItem from './SentMessageItem';
import TextInput from './TextInput';

function MessagesContent() {
  return (
    <div className='content'>
      <div className='contact-profile'>
        <p>Global Chat</p>
      </div>
      <div className='messages'>
        <ul id='messages'>
          <ReceivedMessageItem/>
          <SentMessageItem/>
        </ul>
      </div>
      <TextInput />
    </div>
  );
}

export default MessagesContent;
