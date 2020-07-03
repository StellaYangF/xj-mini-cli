"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable prefer-const */
const betterRequire = exports.betterRequire = absPath => {
  const module = require(absPath);
  if (module.default) {
    return module.default;
  }
  return module;
};