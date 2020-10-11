import {useRecoilState, useSetRecoilState} from 'recoil';

import {testTypingState} from '../state';

export function useStartTest() {
  const setTypingState = useSetRecoilState(testTypingState);

  const startTest = () => {
    setTypingState('STARTED');
  };

  return {
    startTest,
  };
}
