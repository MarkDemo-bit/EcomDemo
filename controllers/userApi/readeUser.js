import User from '../../schemas/userSchema.js'


// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//getAUser
export const getAUser = async (req, res) => { 
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
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
        const user = await User.find(filter)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

