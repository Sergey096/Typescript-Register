import express, {Request, Response} from "express"; 
import userService from "../service/user.service";
//import create from "../service/user.service"

  import {hashSync} from "bcryptjs";
  import {genSaltSync} from"bcryptjs";
  import {compareSync} from "bcryptjs";
  import {sign} from "jsonwebtoken";
  import nodemailer from "nodemailer";

  
  export const userCRUD = {
    createUser: (req: Request, res: Response) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      userService.create(body, (err: any, results: any) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
  
        const random = Math.floor(Math.random() * 1000);
  
        let transporter = nodemailer.createTransport({
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
        
        transporter.sendMail(mailOptions, function(err: any, info: any) {
          if (err) {
            console.log(err)
          } else {
            console.log(info);
          }
  
        })
  
        const accountSid = "ACa252bb5445b6bd16a11b0bab28676974";
        const authToken = "e129305a256b91195597d4cd1749f4bb";
        const client = require('twilio')(accountSid, authToken);
  
        client.messages
          .create({
             body: random.toString() + " " + 'Your code',
             from: '+13868887307',
             to:   `${req.body.phone}`
           })
          .then((message: any) => console.log(message.sid));
        
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    login: (req: Request, res: Response) => {
      const body = req.body;
      userService.getUserByUserEmail(body.email, (err: any, results: any) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "123", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
    getUsers: (req: Request, res:Response) => {
      userService.getUsers((err: any, results: any) => {
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


