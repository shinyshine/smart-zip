const compressing = require('compressing')
const path = require('path');
const chalk = require('chalk')


function unZipFile(srcPath, options) {

  const { dest, deleteOriginal } = options;
  const srcComponents = srcPath.split('.');

  let destBase = srcComponents.length > 1 ? srcComponents[0] : srcPath
  let destDir = '.' // 默认输出路径

  if(dest) {
    destBase = path.basename(dest) || destBase;
    destDir = path.dirname(dest)
  }
  const destPath = `${destDir}/${destBase}`;

  compressing.gzip.uncompress(srcPath, destPath)
    .then(() => {
      console.log(chalk.green('文件解压成功'))
    })
}


function  unZipDir(srcPath, options) {
  const { dest, deleteOriginal } = options;
  const srcComponents = srcPath.split('.');

  let destBase = srcComponents.length > 1 ? srcComponents[0] : srcPath
  let destDir = '.' // 默认输出路径

  if(dest) {
    destBase = path.basename(dest) || destBase;
    destDir = path.dirname(dest)
  }
  const destPath = `${destDir}/${destBase}`;

  compressing.tgz.uncompress(srcPath, destPath)
    .then(() => {
      console.log(chalk.green('文件夹解压成功'))
    })
}

exports.unZipFile = unZipFile;
exports.unZipDir = unZipDir;