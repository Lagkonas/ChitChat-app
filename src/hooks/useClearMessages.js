import { useEffect } from 'react';
import { useCurrentMessages } from '../hooks/useCurrentMessages';
import { realtimeDB } from '../firebase.config';
import { ref, remove } from 'firebase/database';

export const useClearMessages = () => {
  const { messages } = useCurrentMessages();

  useEffect(() => {
    const now = Date.now();
    const twoHours = 7200000;
    messages.forEach((message) => {
      if (now - message.timestamp > twoHours) {
        remove(ref(realtimeDB, message.uid));
      }
    });
  },[messages]);
};
