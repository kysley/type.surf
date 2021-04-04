import {useEffect} from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {useTimer} from 'use-timer';

import {useCreateResultMutation, useWordsetMutation} from '../graphql/gen';
import {
  ModeState,
  OrbitState,
  ResultSnapshot,
  testTypingState,
  TimeEslapsedState,
} from '../state';

export function useLocalGame() {
  const modeState = useRecoilValue(ModeState);
  const orbitState = useRecoilValue(OrbitState);
  const setTimeEslapsedState = useSetRecoilState(TimeEslapsedState);
  const [typingState, setTypingState] = useRecoilState(testTypingState);
  const [{data}, mutate] = useCreateResultMutation();
  const [{data: wordsetData}] = useWordsetMutation();

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

  const maybeSendResult = useRecoilCallback(
    ({snapshot}) => async () => {
      const snap = await snapshot.getPromise(ResultSnapshot);
      // do something here to validate if we should send it
      await mutate({
        input: {
          ...snap,
          seed: wordsetData?.Wordset?.seed || 'UNKNOWN',
        },
      });
      // socket.emit('client.stats', {stats});
      // return stats;
    },
    [mutate, wordsetData?.Wordset?.seed],
  );

  useEffect(() => {
    if (typingState === 'DONE') {
      pause();
      maybeSendResult();
    } else if (typingState === 'WAITING') {
      resetTimer();
    } else if (typingState === 'STARTED') {
      startTimer();
    }
  }, [typingState, pause, resetTimer, startTimer, maybeSendResult]);
}
