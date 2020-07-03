import program from 'commander';
import { VERSION } from './constants';
import actionMap from './actionMap';
import main from './index';

Object.entries(actionMap)
  .forEach(([actionName, { alias, description }]) => {
    program
      .command(actionName)
      .description(description)
      .alias(alias)
      .action(() => {
        if (actionName === 'config' || actionName === 'install') {
          console.log(actionName, 'actionName');
          main(actionName, process.argv.slice(3));
        // eslint-disable-next-line no-empty
        } else if (actionName === 'install') {}
        // main();
      });
  });

function help() {
  // eslint-disable-next-line no-useless-concat
  console.log('\r\n   ' + 'how to use command');
  Object.entries(actionMap)
    .forEach(([, { examples }]) => {
      examples.forEach((example) => {
        // eslint-disable-next-line prefer-template
        console.log('    - ' + example);
      });
    });
}

program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-v --version').parse(process.argv);
