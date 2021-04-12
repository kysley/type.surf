import {useCallback, useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {ModalState} from '../state';
import {useMe} from './api/useMe';

export function useAuthorizedComponent(
  scope: boolean | string = true,
  target = 'registration',
  {eager} = {eager: false},
) {
  const {user, fetching} = useMe();
  const open = useSetRecoilState(ModalState);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (!fetching && eager) {
      if (typeof scope === 'boolean') {
        if (user?.mock) {
          // open modal here
          open(target);
          setLock(true);
        } else {
          setLock(false);
        }
      } else {
        if (user?.role === scope) {
          setLock(false);
        } else {
          open(target);
          setLock(true);
        }
      }
    }
    return () => {
      if (eager) open(null);
    };
  }, [user, fetching, scope, target, open, eager]);

  const evaluate = useCallback(() => {
    if (!fetching) {
      if (typeof scope === 'boolean') {
        if (user?.mock) {
          // open modal here
          open(target);
          // setLock(true);
          return true;
        } else {
          // setLock(false);
          return false;
        }
      } else {
        if (user?.role === scope) {
          // setLock(false);
          return false;
        } else {
          open(target);
          // setLock(true);
          return true;
        }
      }
    }
  }, [scope, fetching, open, target, user]);

  return {
    lock,
    evaluate,
  };
}
