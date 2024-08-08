import { useMemo, useState } from 'react';

const useToggle = <D, R>(
  defaultValue: D | R | boolean = false,
  reverseValue?: R,
) => {
  const [state, setState] = useState(defaultValue);
  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue || !defaultValue) as D | R;

    const toggle = setState(
      (s) => (s === defaultValue ? reverseValue : defaultValue) || false,
    );
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);
    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
};

export default useToggle;
