const compressing = require('compressing')
const path = require('path');
const logFileSizeAfterZip = require('./util').logFileSizeAfterZip;

function getDestBasename(dest, srcBase) {
  const basename = path.basename(dest);
  if(!basename || basename === '.' || basename === '..') {
    return srcBase
  }
  const components = basename.split('.')
  if(components.includes('tar') && components.includes('gz')) {
    return components[0]
  }
  return basename
}

function zipFile(srcPath, options) {
  const { dest, deleteOriginal } = options;

  const srcBase = path.basename(srcPath);
  let destBase = `${srcBase}.tar.gz` //默认输出文件名
  let destDir = '.' // 默认输出路径

  if(dest) {
    destBase = path.basename(dest);
    destDir = path.dirname(dest)
  }
  const destPath = `${destDir}/${destBase}`;

  compressing.gzip.compressFile(srcPath, destPath)
    .then(() => {
      logFileSizeAfterZip(destPath)
    })
}

function zipDir(srcPath, options) {
  // dest
  // . ./
  // .. ../
  // ../book
  // ../book.tar.gz

  const { dest = '', deleteOriginal } = options;
  const srcBase = path.basename(srcPath);
  let destBase = getDestBasename(dest, srcBase)
  destBase = `${destBase}.tar.gz` //默认输出文件名
  const destDir = path.dirname(dest)

  const destPath = `${destDir}/${destBase}`;

  compressing.tgz.compressDir(srcPath, destPath)
    .then(() => {
      logFileSizeAfterZip(destPath)
    })
}
exports.zipFile = zipFile
exports.zipDir = zipDir


