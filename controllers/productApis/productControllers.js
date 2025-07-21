import Product from '../../schemas/productSchema.js'

export const createProduct = async (req, res) => {
    const { name, price, color, size } = req.body 
    
    const user = req.user

    if (!name || !price || !color || !size) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    }
    try {
            const newProduct = new Product({...req.body, userId: user._id})
            await newProduct.save()
            res.status(201).json({mess: 'New Product created successfully'})
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all Product
  const getuserProducts = async (req, res) => {
    const user = req.user
    try {
        const Products = await Product.find({ userId: user._id })
        res.status(200).json(Products)
    } catch (error) {
        res.status(500).json(error)
    }

}
export const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find()
        res.status(200).json(Products)
    } catch (error) {
        res.status(500).json(error)
    }

}
//getByqueryParams

export const getByqueryParams = async (req, res) => {
    const { name, price, year } = req.query
    const filter = {}

    if (username) filter.filterusername = name
    if (gmail) filter.gmail = price
    if (gmail) filter.year = year

    try {
        const user = await Product.find(filter)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// edit user
export const editProduct = async (req, res) => {
    const { id } = req.params
    const {name , price, color, size} = req.body
    const reqId = req.user._id

        try {
            const product = await Product.findOne({ _id: id, userId: reqId })
            if (!product) {
                res.status(400).json({ message: "Product not found" })
                return
            }

            //first methord
            product.name = name ?? product.name
            product.price = price ?? product.price
            product.color = color ?? product.color
            product.size = size ?? product.size

            await product.save()
            // second methord

            // await product.findByIdAndUpdate(id, {
            //     $set: {
            //         'name': name,
            //         'price': price,
            //         'color': color,
            //         'size': size
            //     }
            // }, { new: true })

            res.status(200).json({mess: 'Product updated successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    }


 // delete user
 export const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    try {
         await Product.findByIdAndDelete(id)
        
        res.status(200).json({mess: 'User deleted successfully'})
    } catch (error) {
        res.status(500).json(error)
    }
}

