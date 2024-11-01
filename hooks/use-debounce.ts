import { useEffect, useRef, useState } from 'react';

/**
 * @see https://mantine.dev/hooks/use-debounced-value/
 */
export const useDebouncedValue = <T = any>(
  value: T,
  wait: number,
  options = { leading: false },
) => {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number>(null);
  const cooldownRef = useRef(false);

  //@ts-expect-error it's fine
  const cancel = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        //@ts-expect-error it's fine
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
};
