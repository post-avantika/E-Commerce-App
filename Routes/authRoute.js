import { Router as router} from "express";
import * as authController from "../Controllers/authController.js";
import auth from '../Middleware/auth.js';
router.post('/register',authController.signup);
router.post('/login',authController.login);
router.get('/user',auth,authController.get_user);
export default router;


