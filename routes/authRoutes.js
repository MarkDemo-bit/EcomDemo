 import { Router } from 'express'
import {loggingIn, passwordResetRequest, passwordReset} from '../controllers/authApis/authController.js'

const authRouter = Router()

//get all users

authRouter
    //post
    .post('/user/login', loggingIn)
    .post('/pasword/resetRequest', passwordResetRequest)
    .post('/pasword/reset', passwordReset)


export default authRouter