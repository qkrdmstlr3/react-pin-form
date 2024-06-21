# react-pin-form

- Provided as hook
- Provides only the logic, excluding the UI (Users can customize the UI.).
- Delegates the execution of result to the user.

## Install

```
yarn add react-pin-form
pnpm intall react-pin-form
npm install react-pin-form
```

**peer Dependencies**

```json
{
  "react": "^18",
  "react-dom": "^18"
}
```

## API

| name         | description                                  | type                                | default | required |
| ------------ | -------------------------------------------- | ----------------------------------- | ------- | -------- |
| length       | pin length                                   | number                              |         | \*       |
| initialValue | initial pin value. shorter than length prop. | string                              |         |          |
| validate     | validate pin char                            | RegExp, ((char: string) => boolean) | /^.$/   |          |
| autoFocus    | input autoFocus                              | boolean                             | false   |          |

## How to Use

```jsx
import { usePinForm } from 'react-pin-form';

export function Example() {
  const { value, focusedIndex, inputRef, inputProps, onBoxFocus } = usePinForm({ length: 6, autoFocus: true });

  return (
    <>
      <input ref={inputRef} {...inputProps} style={hiddenStyle} />
      {value.map(() => (
        // you can customize box ui as you want!
        <div key={i} onClick={() => onBoxFocus(i)} />
      )}
    </>
  )
}

const hiddenStyle = {
  position: 'absolute';
  top: -9999;
  left: -9999;
};
```
