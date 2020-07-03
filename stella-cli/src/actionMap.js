const actionMap = {
  install: {
    alias: 'i',
    description: 'install template',
    examples: [
      'stella-cli i',
      'stella-cli install',
    ],
  },
  config: {
    alias: 'c',
    description: 'config .stellaclirc',
    examples: [
      'stella-cli config set <k> <v>',
      'stella-cli config get <k>',
      'stella-cli config remove <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

export default actionMap;
