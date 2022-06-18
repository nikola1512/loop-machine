import Pads from "./Pads";
import Pad from "./Pad";
import usePlayer from "../hooks/usePlayer";
import {PlayStateEnum, SampleType} from "../types";

interface PlayerProps {
  samples: SampleType[];
}

const Player = ({samples}: PlayerProps) => {
  const {
    isPlaying,
    togglePlayer,
    activeSamples,
    updateSamples,
  } = usePlayer();

  const isPlayerBtnEnabled = activeSamples.length > 0;

  return (
    <div className="c-player">
      <h1 className="c-player__title">Loop Machine</h1>
      <div className="c-player__btn-wrapper">
        <button
          className="c-player-btn"
          type="button"
          onClick={togglePlayer}
          disabled={!isPlayerBtnEnabled}
          title={isPlayerBtnEnabled ? '' : 'Click on sam Pad to be able to play'}
        >
          <span>{isPlaying ? '⏹ Stop' : '▶️ Play'}</span>
        </button>
      </div>

      <Pads>
        {samples.map(sample => {
          const isInCue =
            activeSamples.find((activeSample => activeSample.id === sample.id))?.sampleState === PlayStateEnum.inCue;
          return (
            <Pad
              isInCue={isInCue}
              key={sample.id}
              value={sample}
              onClick={updateSamples}
            />
          )
        })}
      </Pads>
    </div>
  );
};

export default Player;
