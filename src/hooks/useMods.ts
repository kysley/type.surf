import Recoil from 'recoil';

import {modsFromHook} from '../state';

const {useRecoilValue} = Recoil;

type useModsOpts = {
  hook: Hooks;
};

export function useMods({hook}: useModsOpts) {
  return useRecoilValue(modsFromHook(hook));
}
