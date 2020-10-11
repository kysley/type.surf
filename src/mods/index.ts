import perfectionistPkg from './perfectionist';
import noBackspacePkg from './noBackspace';

export const modDict: Record<string, Mod> = {
  [perfectionistPkg.key]: perfectionistPkg,
  [noBackspacePkg.key]: noBackspacePkg,
};
