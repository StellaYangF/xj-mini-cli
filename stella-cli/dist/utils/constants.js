"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const HOME = process.env[process.platform === 'win32' ? "USERPROFILE" : "HOME"];

const RC = exports.RC = `${HOME}/.stellaclirc`;
const DEFAULTS = exports.DEFAULTS = {
    registry: 'xj-cli',
    type: 'orgs'
};
const DOWNLOAD = exports.DOWNLOAD = `${HOME}/.template`;