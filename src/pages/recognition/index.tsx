import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
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

enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export default function Recognition() {
  const recognition = useRecognition();
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight, setFontWeight] = useState(600);
  const [color, setColor] = useState('#000000');
  const [textAlign, setTextAlign] = useState(TextAlign.Left);
  const [textStrokeWidth, setTextStrokeWidth] = useState(3);

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
    setFontSize(Number(value));
  }, []);
  const handleInputFontWeight = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFontWeight(Number(value));
  }, []);
  const handleInputColor = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setColor(value);
  }, []);
  const handleInputTextAlign = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTextAlign(value as TextAlign);
  }, []);
  const handleInputTextStrokeWidth = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setTextStrokeWidth(Number(value));
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    textAlign
  };
  const textStrokeStyle: React.CSSProperties = {
    WebkitTextStrokeWidth: `${textStrokeWidth * 2}px`
  };

  const radios = Object
    .values(TextAlign)
    .map((textAlign: TextAlign) => {
      const id = `textAlign_${textAlign}`;
      return (
        <div>
          <input
            type='radio'
            id={id}
            name='textAlign'
            value={textAlign}
            onChange={handleInputTextAlign} />
          <label
            htmlFor={id}>
            {textAlign}
          </label>
        </div>
      );
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

        <div
          className={styles.textContainer}>
          <div
            style={{ ...textStyle, ...textStrokeStyle }}
            className={styles.textStroke}>
            {text}
          </div>
          <div
            style={textStyle}
            className={styles.text}>
            {text}
          </div>
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
        {radios}
        <select
          value={fontWeight}
          onChange={handleInputFontWeight}>
          <option
            value={300}>
            通常
          </option>
          <option
            value={600}>
            太字
          </option>
        </select>
        <input
          type='number'
          className={styles.inputText}
          value={textStrokeWidth}
          onChange={handleInputTextStrokeWidth} />
      </main>
    </div>
  )
}
