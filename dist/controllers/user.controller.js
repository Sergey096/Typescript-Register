"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCRUD = void 0;
const user_service_1 = __importDefault(require("../service/user.service"));
//import create from "../service/user.service"
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = require("bcryptjs");
const bcryptjs_3 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.userCRUD = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = (0, bcryptjs_2.genSaltSync)(10);
        body.password = (0, bcryptjs_1.hashSync)(body.password, salt);
        user_service_1.default.create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            const random = Math.floor(Math.random() * 1000);
            let transporter = nodemailer_1.default.createTransport({
                host: 'smtp.mail.ru',
                auth: {
                    user: "sergehakobyan9596@mail.ru",
                    pass: "Z4Jr41p4P2UW55CVcCeD"
                }
            });
            let mailOptions = {
                from: 'sergehakobyan9596@mail.ru',
                to: `${req.body.email}`,
                subject: 'My first Email!!!',
                text: random.toString() + " " + "This is verification code"
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(info);
                }
            });
            const accountSid = "ACa252bb5445b6bd16a11b0bab28676974";
            const authToken = "e129305a256b91195597d4cd1749f4bb";
            const client = require('twilio')(accountSid, authToken);
            client.messages
                .create({
                body: random.toString() + " " + 'Your code',
                from: '+13868887307',
                to: `${req.body.phone}`
            })
                .then((message) => console.log(message.sid));
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        user_service_1.default.getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = (0, bcryptjs_3.compareSync)(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = (0, jsonwebtoken_1.sign)({ result: results }, "123", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    getUsers: (req, res) => {
        user_service_1.default.getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
};
