const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('../api/routes');


const modules = (app) => {
    app.use(cors({origin: '*'}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(process.cwd() + '/src/public'));
    // app.use(fileUpload());
    // app.use(express.static(`${process.cwd()}/uploads`));
    app.use('/api', router);

    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
}

module.exports = modules;