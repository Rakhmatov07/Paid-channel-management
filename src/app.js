const app = require('express')();
const run = require('./start/run');
const modules = require('./start/module');

run(app);
modules(app);

