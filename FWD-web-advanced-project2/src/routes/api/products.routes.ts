import { Router} from 'express';
import * as controllers from '../../controller/product.controller';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

//api/product
routes.route('/product').get(authenticationMiddleware, controllers.getMany).post (controllers.create);
routes
.route('/:id')
.get(controllers.getOne)
.patch(controllers.updateOne)
.delete(controllers.deleteOne);



export default routes;