import {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useTimer} from 'use-timer';
import {
  ModeState,
  OrbitState,
  testTypingState,
  TimeEslapsedState,
} from '../state';

export function useLocalGame() {
  const modeState = useRecoilValue(ModeState);
  const orbitState = useRecoilValue(OrbitState);
  const setTimeEslapsedState = useSetRecoilState(TimeEslapsedState);
  const [typingState, setTypingState] = useRecoilState(testTypingState);

  const {reset: resetTimer, start: startTimer, pause} = useTimer({
    autostart: false,
    initialTime: modeState === 'time' ? orbitState : 0,
    timerType: modeState === 'time' ? 'DECREMENTAL' : 'INCREMENTAL',
    onTimeOver: () => setTypingState('DONE'),
    onTimeUpdate: (time) => {
      const timeToSet = modeState === 'time' ? orbitState - time : time;
      setTimeEslapsedState(timeToSet);
    },
    endTime: modeState === 'time' ? 0 : undefined,
  });

  useEffect(() => {
    if (typingState === 'DONE') {
      pause();
    } else if (typingState === 'WAITING') {
      resetTimer();
    } else if (typingState === 'STARTED') {
      startTimer();
    }
  }, [typingState, pause, resetTimer, startTimer]);
}
