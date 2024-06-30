type Validate = RegExp | ((char: string) => boolean);

export function validateString(validate: Validate, text: string) {
  if (validate instanceof RegExp) {
    return validate.test(text);
  }
  if (typeof validate === 'function') {
    return validate(text);
  }
  return false;
}
