import {useEffect} from 'react';

export default function useKeypress(
  key: KeyboardEvent['key'] | KeyboardEvent['key'][],
  action: () => any,
  when = true,
) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      console.log(e.key);
      e.preventDefault();
      e.stopPropagation();
      if (Array.isArray(key)) {
        if (key.includes(e.key)) action();
      } else {
        if (e.key === key) action();
      }
    }
    if (when) window.addEventListener('keydown', onKeyup);
    return () => window.removeEventListener('keydown', onKeyup);
  }, [action, key, when]);
}
