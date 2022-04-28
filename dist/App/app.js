"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../routes/user.router"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/users", user_router_1.default);
// app.get('/ID/:id/Name/:name', (req: Request, res: Response) => {
//   res.send({
//     message: "Hello World!",
//     id: req.params.id,
//     name: req.params.name
//   });
// });
// app.post('/ID/:id/Name/:name', (req: Request, res: Response) => {
//   res.send({
//     data: req.body,
//     params: {
//       id: req.params.id,
//       name: req.params.name
//     }
//   })
// })
exports.default = app;
