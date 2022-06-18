import {PlayStateEnum} from "../../types";

export const getPadBgClass = (playState: PlayStateEnum, isInCue: boolean) => {
  if (isInCue) return 'is-in-cue';
  if (playState === PlayStateEnum.off) return 'is-off';
  if (playState === PlayStateEnum.on) return 'is-on';
  return '';
}

export const getNextPlayState = (playState: PlayStateEnum) => {
  return (playState >= 1 ? 0 : playState + 1) as PlayStateEnum;
}
