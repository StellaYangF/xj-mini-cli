const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'xj-mini-cli create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'xj-mini-cli config set <k> <v>',
      'xj-mini-cli config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};
module.exports = mapActions;
