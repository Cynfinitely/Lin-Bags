import { Request, Response } from 'express'
import { Product } from '../models/productSchema'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'

export const getProducts = function (req: Request, res: Response) {
  Product.find(function (err: any, allproducts: any) {
    if (err) {
      console.log(err)
    } else {
      res.json(allproducts)
    }
  })
}

export const findProductById = async function (req: Request, res: Response) {
  const id = req.params.id
  console.log(id)
  const product = await Product.findById(id)
  console.log(product)
  res.json(product)
}

export const addProduct = function (req: Request, res: Response) {
  const newProduct = new Product(req.body)
  console.log('newproduct->', newProduct)
  newProduct
    .save()
    .then((todo: any) => {
      res.status(200).json(newProduct)
      return newProduct
    })
    .catch((err: any) => {
      res.status(400).send('adding new product failed')
    })
}

export const deleteProduct = function (req: Request, res: Response) {
  const id = req.params.id

  console.log(id)

  console.log('deleting')
  Product.findByIdAndDelete(id, function (err: any, docs: any) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('Product Deleted')
    }
  })
}

export const updateProduct = async function (req: Request, res: Response) {
  const id = req.params.id
  console.log(id)
  const product = await Product.findById(id)
  console.log(product)
  const updatedProduct = req.body
  console.log(updatedProduct)
  try {
    Product.findByIdAndUpdate(
      id,
      updatedProduct,
      function (err: any, docs: any) {
        if (err) {
          console.log(err)
        } else {
          console.log('Updated User : ', docs)
        }
      }
    )
  } catch (error) {
    ;('error')
  }
  return updatedProduct
}

// export const userLogin = passport.authenticate('google-id-token', {
//   session: false,
// })
// ;(req: Request, res: Response) => {
//   console.log(req.user)
//   const user = req.user as any
//   const token = jwt.sign({ userId: user._id, role: user.isAdmin }, JWT_SECRET, {
//     expiresIn: '1h',
//   })
//   res.json({ token })
// }
