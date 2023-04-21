import express from 'express'

import {
  getProducts,
  findProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  //   userLogin,
} from '../controllers/product.controller'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', findProductById)
router.post('/products', addProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.put('/updateproduct/:id', updateProduct)
// router.post('/login', userLogin)
export default router
