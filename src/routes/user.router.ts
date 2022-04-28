import  {userCRUD} from"../controllers/user.controller";
import express from 'express';
const router = express.Router();

//const { checkToken } = require("../../auth/token_validation");
import twilio from "twilio";
import nodemailer from "nodemailer";

router.get("/", userCRUD.getUsers);
router.post("/create", userCRUD.createUser);
router.post("/login", userCRUD.login);

export default router;