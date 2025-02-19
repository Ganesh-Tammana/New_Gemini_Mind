import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Speech() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handlestartListening = () => {
    SpeechRecognition.startListening({continuous : true})
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={ handlestartListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}
