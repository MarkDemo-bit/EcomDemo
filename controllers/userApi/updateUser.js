import User from '../../schemas/userSchema.js'


// edit user
export const editUser = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({mess: 'User updated successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
      return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
   
}
export const editProfile = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    const { country, Number, Street, Bio } = req.body
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, {
                $set: {
                    'profile.country': country,
                    'profile.Number': Number,
                    'profile.Street': Street,
                    'profile.Bio': Bio
                }
            }, { new: true })
            res.status(200).json({mess: 'User updated successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
      return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
   
}