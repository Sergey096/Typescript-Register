import express, {Request, Response} from "express"; 
import userRouter from "../routes/user.router";


const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/users", userRouter);




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


export default app;