import { useCallback, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Recognition.module.css'
import { useSpeechRecognition } from '../../hooks/Recognition'

export default function Recognition() {
  const recognition = useSpeechRecognition();
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    console.log(event);
  }, [recognition]);

  useEffect(() => {
    recognition.onresult = handleResult;
    recognition.start();

    return () => {
      recognition.stop();
    };
  });

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
        </div>
      </main>
    </div>
  )
}
