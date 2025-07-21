import jwt from 'jsonwebtoken'

const getToken = (userId) => { 
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1m"})
}

export default getToken