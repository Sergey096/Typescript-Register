"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
exports.default = {
    create: (data, callBack) => {
        console.log(typeof data.phone);
        database_1.default.query(`insert into user2(firstname, lastname, email, password, phone) 
                  values('${data.firstname}','${data.lastname}','${data.email}','${data.password}',${data.phone})`, (error, results) => {
            callBack(error, results);
        });
    },
    getUserByUserEmail: (email, callBack) => {
        database_1.default.query(`select * from user2 where email = ?`, [email], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: (callBack) => {
        database_1.default.query(`select id,firstName,lastName,email from user2`, (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
};
