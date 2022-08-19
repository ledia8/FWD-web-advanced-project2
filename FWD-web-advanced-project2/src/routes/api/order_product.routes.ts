import { Router} from 'express';
import * as controllers from '../../controller/order_product.controller';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

//api/order_product
routes.route('/order_product').get(authenticationMiddleware, controllers.getMany).post (controllers.create);
routes
.route('/:id')
.get(controllers.getOne)
.patch(controllers.updateOne)
.delete(controllers.deleteOne);



export default routes;