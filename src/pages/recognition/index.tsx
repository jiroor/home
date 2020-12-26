import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Recognition.module.css'
import { useSpeechRecognition } from '../../hooks/Recognition'

export default function Recognition() {
  const recognition = useSpeechRecognition();
  const [text, setText] = useState('');
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const { results, resultIndex } = event;
    Array.from(results)
      .slice(resultIndex)
      // .filter((result) => result.isFinal)
      .forEach((result) => {
        setText(result.item(0).transcript);
        console.log(result.item(0).transcript);
      })
  }, [recognition]);

  useEffect(() => {
    recognition.onresult = handleResult;
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
