# react-pin-form

![version](https://img.shields.io/npm/v/react-pin-form)
![dependencies](https://img.shields.io/badge/dependencies-none-success)

- Provided as hook.
- Provides only the logic, excluding the UI (Users can customize the UI.).
- Delegates the execution of result to the user.

https://github.com/qkrdmstlr3/react-pin-form/assets/26402298/2873c0b1-92f8-4762-8d1d-ba51fc5b7803

<sub><a href="https://github.com/qkrdmstlr3/react-pin-form/blob/main/src/stories/code/Example.tsx" target="_blank">Example with framer-motion</a></sub>

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
      {value.map((v, i) => (
        // you can customize box ui as you want!
        <div key={i} onClick={() => onBoxFocus(i)}>{v}</div>
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
