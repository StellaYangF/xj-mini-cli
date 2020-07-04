'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _git = require('./utils/git');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let install = async () => {
  let loading = (0, _ora2.default)('fetching a template...');
  loading.start();
  let list = await (0, _git.repoList)();
  loading.succeed();
  list = list.map(({ name }) => name);
  let answer = await _inquirer2.default.prompt([{
    type: 'list',
    name: 'project',
    choices: list,
    questions: 'please choose a template'
  }]);
  let project = answer.project;
  loading = (0, _ora2.default)('fetching tag...');
  loading.start();
  list = await (0, _git.tagList)(project);
  loading.succeed();
  list = list.map(({ name }) => name);
  answer = await _inquirer2.default.prompt([{
    type: 'list',
    name: 'tag',
    choices: list,
    questions: 'please choose a tag'
  }]);
  let tag = answer.tag;
  loading = (0, _ora2.default)('download project...');
  loading.start();
  await (0, _git.downloadLocal)(project, tag);
  loading.succeed();
};

exports.default = install;