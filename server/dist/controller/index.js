"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 23:39:03
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:39:04
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("./database");
const router = (0, express_1.Router)();
router.use('/database', database_1.default);
exports.default = router;
