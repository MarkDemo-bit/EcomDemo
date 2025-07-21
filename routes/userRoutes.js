import { Router } from 'express'
import { createUser, getAllUsers, getAUser, getByqueryParams, editUser, editProfile, deleteUser } from '../controllers/userApi/barrel.js'

import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = Router()


userRouter
    //post
    .post('/user/create', createUser) 
    //get
    .get('/users', getAllUsers)
    .get('/user/:id', getAUser)
    .get('/usersByquery', getByqueryParams)
    //put
    .put('/user/update/:id', authMiddleware, editUser)
    .put('/profile/update/:id',authMiddleware, editProfile)

    //delete
    .delete('/user/delete/:id', authMiddleware, deleteUser)
   

export default userRouter