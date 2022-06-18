import {AudioType, PlayStateEnum, SampleType} from "../types";
import {useEffect, useRef, useState} from "react";

const LOOP_TIME = 8000;

type activeSampleType = {
  id: SampleType['id'];
  sampleState: PlayStateEnum;
  audio: AudioType;
}

const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSamples, setActiveSamples] = useState<activeSampleType[]>([]);

  const [loopCounter, setLoopCounter] = useState(0);
  const loopCounterRef = useRef(loopCounter);
  loopCounterRef.current = loopCounter;

  const queRef = useRef<NodeJS.Timeout>();

  const togglePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  const updateSamples = ({id, sampleState, audio}: activeSampleType) => {
    const filteredSamples = activeSamples.filter(sample => sample.id !== id);
    if (sampleState === PlayStateEnum.on) {
      isPlaying
        ? setActiveSamples([...filteredSamples, {id, sampleState: PlayStateEnum.inCue, audio}])
        : setActiveSamples([...filteredSamples, {id, sampleState, audio}])
    }
    if (sampleState === PlayStateEnum.off) setActiveSamples(filteredSamples);
  };

  const stopAllActiveSamples = () => {
    activeSamples.forEach(activeSample => 'stop' in activeSample.audio && activeSample.audio.stop())
  };

  const startAllActiveSamples = () => {
    stopAllActiveSamples();
    activeSamples.forEach(activeSample => 'play' in activeSample.audio && activeSample.audio.play())
  };

  const stopTrack = () => {
    stopAllActiveSamples()
    if (queRef.current) {
      clearTimeout(queRef.current);
    }
  };

  const startTrack = () => {
    setLoopCounter( loopCounterRef.current + 1);
    stopTrack();

    queRef.current = setTimeout(() => {
      startTrack();
    }, LOOP_TIME);
  };

  // Sets "inCue" sample state to "on"
  const normalizeInCueStates = () => {
    const mappedInCueToOnSamples = activeSamples.map(
      activeSample => ({
        ...activeSample,
        sampleState: activeSample.sampleState === PlayStateEnum.inCue
          ? PlayStateEnum.on
          : activeSample.sampleState
      })
    );
    setActiveSamples(mappedInCueToOnSamples);
  };

  useEffect(() => {
    normalizeInCueStates();
    isPlaying ? startTrack() : stopTrack();

    return () => {
      stopTrack();
    }
  }, [isPlaying])

  // Stops player if if there are no activeSamples.
  // For example if we manually turn off all the samples
  // while player is playing
  useEffect(() => {
    if (!(activeSamples.length > 0)) {
      setIsPlaying(false);
    }
  }, [activeSamples])

  // Starts all samples on each loop start
  useEffect(() => {
    normalizeInCueStates();

    loopCounterRef.current = loopCounter;
    if (isPlaying) startAllActiveSamples();
  }, [loopCounter])

  return {
    isPlaying,
    togglePlayer,
    activeSamples,
    updateSamples,
  }
};

export default usePlayer;
