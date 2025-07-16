import Router from "express"
import { createCartItem, getCartItems, editCartItem, deleteCartItems } from "../controllers/cartApis/cartController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const cartRouter = Router()

.post('/cart/create/:productId', authMiddleware, createCartItem)
.get('/carts', authMiddleware, getCartItems)
.put('/cart/update', authMiddleware, editCartItem)
.delete('/cart/items/delete', authMiddleware, deleteCartItems)

cartRouter
   

export default cartRouter