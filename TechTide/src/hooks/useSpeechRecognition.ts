import { useState, useEffect, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState<boolean>(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setHasRecognitionSupport(true);
    }
  }, []);

  const startListening = useCallback(() => {
    setText('');
    setIsListening(true);

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  };
};
