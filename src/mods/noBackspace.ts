const exec = () => false;

const noBackspacePkg: Mod = {
  key: 'noBackspace',
  hook: 'Backspace',
  exec,
  condition: true,
};

export default noBackspacePkg;
