import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePinForm } from '../../index';
import { CSSProperties } from 'react';

const LENGTH = 6;

export function Example() {
  const { value, inputRef, focusedIndex, inputProps, onBoxFocus } = usePinForm({ length: LENGTH, autoFocus: true });

  useEffect(() => {
    const isCompleted = [...value].every(v => v !== ' ');
    if (isCompleted) {
      window.alert('Congratulation! 🥳');
    }
  }, [value]);

  return (
    <div style={containerStyle}>
      <input style={inputStyle} ref={inputRef} {...inputProps} />
      {[...value].map((v, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ backgroundColor: 'rgb(255, 255, 255)' }}
          animate={
            focusedIndex === i
              ? {
                  backgroundColor: ['rgb(200, 200, 200)', 'rgb(100, 100, 100)'],
                  border: '1px solid rgb(100, 100, 100)',
                  transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.8 },
                }
              : v === ' '
                ? { backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(0, 0, 0)' }
                : { backgroundColor: 'rgb(0, 0, 0)', border: '1px solid rgb(0, 0, 0)' }
          }
          style={boxStyle}
          onClick={() => onBoxFocus(i)}
        >
          {v}
        </motion.div>
      ))}
    </div>
  );
}

const containerStyle: CSSProperties = {
  display: 'flex',
  gap: '15px',
  width: '100%',
  justifyContent: 'center',
};

const inputStyle: CSSProperties = {
  position: 'absolute',
  top: -9999,
  left: -9999,
  opacity: 0,
};

const boxStyle: CSSProperties = {
  width: '70px',
  height: '90px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '40px',
  fontWeight: 600,
  backgroundColor: 'black',
};
