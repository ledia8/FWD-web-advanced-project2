import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit  from 'express-rate-limit';
import errorMiddleware from './error.middleware';
import routes from './routes'
import config from './config';



const PORT = config.port || 4000;
//create instance from server
const app: Application = express();

//middleware to parse incoming request
app.use(express.json());

//HTTP request logger middleware
app.use(morgan('common'));

//HTTP security middleware
app.use(helmet());

//apply rate limiting middleware to all requests
app.use(rateLimit({
    windowMs:15*60*60,
    max:100,
    standardHeaders:true,
    legacyHeaders: false,
    message:'too much requests',
}));

//using routes to run my endpoints 
app.use('/', routes);



//add routing for /path
app.get('/', (req: Request, res: Response) => {
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