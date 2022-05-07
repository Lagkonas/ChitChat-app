import { useSelector } from 'react-redux';
import {useCurrentMessages} from '../hooks/useCurrentMessages'
import ReceivedMessageItem from './ReceivedMessageItem';
import SentMessageItem from './SentMessageItem';
import TextInput from './TextInput';

function MessagesContent() {
  const { user } = useSelector((state) => state.user);
  const userName = user.displayName;
  
  const {messages} = useCurrentMessages();
  
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   onValue(ref(realtimeDB), (snapshot) => {
  //     setMessages([]);
  //     const data = snapshot.val()
  //     if (data !== null) {
  //       Object.values(data)
  //       .sort((a,b)=> a.timestamp - b.timestamp)
  //       .map((message) => setMessages((prevState) => [...prevState, message])
  //       );
  //     }
  //     // setMessages(prevState=>[...prevState, data])
  //   });
  // }, []);

  return (
    <div className='content'>
      <div className='contact-profile'>
        <p>Global Chat</p>
      </div>
      <div className='messages'>
        <ul id='messages'>
          {messages.map((message, index) => {
            return userName === message.displayName ? (
              <SentMessageItem
                displayName={message.displayName}
                message={message.message}
                key={index}
              />
            ) : (
              <ReceivedMessageItem
                displayName={message.displayName}
                message={message.message}
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
