import UserSidebar from '../components/UserSidebar';
import MessagesContent from '../components/MessagesContent';

function ChatUI() {
  return (
    <div id='frame'>
      <UserSidebar />
      <MessagesContent />
    </div>
  );
}

export default ChatUI;
