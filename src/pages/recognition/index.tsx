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
  const [color, setColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState(TextAlign.Center);
  const [textStrokeWidth, setTextStrokeWidth] = useState(3);
  const [textStrokeColor, setTextStrokeColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

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
  const handleInputTextStrokeColor = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setTextStrokeColor(value);
  }, []);
  const handleInputBackgroundColor = useCallback((event: FormEvent<HTMLInputElement>) => {
    const { value } = (event.target as HTMLInputElement);
    setBackgroundColor(value);
  }, []);

  const textContainerStyle: React.CSSProperties = {
    backgroundColor
  };
  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    textAlign
  };
  const textStrokeStyle: React.CSSProperties = {
    WebkitTextStrokeWidth: `${textStrokeWidth * 2}px`,
    WebkitTextStrokeColor: textStrokeColor
  };

  const radios = Object
    .values(TextAlign)
    .map((textAlignValue: TextAlign) => {
      const id = `textAlign_${textAlignValue}`;
      return (
        <div>
          <input
            type='radio'
            id={id}
            name='textAlign'
            value={textAlignValue}
            checked={textAlign === textAlignValue}
            onChange={handleInputTextAlign} />
          <label
            htmlFor={id}>
            {textAlignValue}
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
          className={styles.textContainer}
          style={textContainerStyle}>
          <div
            className={styles.textStroke}
            style={{ ...textStyle, ...textStrokeStyle }}>
            {text}
          </div>
          <div
            className={styles.text}
            style={textStyle}>
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
        <input
          type='color'
          className={styles.inputColor}
          value={textStrokeColor}
          onInput={handleInputTextStrokeColor} />
        <input
          type='color'
          className={styles.inputColor}
          value={backgroundColor}
          onInput={handleInputBackgroundColor} />
      </main>
    </div>
  )
}
