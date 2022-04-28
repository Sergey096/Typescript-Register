import dotenv from "dotenv";
const config = dotenv.config();
import app from "./App/app";

import bodyParser from 'body-parser';


const PORT = process.env.APP_PORT;

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`Server is running at https://localhost:${PORT}`);
        });
    }catch(e: any){
        console.log(e.message);
        
    }
}

start()
