import jwt from 'jsonwebtoken'
import userModel from '../schemas/userSchema.js'
const authMiddleware = async (req, res, next) => {
   
    const accessToken = req.cookies.token 
    const jwtSecrete = process.env.JWT_SECRET

    if (!accessToken) {
        return res.status(401).json({ message: "Please login first" })
    }
    try {
        const tokenWithvalidSecret = jwt.verify(accessToken, jwtSecrete)

         if (!tokenWithvalidSecret) {
            return res.status(401).json({ message: "Invalid secrete" })
        }
       const verifieduser = await userModel.findById({_id:tokenWithvalidSecret.id}).select("-password")
         if (!verifieduser) {
            return res.status(401).json({ message: "Invalid id" })
        }
        req.user = verifieduser
        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}
export default authMiddleware