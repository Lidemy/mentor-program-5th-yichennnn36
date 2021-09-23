import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return {
    inputValue, setInputValue, handleInputChange
  };
};

export default useInput;