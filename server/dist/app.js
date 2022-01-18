"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 14:11:57
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:40:29
 */
const express = require("express");
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const controller_1 = require("./controller");
const app = express();
app.use('/api', controller_1.default);
app.listen(config_1.default.port, () => {
    logger_1.default.info(`listen on port ${config_1.default.port};\n click http://localhost:${config_1.default.port} to visit server;`);
});
