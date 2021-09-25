/*
 * API
 * version 1
 * Copyright (c) 2021
 * Author <>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { homeLoader } from './loaders/homeLoader';
import { iocLoader } from './loaders/iocLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { publicLoader } from './loaders/publicLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';
import { microConnectLoader } from './loaders/microConnectLoader';
// import redis from 'redis';
// const clientISF0 = redis.createClient({host: process.env.REDIS_HOST_ISF0, port: process.env.REDIS_PORT_ISF0});
// const clientISM0 = redis.createClient({host: process.env.REDIS_HOST_ISM0, port: process.env.REDIS_PORT_ISM0});

const log = new Logger(__filename);

// const checkUserExists = async (gender: any, hashKey: any, layerKey: any): Promise<any> => {
//     let connection = clientISF0;
//     if (parseInt(gender, 10) === 1) {
//         connection = clientISM0;
//     }
// return new Promise<any>((resolve) => {
//     try {
//         connection.hexists(hashKey, layerKey, (error: any, result: any) => {
//             if (error) {
//                 console.log(error);
//                 resolve(false);
//             } else {
//                 resolve(result);
//                 return(result);
//             }
//         });
//     } catch (err) {
//         console.log(err);
//         resolve(false);
//     }
// }).catch( () => { console.log('promise checkUserExists reject'); } );
// };

bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader,
        iocLoader,
        eventDispatchLoader,
        typeormLoader,
        expressLoader,
        monitorLoader,
        homeLoader,
        publicLoader,
        microConnectLoader,
       ],
})
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error));
