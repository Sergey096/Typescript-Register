"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tset',
    password: 'password'
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
exports.default = connection;
