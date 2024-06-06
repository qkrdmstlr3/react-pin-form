import { useEffect } from 'react';

export function useTest() {
  useEffect(() => console.log('log'), []);
}
