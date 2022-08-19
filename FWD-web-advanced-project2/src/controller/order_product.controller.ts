import { Request, Response, NextFunction } from 'express';
import Order_ProductModel from '../models/order_product.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const order_productModel = new Order_ProductModel();

export const create = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const order_product = await order_productModel.create(req.body);
        res.json({
            status: 'success',
            data:{...order_product},
            message:'order_product created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getMany = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getMany();
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getOne(req.params.id as string);
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.updateOne(req.body);
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const order_product = await order_productModel.getOne(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : order_product,
            message: 'order_product deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


