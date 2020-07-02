const axios = require('axios');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
let downloadGitRepo = require('download-git-repo');
let { render } = require('ejs');
let MetalSmith = require('metalsmith');
let { downloadDirectory } = require('./constants');
let ncp = require('ncp');
const cons = require('consolidate');

downloadGitRepo = promisify(downloadGitRepo);
render = promisify(render);
ncp = promisify(ncp);

const fetchRepoList = async () => {
  const { data } = await axios('https://api.github.com/orgs/xj-cli/repos');
  console.log(data);
  return data;
};

const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

const fetchTagList = async (repo) => {
  const { data } = await axios(`https://api.github.com/repos/xj-cli/${repo}/tags`);
  return data;
};

const download = async (repo, tag) => {
  let api = `xj-cli/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${downloadGitRepo}/${repo}`;
  await downloadGitRepo(api, dest);
  return dest;
};

module.exports = async (projectName) => {
  let repos = waitFnLoading(fetchRepoList, 'fetching template...')();
  repos = repos.map((item) => item.name);
  console.log(repos);
  const { repo } = await inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choose a template to creat project',
    choices: repos,
  });

  let tags = waitFnLoading(fetchTagList, 'fetching tags...')(repo);
  tags = tags.map((item) => item.name);
  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'please choose a tag to create project',
    choices: tags,
  });

  const result = await waitFnLoading(download, 'downloading template')(repo, tag);

  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    await ncp(result, path.resolve(projectName));
  } else {
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname)
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(result, 'ask.js'));
          const obj = await inquirer.prompt(args);
          const meta = metal.metadata();
          Object.assign(meta, obj);
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          const obj = metal.metadata;
          Reflect.ownKeys(files).forEach(async (file) => {
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString();
              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from('content');
              }
            }
          });
          done();
        })
        .build((err) => {
          if (err) {
            console.log(err);
            reject();
          } else {
            result();
          }
        })
    })
  }
};