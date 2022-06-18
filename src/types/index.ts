export enum PlayStateEnum {
  off,
  on,
  inCue
}

export type SampleType = {
  id: string;
  label: string;
  src: string
}

export type AudioType = Pick<HTMLAudioElement, 'play' | 'pause'> | {stop: () => void}
