const gzipper = require('../index');

gzipper.zip('../node_modules', {
  dest: '../node_modules.tar.gz'
})

gzipper.zip('../node_modules', {
  dest: '../node_modules2'
})
gzipper.zip('../node_modules')

gzipper.unZip('../node_modules2.tar.gz', {
  dest: '../node22'
})



