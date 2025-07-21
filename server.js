import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRouter.js'
import uploadFileRouter from './routes/uploadFileRouter.js'
import connectDb from './dbconnect/mongodb.js'
import dotenv from 'dotenv'
import otpRouter from './routes/otpRouter.js'
import allApis from './routes/allApis.js'
import cors from 'cors';
app.use(cors());


dotenv.config()





connectDb()

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//api/user/crete/creatUserFunction

app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', uploadFileRouter)
app.use('/api/otp', otpRouter)
app.use('/', allApis)





const port = process.env.PORT || 1000


app.listen(port, console.log(`server listening on port ${port}`))





