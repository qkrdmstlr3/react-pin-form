import React, { CSSProperties } from 'react';
import { usePinForm } from '../index';

export default {
  title: 'Example',
};

export const Exp = () => {
  const { value } = usePinForm({ length: 6 });

  return (
    <div style={containerStyle}>
      <input style={inputStyle} />
      {[...value].map((v, i) => (
        <div key={i} aria-hidden style={{ backgroundColor: 'white', ...boxStyle }}>
          {v}
        </div>
      ))}
    </div>
  );
};

const containerStyle: CSSProperties = {
  display: 'flex',
  gap: '15px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const inputStyle: CSSProperties = {
  position: 'absolute',
  top: -9999,
  left: -9999,
  visibility: 'hidden',
  opacity: 0,
};

const boxStyle: CSSProperties = {
  width: '45px',
  height: '60px',
  borderRadius: '5px',
  border: '1px solid black',
};
