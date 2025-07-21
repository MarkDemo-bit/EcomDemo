import Product from '../../schemas/productSchema.js'
import Cart from '../../schemas/cartSchema.js'


export const createCartItem = async (req, res) => {
  const { productId } = req.params
  const userid = req.user._id
  try {
    //check for product in the collection
    const product = await Product.findById(productId)
    if (!product) {
      res.status(400).json({ message: "Product not found" })
      return
    }
    //check if the user has a cart
    let cart = await Cart.findOne({ userId: userid })
    if (!cart) {
      cart = new Cart(
        {
          userId: userid,
          products: [
            {
              productId: product._id,
              quantity: 1,
              price: product.price,
            },
          ],
        }
      )

    } else {
      const existingCartItem = cart.products.find(item => item.productId.toString() === productId)
      if (existingCartItem) {
        existingCartItem.quantity += 1
      } else {
        cart.products.push({
          productId: product._id,
          quantity: 1,
          price: product.price,
        })
      }
    }
//update totalItemPrice of each member of the cart array
cart.products.forEach(item => {
  item.totalItemPrice = item.price * item.quantity
})
    //update the totalCartPrice of the cart
    cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)
    //save the cart both existing or newly created cart
    await cart.save()
    await cart.populate('products.productId')

    res.status(201).json(cart)

  } catch (error) {
    console.log(error)
  }
}


//UPDATE CART ITEM

export const editCartItem = async (req, res) => {
  const { productId, type } = req.body //types can be "increase" or "decrease"
  if (!productId || !type) {
    res.status(400).json({ message: "Please provide all fields" })
    return
  }
  const userid = req.user._id
  try {
   //check for users cart
  const cart = await Cart.findOne({ userId: userid })
  if (!cart) {
    res.status(400).json({ message: "Cart not found" })
    return
  }
    //check for the specific item in the products array
    const existingCartItem = cart.products.find(item => item.productId.toString() === productId)
    if (type === "increase") {
      existingCartItem.quantity += 1
    } else if (type === "decrease" && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1
    } else {
      res.status(400).json({ message: "type can be either increase or decrease" })
      return
    }
    //update totalItemPrice of each member of the cart array
cart.products.forEach(item => {
  item.totalItemPrice = item.price * item.quantity
})
    //update the totalCartPrice of the cart
  cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)
    //save the cart both existing or newly created cart
    await cart.save()
    await cart.populate('products.productId')
    res.status(200).json(cart)

 } catch (error) {

 }
}
export const getCartItems = async (req, res) => {
  try {
   const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId')
   if (!cart) {
    res.status(400).json({ message: "Cart not found" })
    return
   }
   res.status(200).json(cart)
  } catch (error) {
    console.log(error)
  }
}

export const deleteCartItems = async (req, res) => {
 
 try {
  const cart = await Cart.findOne({ userId: req.user._id })
  if (!cart) {
   res.status(400).json({ message: "Cart not found" })
   return
   }
   cart.products = []
   cart.totalCartPrice = 0
   await cart.save()
   res.status(200).json({mess: 'Cart deleted successfully'})
 } catch (error) {
  console.log(error)
 }
}
