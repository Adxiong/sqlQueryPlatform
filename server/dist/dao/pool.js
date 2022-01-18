"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-18 23:16:47
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:23:53
 */
const mysql = require("mysql");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const util_1 = require("../utils/util");
const pool = mysql.createPool(Object.assign({}, config_1.default.database));
function formatRes(sql, res) {
    if (/^(\s*select)/i.test(sql)) {
        const list = [];
        res.forEach((item) => {
            list.push(util_1.default.toCamelObj(item));
        });
        return list;
    }
    else {
        return res;
    }
}
class PoolUtil {
    query(sql, params) {
        logger_1.default.info('sql query', sql, params);
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    logger_1.default.error('执行sql错误', err.sql);
                    reject(err);
                }
                else {
                    resolve(formatRes(sql, result));
                }
            });
        });
    }
    write(sql, params) {
        logger_1.default.info('sql insert: ', sql, params);
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    logger_1.default.error('执行insert语句错误', err.sql);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    beginTransaction() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    logger_1.default.error('获取数据库连接失败', err);
                    reject(err);
                    return;
                }
                connection.beginTransaction(error => {
                    if (error) {
                        logger_1.default.error('开启事务失败', error);
                        reject(error);
                    }
                    else {
                        resolve(connection);
                    }
                });
            });
        });
    }
    queryInTransaction(connect, sql, params) {
        return new Promise((resolve, reject) => {
            logger_1.default.info('query in transaction', sql, params);
            connect.query(sql, params, (err, results) => {
                if (err) {
                    logger_1.default.error('事务中执行sql失败', err.sql);
                    reject(err);
                }
                else {
                    resolve(formatRes(sql, results));
                }
            });
        });
    }
    writeInTransaction(connect, sql, params) {
        return new Promise((resolve, reject) => {
            logger_1.default.info('insert in transaction', sql, params);
            connect.query(sql, params, (err, result) => {
                if (err) {
                    logger_1.default.error('事务中执行sql失败', err.sql);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    commit(connection) {
        return new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) {
                    logger_1.default.error('提交事务失败', err);
                    reject(err);
                }
                else {
                    connection.release();
                    resolve();
                }
            });
        });
    }
    rollback(connection) {
        connection.rollback(() => {
            connection.release();
        });
    }
}
exports.default = new PoolUtil();
