function TextInput() {
  return (
    <div className='message-input'>
      <div className='wrap'>
        <input id='text' type='text' placeholder='Write your message...' />
        <i className='fa fa-paperclip attachment' aria-hidden='true'></i>
        <button id='submit' className='submit'>
          <i className='fa fa-paper-plane' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  );
}

export default TextInput;
