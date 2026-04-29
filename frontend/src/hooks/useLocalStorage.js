import { useState, useEffect } from 'react';
import { getLocalItem, setLocalItem } from '../utils/storage';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getLocalItem(key, initialValue);
  });

  useEffect(() => {
    setLocalItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
