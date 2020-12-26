import { useState } from 'react';

class DummySpeechRecognition {
}

export function useSpeechRecognition() {
  const SpeechRecognition: typeof window.SpeechRecognition = typeof window !== 'undefined'
    ? (window as any).webkitSpeechRecognition || window.SpeechRecognition
    : DummySpeechRecognition;

  const [recognition] = useState(new SpeechRecognition());
  recognition.lang = 'ja';
  recognition.interimResults = true;
  recognition.continuous = true;
  return recognition;
}
