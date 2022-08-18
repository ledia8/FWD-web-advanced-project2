import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';
import config from '../config';
import jwt from 'jsonwebtoken'

const userModel = new UserModel();

export const create = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data:{...user},
            message:'user created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getMany = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const users = await userModel.getMany();
        res.json({
            status:'success',
            data : users,
            message: 'user retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.getOne(req.params.id as string);
        res.json({
            status:'success',
            data : user,
            message: 'user retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.updateOne(req.body);
        res.json({
            status:'success',
            data : user,
            message: 'user Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const user = await userModel.getOne(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : user,
            message: 'user deleted successfully',
        });
    } catch(error){
        next(error);
    }
}

// authenticate
export const authenticate = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const {email,password} = req.body;
        const user  =await userModel.authenticate(email, password);
        const token = jwt.sign ({user}, config.tokenSecret as unknown as string);
        if(!user){
            return res.status(401).json({
                status:'error',
                message:'the username and password do not match please try again',
            });
        }
        return res.json({
            status:'success',
        data:{...user, token},
        message:'user authenticated successfully',
    })
    } catch(error){
        return next(error);
    }
}

