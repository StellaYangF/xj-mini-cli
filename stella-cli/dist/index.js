'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./utils/common');

var _path = require('path');

const apply = (actionName, ...args) => {
  (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${actionName}`))(...args);
};
// eslint-disable-next-line import/order
exports.default = apply;