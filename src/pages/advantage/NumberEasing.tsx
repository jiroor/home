import React, { useEffect, useState, useRef } from 'react'
import Eases from 'eases'

function useInterval(callback, delay) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function defaultRender(value, decimals) {
  return Number(value).toFixed(decimals);
}

export default function NumberEasing({
  value,
  speed = 500,
  decimals = 0,
  customFunctionRender = undefined,
  ease = 'quintInOut'
}) {
  const [renderValue, renderValueSet] = useState(value);
  const [lastTarget, lastTargetSet] = useState(value);

  const [lastUpdateTime, lastUpdateTimeSet] = useState(new Date().getTime());

  useEffect(() => {
    lastUpdateTimeSet(new Date().getTime() - 16);
    lastTargetSet(renderValue);
  }, [value]);

  useInterval(() => {
    const currentTime = new Date().getTime();
    const absoluteProgress = (currentTime - lastUpdateTime) / speed;

    if (absoluteProgress >= 1) {
      renderValueSet(value);
    } else {
      const easedProgress = Eases[ease](absoluteProgress);
      renderValueSet(lastTarget + (value - lastTarget) * easedProgress);
    }
  }, 16);

  const functionRender = customFunctionRender || defaultRender;

  return React.createElement(React.Fragment, {}, [functionRender(renderValue, decimals)]);
}
