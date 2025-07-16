import { Router } from 'express'
import { createProduct, getAllProducts, getByqueryParams, editProduct, deleteProduct } from '../controllers/productApis/productControllers.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const productRouter = Router()


productRouter
    //post
    .post('/product/create',authMiddleware, createProduct)
    //get
    .get('/products', getAllProducts)
 .get('/usersByquery',authMiddleware, getByqueryParams)
//     //put
   .put('/product/update/:id',authMiddleware, editProduct)

//     //delete
  .delete('/product/delete/:id',authMiddleware, deleteProduct)



export default productRouter