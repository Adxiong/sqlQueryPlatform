"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 21:31:24
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:23:29
 */
const _ = require("lodash");
class Util {
    toCamelObj(obj) {
        const result = {};
        for (const key in obj) {
            if (_.isFunction(obj[key]))
                continue;
            result[_.cameLCase(key)] = obj[key];
        }
        return result;
    }
}
exports.default = new Util();
