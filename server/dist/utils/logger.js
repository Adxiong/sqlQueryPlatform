"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 21:31:44
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 22:02:57
 */
const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders: {
        console: {
            type: "console"
        },
        file: {
            type: 'dateFile',
            filename: path.resolve(__dirname, '../../logs/sqlQueryPlatform.log'),
            alwaysIncludePattern: true,
            daysToKeep: 5
        }
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: 'info'
        }
    },
    pm2: true
});
const logger = log4js.getLogger();
exports.default = logger;
