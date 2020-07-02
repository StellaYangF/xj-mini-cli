const program = require('commander');
const path = require('path');
const { version, downloadDirectory } = require('./constants');
const mapActions = require('./mapActions');
const cons = require('consolidate');

Object.entries(mapActions).forEach(([actionName, { alias, description }]) => {
  program
    .command(actionName)
    .alias(alias)
    .description(description)
    .action(() => {
      if (actionName === '*') {
        console.log(description);
      } else {
        require(path.resolve(__dirname, actionName))(...process.argv.slice(3))
      }
    });
});

program.on('--help', () => {
  console.log('\r\nExamples:');
  Object.entries(mapActions).forEach(([, { examples }]) => {
    examples.forEach((example) => console.log(`           ${example}`));
  });
});

program.version(version).parse(process.argv);
