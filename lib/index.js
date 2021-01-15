
const fs = require('fs')
const doZip = require('./doZip')
const unZip = require('./unZip')


/**
 * 
 * @param {string} srcPath  
 * @param {boolean} options.deleteOriginal true
 * @param {function} options.onSuccess 成功回调
 * @param {function} options.onFail 失败回调
 * @param {string} options.dest 包含目标路径和目标文件名，默认路径为源文件的路径，默认文件名为 {源文件名.tar.gz}
 */
function zipper(srcPath, options = {}) {

  const stas = fs.statSync(srcPath)
  const zipFunc = stas.isDirectory() ? doZip.zipDir : doZip.zipFile;

  zipFunc(srcPath, options)
}

function unZipper(srcPath, options = {}) {
  if(srcPath.indexOf('.tar.gz') !== -1) {
    unZip.unZipDir(srcPath, options)
  } else {
    unZip.unZipFile(srcPath, options)
  }
}

exports.zip = zipper;
exports.unZip = unZipper;

