import {useSetRecoilState} from 'recoil';
import {testTypingState} from '../state';

export function useEndTest() {
  const setTypingState = useSetRecoilState(testTypingState);

  const endTest = () => {
    setTypingState('DONE');
  };

  return {
    endTest,
  };
}
