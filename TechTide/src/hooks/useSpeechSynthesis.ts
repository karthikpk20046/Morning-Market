import { useState, useEffect } from 'react';

interface SpeechOptions {
  text: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      // Get voices
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };

      updateVoices();

      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speak = (options: SpeechOptions) => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(options.text);
    
    // Set options
    if (options.voice) utterance.voice = options.voice;
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;
    if (options.volume) utterance.volume = options.volume;

    // Default to a more natural sounding voice if available
    if (!options.voice) {
      const englishVoices = voices.filter(voice => 
        voice.lang.startsWith('en-') && voice.name.includes('Google') || voice.name.includes('Samantha')
      );
      if (englishVoices.length > 0) {
        utterance.voice = englishVoices[0];
      }
    }

    // Event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    speak,
    cancel,
    speaking,
    supported,
    voices,
  };
};
