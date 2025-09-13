import { useState, useEffect } from 'react';

// Custom hook for localStorage with performance optimization
export function useLocalStorage(key, initialValue) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Performance optimization: debounce localStorage writes
export function useDebounceLocalStorage(key, initialValue, delay = 500) {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
  const [tempValue, setTempValue] = useState(storedValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (tempValue !== storedValue) {
        setStoredValue(tempValue);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [tempValue, delay, storedValue, setStoredValue]);

  return [tempValue, setTempValue];
}
