import {memo, useState} from 'react';
import useAudio from "../../hooks/useAudio";
import {AudioType, PlayStateEnum, SampleType} from "../../types";
import {getNextPlayState, getPadBgClass} from "./helpers";

interface PadProps {
  value: SampleType;
  onClick: ({
    id,
    sampleState,
    audio,
  }: {
    id: SampleType['id'];
    sampleState: PlayStateEnum;
    audio: AudioType;
  }) => void;
  isInCue: boolean;
}

const Pad = ({value, onClick, isInCue}: PadProps) => {
  const {id, label, src} = value;
  const audio = useAudio(src);
  const [playState, setPlayState] = useState<PlayStateEnum>(PlayStateEnum.off)
  const padBgClass = getPadBgClass(playState, isInCue);

  const handleClick = () => {
    const newPlayState = getNextPlayState(playState);
    setPlayState(newPlayState);
    if (newPlayState === PlayStateEnum.off) {
      audio.stop();
    }
    onClick({id, sampleState: newPlayState, audio});
  }

  return (
    <div className="c-pad">
      <button
        type="button"
        className={`c-pad__btn ${padBgClass}`}
        onClick={handleClick}
      >
        <span className="c-pad__btn-text">{label}</span>
        {isInCue && (
          <span className="c-pad__btn-additional-text">In Cue</span>
        )}
      </button>
    </div>
  );
};

export default memo(Pad);
