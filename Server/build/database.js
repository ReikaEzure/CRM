"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const constants_1 = __importDefault(require("./constants"));
const pool = promise_mysql_1.default.createPool(constants_1.default.database);
pool.then((r) => r.getConnection().then((connection) => {
    r.releaseConnection(connection);
    console.log('Database connected');
}));
exports.default = pool;
