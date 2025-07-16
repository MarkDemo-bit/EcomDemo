import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    },
    totalItemPrice: {
        type: Number
    },
    price: {
        type: Number
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [cartItemSchema],
    
    totalCartPrice: {
        type: Number,

    }
}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema)

export default Cart