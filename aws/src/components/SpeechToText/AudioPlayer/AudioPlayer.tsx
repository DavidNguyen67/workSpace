'use client';
import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioBuffer: ArrayBuffer | null;
}

function AudioPlayer({ audioBuffer }: AudioPlayerProps) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioBuffer) return;
    const playAudioFromBuffer = () => {
      // Convert ArrayBuffer to Blob
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });

      // Create an <audio> element
      const audio = audioRef.current;

      // Set the src attribute of the <audio> element to the Blob URL
      audio.src = URL.createObjectURL(blob);

      // Autoplay the audio
      audio.play();
    };

    if (audioBuffer) {
      playAudioFromBuffer();
    }

    return () => {
      // Cleanup function
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audioBuffer]);

  return (
    <audio
      ref={audioRef}
      controls
    />
  );
}

export default AudioPlayer;
