import React from 'react';

function InputCell({ id, addValue, value }) {
  const handleInputChange = event => {
    addValue(id, event.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleInputChange}
      value={value}
    />
  );
}

export default InputCell;
