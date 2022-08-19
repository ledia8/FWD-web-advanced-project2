import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/Orders.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const orderModel = new OrderModel();

export const create = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const order = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data:{...order},
            message:'order created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getMany = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const orders = await orderModel.getMany();
        res.json({
            status:'success',
            data : orders,
            message: 'order retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.getOne(req.params.id as string);
        res.json({
            status:'success',
            data : order,
            message: 'order retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.updateOne(req.body);
        res.json({
            status:'success',
            data : order,
            message: 'order Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order = await orderModel.getOne(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : order,
            message: 'order deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


