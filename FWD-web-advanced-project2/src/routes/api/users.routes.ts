import { Router} from 'express';
import * as controllers from '../../controller/users.controller';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

//api/users
routes.route('/').get(authenticationMiddleware, controllers.getMany).post (controllers.create);
routes
.route('/:id')
.get(controllers.getOne)
.patch(controllers.updateOne)
.delete(controllers.deleteOne);

//authentication
routes.route('/authenticate').post(controllers.authenticate);

export default routes;