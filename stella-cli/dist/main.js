'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./constants');

var _actionMap = require('./actionMap');

var _actionMap2 = _interopRequireDefault(_actionMap);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.entries(_actionMap2.default).forEach(([actionName, { alias, description }]) => {
  _commander2.default.command(actionName).description(description).alias(alias).action(() => {
    if (actionName === 'config' || actionName === 'install') {
      (0, _index2.default)(actionName, process.argv.slice(3));
      // eslint-disable-next-line no-empty
    } else {
      console.log(actionName, 'actionName');
    }
    // main();
  });
});

function help() {
  // eslint-disable-next-line no-useless-concat
  console.log('\r\n   ' + 'how to use command');
  Object.entries(_actionMap2.default).forEach(([, { examples }]) => {
    examples.forEach(example => {
      // eslint-disable-next-line prefer-template
      console.log('    - ' + example);
    });
  });
}

_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-v --version').parse(process.argv);