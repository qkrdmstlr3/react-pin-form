import { useState } from 'react';
import { ClipboardEvent, KeyboardEvent, useRef } from 'react';
import { ensureStringLength } from '../utils/ensureStringLength';
import { createEmptyString } from '../utils/createEmptyString';
import { EMPTY_CHAR } from '../constants';
import { validateText } from '../utils/validateString';

type Validate = RegExp | ((char: string) => boolean);

interface Props {
  /**
   * @description pin length
   */
  length: number;
  /**
   * @description initial pin value. shorter than length prop.
   */
  initialValue?: string;
  /**
   * @description validate pin char
   */
  validate?: Validate;
  /**
   * @description input autoFocus
   * @default false
   */
  autoFocus?: boolean;
}

type Event = { type: 'input'; value: string; index: number } | { type: 'delete'; index: number } | { type: 'clearAll' };

const SINGLE_CHAR_REGEX = /^.$/;

export function usePinForm({ length, initialValue, autoFocus = false, validate = SINGLE_CHAR_REGEX }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(ensureStringLength(initialValue ?? createEmptyString(length), length));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const isFinished = focusedIndex >= length;

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Backspace': {
        setValue(getNextValue(value, [{ type: 'delete', index: focusedIndex - 1 }]));

        const nextFocusedIndex = Math.max(0, focusedIndex - 1);
        setFocusedIndex(nextFocusedIndex);
        break;
      }
      default: {
        if (isFinished) {
          return;
        }

        const valid = validateText(validate, event.key);
        if (valid === false) {
          return;
        }

        const nextFocusedIndex = focusedIndex + 1;
        setFocusedIndex(nextFocusedIndex);
        setValue(getNextValue(value, [{ type: 'input', value: event.key, index: focusedIndex }]));
      }
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    if (isFinished) {
      return;
    }
    const pastedText = [...event.clipboardData.getData('text')];
    const events = pastedText.map<Event>((value, index) => ({ type: 'input', index: focusedIndex + index, value }));
    const nextValue = getNextValue(value, events);
    setValue(nextValue);

    const nextFocusedIndex = Math.min(length, focusedIndex + events.length);
    setFocusedIndex(nextFocusedIndex);
  };

  const onBoxFocus = (index: number) => {
    inputRef.current.focus();
    setFocusedIndex(index);
    setValue(getNextValue(value, [{ type: 'delete', index }]));
  };

  const onClearAll = () => {
    setFocusedIndex(0);
    setValue(getNextValue(value, [{ type: 'clearAll' }]));
  };

  return {
    value,
    focusedIndex,
    onBoxFocus,
    onClearAll,
    inputRef: inputRef,
    inputProps: { autoFocus, onKeyUp, onPaste },
  };
}

function getNextValue(value: string, events: Event[]): string {
  const values = [...value];

  events.forEach(event => {
    switch (event.type) {
      case 'clearAll': {
        values.forEach((_, index) => (values[index] = EMPTY_CHAR));
        break;
      }
      case 'input': {
        values[event.index] = event.value;
        break;
      }
      case 'delete': {
        values[event.index] = EMPTY_CHAR;
        break;
      }
    }
  });

  return ensureStringLength(values.join(''), value.length);
}
