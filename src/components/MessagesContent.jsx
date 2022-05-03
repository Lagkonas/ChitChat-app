import TextInput from './TextInput';

function MessagesContent() {
  return (
    <div className='content'>
      <div className='contact-profile'>
        <p>Harvey Specter</p>
      </div>
      <div className='messages'>
        <ul id='messages'>
          <li className='sent'>
            <h1>Harvey Specter</h1>
            <p>
              How the hell am I supposed to get a jury to believe you when I am
              not even sure that I do?!
            </p>
          </li>
          <li className='replies'>
            <h1>Mike Ross</h1>
            <p>
              When you're backed against the wall, break the god damn thing
              down.
            </p>
          </li>
        </ul>
      </div>
      <TextInput />
    </div>
  );
}

export default MessagesContent;
