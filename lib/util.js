
const fs = require('fs');
const log = console.log;
const chalk = require('chalk')
const path = require('path')

const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

function bytesToSize(bytes) {
  if (bytes === 0) {
      return '0 Byte';
  }
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '');
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + SIZES[i];
}

function getDestBasename(dest, srcBase) {
  const basename = path.basename(dest);
  if(basename === '.' || basename === '..') {
    return srcBase
  }
  return basename
}


exports.logFileSizeAfterZip = function(destFile) {
  const destStas = fs.statSync(destFile);

  log(chalk.blue(destFile))
  log(chalk.white('压缩后文件大小为'), chalk.green(bytesToSize(destStas.size)))
}
