import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Error from '../interface/error.interface';
import config from '../config';


const handleUnAuthenticateError = (next: NextFunction) => {
    const error:Error = new Error('login Error: Please try again');
    error.status=401;
    next(error);
}

const validateTokenMiddleware =(req: Request, res: Response, next:NextFunction) => {

    try{
        //get authHeader
        const authHeader = req.get('Authorization');
        if(authHeader){
            const bearer = authHeader.split(' ')[0].toLocaleLowerCase();
            const token = authHeader.split(' ')[1];
            if(token && bearer == 'bearer') {
                const decode = jwt.verify(
                    token,
                    config.tokenSecret as unknown as string
                );
                if(decode){
                    next();
                }else{
                    //failed to authenticate user
                    handleUnAuthenticateError(next);
                }
            }else{
                //token type not bearer
                handleUnAuthenticateError(next);
            }
        }else{
            //no token provided
            handleUnAuthenticateError(next);
        }
        //check authHeader validate
        //get value of token
        //check if it bearer token or not
        //verify token --decode based on tokenSecret
        //next()
        //failed to authenticate user
        //token type of beare
        //no token provider
    }catch(error){

        handleUnAuthenticateError(next);
    }
};

export default validateTokenMiddleware;