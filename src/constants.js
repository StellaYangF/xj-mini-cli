const { version } = require('../package.json');

const baseDir = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'];
const downloadDirectory = `${baseDir}\\.template`;

module.exports = {
  version,
  downloadDirectory,
};
