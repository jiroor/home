import { FormEvent, useCallback, useEffect, useState } from 'react'
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
  const [fontSize, setFontSize] = useState('14');
  const [color, setColor] = useState('#000000');

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const { transcript, isFinal } = getResult(event);
    const text = isFinal ? transcript : `[${transcript}]`;
    setText(text);
    console.log('onresult', text);
  }, [recognition]);
  const handleStart = useCallback(() => {
    console.log('onstart');
  }, []);
  const handleEnd = useCallback(() => {
    recognition.start();
    console.log('onend');
  }, [recognition]);
  const handleError = useCallback((event: ErrorEvent) => {
    console.error(event);
  }, []);

  useEffect(() => {
    recognition.onresult = handleResult;
    recognition.onstart = handleStart;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [recognition]);

  const handleInputFontSize = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setFontSize(value);
  }, []);
  const handleInputColor = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setColor(value);
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    color
  };

  return (
    <div>
      <Head>
        <title>recognition</title>
      </Head>

      <main>
        <h1>
          recognition
        </h1>

        <div style={textStyle}>
          {text}
        </div>

        <input
          type='number'
          className={styles.inputText}
          value={fontSize}
          onChange={handleInputFontSize} />
        <input
          type='color'
          className={styles.inputColor}
          value={color}
          onInput={handleInputColor} />
      </main>
    </div>
  )
}
