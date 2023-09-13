import {Router as router} from "express";
import * as cartController from "../Controllers/cartController.js";

router.get('/cart/:id',cartController.get_cart_items);
router.post('/cart/:id',cartController.add_cart_item);
router.delete('/cart/:userId/:productId',cartController.delete_item);
export default router;