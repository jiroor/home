import { useState } from 'react';

class DummySpeechRecognition {
}

interface RecognitionOptions {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
}

class Recognition {
  recognition: SpeechRecognition;

  constructor({ lang, interimResults, continuous }: RecognitionOptions) {
    const SpeechRecognition: typeof window.SpeechRecognition = typeof window !== 'undefined'
      ? (window as any).webkitSpeechRecognition || window.SpeechRecognition
      : DummySpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = lang;
    this.recognition.interimResults = interimResults;
    this.recognition.interimResults = interimResults;
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  restart() {
    this.recognition.stop();
    this.recognition.start();
  }

  onResult(onresult: typeof SpeechRecognition.prototype.onresult) {
    this.recognition.onresult = onresult;
  }

  getTranscript(event: SpeechRecognitionEvent) {
    const { results, resultIndex } = event;
    return Array.from(results)
      .slice(resultIndex)
      // .filter((result) => result.isFinal)
      .reduce((res, result) => [...res, result.item(0).transcript], <string[]>[])
      .shift();
  }
}

export function useRecognition() {
  const [recognition] = useState(new Recognition({
    lang: 'ja',
    interimResults: true,
    continuous: true
  }));
  return recognition;
}
