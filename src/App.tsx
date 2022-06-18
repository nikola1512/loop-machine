import './App.css';
import {SampleType} from "./types";
import Player from "./components/Player";

const samples: SampleType[] = [
  {id: '1', label: 'Sample 1', src: '/assets/audio-1.mp3'},
  {id: '2', label: 'Sample 2', src: '/assets/audio-2.mp3'},
  {id: '3', label: 'Sample 3', src: '/assets/audio-3.mp3'},
  {id: '4', label: 'Sample 4', src: '/assets/audio-4.mp3'},
  {id: '5', label: 'Sample 5', src: '/assets/audio-5.mp3'},
  {id: '6', label: 'Sample 6', src: '/assets/audio-6.mp3'},
  {id: '7', label: 'Sample 7', src: '/assets/audio-7.mp3'},
  {id: '8', label: 'Sample 8', src: '/assets/audio-8.mp3'},
  {id: '9', label: 'Sample 9', src: '/assets/audio-9.mp3'},
];

// TODO:

// no delays anywhere

// try to lift new audio outside the Pads components

// make more hooks (for player the most important)

// Put everything in css not inline





function App() {
  return (
    <div className="l-page">
      <Player samples={samples} />
    </div>
  );
}

export default App;
