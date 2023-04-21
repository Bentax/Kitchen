import React, { useState } from 'react';

const SoundButton = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <button onClick={playSound} disabled={isPlaying}>
      {isPlaying ? 'Playing...' : 'Play sound'}
    </button>
  );
};

const App = () => {
  const soundList = [
    'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg',
    'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
    'https://actions.google.com/sounds/v1/alarms/beep_long.ogg',
    'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
    'https://actions.google.com/sounds/v1/cartoon/boing.ogg',
    'https://actions.google.com/sounds/v1/cartoon/wooden_hit.ogg',
    'https://actions.google.com/sounds/v1/impacts/sharp_hit.ogg',
    'https://actions.google.com/sounds/v1/impacts/medium_impact_1.ogg',
    'https://actions.google.com/sounds/v1/impacts/medium_impact_2.ogg',
    'https://actions.google.com/sounds/v1/impacts/hit_laser_1.ogg'
  ];

  return (
    <div>
      {soundList.map((sound, index) => (
        <SoundButton key={index} sound={sound} />
      ))}
    </div>
  );
};

export default App;
