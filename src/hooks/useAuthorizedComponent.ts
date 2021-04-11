import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {ModalState} from '../state';
import {useMe} from './api/useMe';

export function useAuthorizedComponent(
  condition: boolean | string = true,
  target = 'registration',
) {
  const {user, fetching} = useMe();
  const open = useSetRecoilState(ModalState);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (!fetching) {
      if (typeof condition === 'boolean') {
        if (user?.mock) {
          // open modal here
          open(target);
          setLock(true);
        } else {
          setLock(false);
        }
      } else {
        if (user?.role === condition) {
          setLock(false);
        } else {
          open(target);
          setLock(true);
        }
      }
    }
  }, [user, fetching, condition, target, open]);

  return {
    lock,
  };
}
