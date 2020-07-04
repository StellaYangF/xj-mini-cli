import { repoList, tagList, downloadLocal, } from './utils/git';
import ora from 'ora';
import inquirer from 'inquirer';

let install = async () => {
  let loading = ora('fetching a template...');
  loading.start()
  let list = await repoList();
  loading.succeed();
  list = list.map(({ name }) => name);
  let answer = await inquirer.prompt([{
    type: 'list',
    name: 'project',
    choices: list,
    questions: 'please choose a template'
  }]);
  let project = answer.project;
  loading = ora('fetching tag...');
  loading.start();
  list = await tagList(project);
  loading.succeed();
  list = list.map(({ name }) => name);
  answer = await inquirer.prompt([{
    type: 'list',
    name: 'tag',
    choices: list,
    questions: 'please choose a tag'
  }]);
  let tag = answer.tag;
  loading = ora('download project...');
  loading.start();
  await downloadLocal(project, tag);
  loading.succeed();
}

export default install;