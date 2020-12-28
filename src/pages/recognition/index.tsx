import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Recognition.module.css'
import { useRecognition } from '../../hooks/Recognition'

const getResult = (event: SpeechRecognitionEvent) => {
  const { results, resultIndex } = event;
  const result = Array.from(results)
    .slice(resultIndex)
    .shift();

  return {
    transcript: result.item(0).transcript,
    isFinal: result.isFinal
  };
};


export default function Recognition() {
  const recognition = useRecognition();
  const [text, setText] = useState('');

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const { transcript, isFinal } = getResult(event);
    const text = isFinal ? transcript : `[${transcript}]`;
    setText(text);
  }, [recognition]);
  const handleEnd = useCallback(() => {
    recognition.start();
  }, [recognition]);

  useEffect(() => {
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [recognition]);

  return (
    <div>
      <Head>
        <title>recognition</title>
      </Head>

      <main>
        <h1>
          recognition
        </h1>

        <div>
          {text}
        </div>
      </main>
    </div>
  )
}
