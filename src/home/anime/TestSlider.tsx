import React, { useState } from 'react';

const TestSlider = () => {
  const [volume, setVolume] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setVolume(newValue);
  };

  return (
    <div>
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="any"
        value={volume}
        onChange={handleChange}
      />
      <p>Volume: {volume}</p>
    </div>
  );
}

export default TestSlider;
