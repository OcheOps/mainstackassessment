import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, } from '../controllers/products.js';
import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();
// Create a new product
router.post('/', authMiddleware, createProduct);
// Get all products
router.get('/', getAllProducts);
// Get a product by ID
router.get('/:id', getProductById);
// Update a product
router.put('/:id', authMiddleware, updateProduct);
// Delete a product
router.delete('/:id', authMiddleware, deleteProduct);
export default router;
//# sourceMappingURL=products.js.map