var requireDir = require('require-dir');
requireDir('./gulp/prodtasks', { recurse: true });
requireDir('./gulp/exampletasks', { recurse: true });