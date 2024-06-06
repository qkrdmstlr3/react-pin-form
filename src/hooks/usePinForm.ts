import { useState } from 'react';
import type { ClipboardEvent, KeyboardEvent } from 'react';
import { ensureStringLength } from '../utils/ensureStringLength';
import { createEmptyString } from '../utils/createEmptyString';
import { EMPTY_CHAR } from '../constants';

type Validate = RegExp | ((char: string) => boolean);

interface Props {
  length: number;
  initialValue?: string;
  validate?: Validate;
}

type Event = { type: 'input'; value: string; index: number } | { type: 'delete'; index: number } | { type: 'clearAll' };

export function usePinForm({ length, initialValue, validate }: Props) {
  const [value, setValue] = useState(ensureStringLength(initialValue ?? createEmptyString(length), length));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const onKeyup = (event: KeyboardEvent<HTMLInputElement>) => {
    setValue(getNextValue(value, []));
    setFocusedIndex(prevIndex => prevIndex + 1);
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    setValue(getNextValue(value, []));
    setFocusedIndex(prevIndex => prevIndex + 1);
  };

  const onFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const onClearAll = () => {
    setValue(getNextValue(value, [{ type: 'clearAll' }]));
  };

  return { value, focusedIndex, onFocus, onKeyup, onPaste, onClearAll };
}

function getNextValue(value: string, events: Event[]): string {
  const values = [...value];

  events.forEach(event => {
    switch (event.type) {
      case 'clearAll': {
        values.forEach((_, index) => (values[index] = EMPTY_CHAR));
      }
    }
  });

  return ensureStringLength(values.join(''), value.length);
}
