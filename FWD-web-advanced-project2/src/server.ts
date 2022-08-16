import express, { Application, Request, response, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit  from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database'
import { Client } from 'pg';


const PORT = config.port || 4000;
//create instance from server
const app: Application = express();

//middleware to parse incomming request
app.use(express.json());

//HTTP request logger middleware
app.use(morgan('common'));

//HTTP security middleware
app.use(helmet())

//apply rate limiting middleware to all requests
app.use(rateLimit({
    windowMs:15*60*60,
    max:100,
    standardHeaders:true,
    legacyHeaders: false,
    message:'too much requests',
}));
//add routing for /path
app.get('/', (req: Request, res: Response) => {
    throw new Error('error throw');
    res.json({
        message: 'hello world',
    });
});

//app post
app.post('/', (req: Request, res: Response) => {
    res.json({
        message: 'hello world from post',
        data: req.body
    });
});

//test db
db.connect().then((Client) => {
    return Client.query('SELECT NOW()').then((res) => {
        Client.release();
        console.log(res.rows);
    }).catch((err) => {
        Client.release();
        console.log(err.stack);
    });

});
app.use(errorMiddleware);

//error handling 
app.use((_req:Request, res:Response) => {
    res.status(404).json({
        message:'the endpoint is wrong',
})
})


//start express server
app.listen(PORT, () => {
    console.log(`server is starting at port : ${PORT}`);
});

export default app;