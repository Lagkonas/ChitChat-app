import { useState, useEffect } from 'react';
import { realtimeDB } from '../firebase.config';
import { ref, onValue } from 'firebase/database';

export const useCurrentMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(ref(realtimeDB), (snapshot) => {
      setMessages([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data)
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((message) =>
            setMessages((prevState) => [...prevState, message])
          );
      }
    });
  }, []);

  return { messages };
};

export default useCurrentMessages;
