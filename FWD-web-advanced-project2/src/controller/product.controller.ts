import { Request, Response, NextFunction } from 'express';
import ProductsModel from '../models/products.model';
// import config from '../config';
// import jwt from 'jsonwebtoken'

const productsModel = new ProductsModel();

export const create = async(req: Request, res: Response, next:NextFunction) => {
    try{
        //validation here
        const product = await productsModel.create(req.body);
        res.json({
            status: 'success',
            data:{...product},
            message:'product created successfully',
        })

    }
    catch(error){
        next(error);

    }
};

export const getMany = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const products = await productsModel.getMany();
        res.json({
            status:'success',
            data : products,
            message: 'products retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}
export const getOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.getOne(req.params.id as string);
        res.json({
            status:'success',
            data : product,
            message: 'product retrieved successfully',
        });
    } catch(error){
        next(error);
    }
}

export const updateOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.updateOne(req.body);
        res.json({
            status:'success',
            data : product,
            message: 'product Updated successfully',
        });
    } catch(error){
        next(error);
    }
}

export const deleteOne = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const product = await productsModel.getOne(req.params.id as unknown as string);
        res.json({
            status:'success',
            data : product,
            message: 'product deleted successfully',
        });
    } catch(error){
        next(error);
    }
}


