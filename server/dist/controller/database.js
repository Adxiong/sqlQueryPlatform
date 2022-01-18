"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:42:47
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../service/database");
const router = (0, express_1.Router)();
router.get("/list", (req, res, next) => {
    database_1.default.queryDatabases()
        .then(data => {
        res.json(data);
    })
        .catch(next);
});
exports.default = router;
