import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import session from 'express-session';
import expressValidator from 'express-validator';

export const microConnectLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        console.log(path.join(__dirname, '../../', 'views'));
        const expressEjsLayout = require('express-ejs-layouts');
        const passport = require('passport');
        const flash = require('express-flash');
        const expressApp = settings.getData('express_app');
        expressApp
            // view engine setup
            .set('views', path.join(__dirname, '../../', 'views'))
            .set('view engine', 'ejs')
            .use(expressEjsLayout)
            .set('layout', 'pages/layouts/common')
            .use(session({
                resave: true,
                saveUninitialized: true,
                secret: '$$secret*&*((',
            }))
            .use(passport.initialize())
            .use(passport.session())
            .use(expressValidator())
            .use((req, res, next) => {
                res.locals.user = req.user;
                next();
            })
            .use(flash());
    }
};
