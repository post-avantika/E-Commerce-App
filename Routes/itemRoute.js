import {Router as router} from 'express';
import * as itemController from '../Controllers/itemController.js';
router.get('/items',itemController.get_items);
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/id:',itemController.delete_item);
export default router;
