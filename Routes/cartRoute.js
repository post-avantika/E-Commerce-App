import {Router as router} from "express";
import * as cartController from "../Controllers/cartController.js";

router.get('/cart/:id',cartController.get_cart_items);
router.post('/cart/:id',controller.add_cart_item);
router.delete('/cart/:userId/:productId',controller.delete_cart_item);
export default router;