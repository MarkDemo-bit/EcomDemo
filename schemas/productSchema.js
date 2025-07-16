import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    } ,  
    imgUrl: {
        type: String
    }   
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)
export  default Product