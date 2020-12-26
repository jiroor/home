import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Recognition.module.css'
import { useRecognition } from '../../hooks/Recognition'

export default function Recognition() {
  const recognition = useRecognition();
  const [text, setText] = useState('');
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const transcript = recognition.getTranscript(event);
    setText(transcript);
    console.log(transcript);

    recognition.restart();
  }, [recognition]);

  useEffect(() => {
    recognition.onResult(handleResult);
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
