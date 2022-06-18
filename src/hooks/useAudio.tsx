import {useEffect, useState} from "react";

const useAudio = (source: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  const play = () => {
    audio?.play();
  }

  const pause = () => {
    audio?.pause();
  }

  const stop = () => {
    audio?.pause();
    if (audio) audio.currentTime = 0;
  }

  useEffect(() => {
    const audioObj = new Audio(source);
    setAudio(audioObj);

    return () => {
      if (audioObj) stop();
    }
  }, [source]);

  return {
    play,
    pause,
    stop,
  };
};

export default useAudio;
