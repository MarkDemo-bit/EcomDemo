import bcrypt from 'bcryptjs'
import User from '../../schemas/userSchema.js'
import { generateOTP, sendMail } from '../../utils/sendEmail.js'


export const createUser = async (req, res) => {
    const { username, gmail, password } = req.body
    
    if (!username || !gmail || !password) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    }
    try {
        const user = await User.findOne({ gmail })
        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }
    //generate OTP and otp expiration date
         const { otp, otpExpires } = generateOTP()
       
       //hash password
        const hashedPassword = bcrypt.hashSync(password, 10)
        
        if (gmail === 'Barakat@gmail.com' || gmail === 'Emmanuel@gmail.com') {
            const newUser = new User({ ...req.body, password: hashedPassword, admin: true })
           await newUser.save()
        }

        const newUser = new User({ ...req.body, password:hashedPassword, admin: false, otp, otpExpires, AltimatAdmin: false, profile: { country: '', Number: '', Street: '', Bio: '' } })
        await newUser.save()

        // send email
        try {
        const mailObj = {
        mailFrom: `Ecommapis ${process.env.EMAIL_USER}`,
        mailTo: gmail,
        subject: 'Successfully created an account',
        body:`
            <h1>Welcome to Ecommapis <strong>${username}</strong> 😍</h1>
            <p>Here is your OTP ${otp}, proceed to verify</p>
            <p>Please proceed to make a post and enjoy the experience</p>
            <p>Your username is ${process.env.SUPORT}</p>

          `
            }
            const info = await sendMail(mailObj)
            console.log(info)
        } catch (error) {
            console.log(error)
        }

        res.status(201).json({mess: 'New User created successfully'})

    } catch (error) {
        res.status(500).json(error)
    }
}

