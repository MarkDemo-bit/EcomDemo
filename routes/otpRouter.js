 import { Router } from 'express'
import { verifyOTP, resendOTP } from '../controllers/otpApis/verifyOTP.js'

const otpRouter = Router()

//get all users

otpRouter
    .post('/verify', verifyOTP)
    .post('/resend', resendOTP)


export default otpRouter