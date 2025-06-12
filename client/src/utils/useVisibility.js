import { useState } from 'react';

export function useVisibility() {
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  return { visibility, toggleVisibility };
}
