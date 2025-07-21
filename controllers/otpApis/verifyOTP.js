import User from "../../schemas/userSchema.js"
import { generateOTP, sendMail } from "../../utils/sendEmail.js"

export const verifyOTP = async (req, res) => {
    const { otp, gmail } = req.body
    
    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }
        if (user.isVerified) return res.status(400).json({ message: "OTP is already verified" })

        if (user.otp !== otp) return res.status(400).json({ message: "OTP is incorrect" })
        if (user.otpExpires < Date.now()) return res.status(400).json({ message: "OTP is expired" })
        
        //verify otp
        user.otp = undefined
        user.otpExpires = undefined
        user.isVerified = true

        await user.save()
        res.status(200).json({ message: "OTP is verified, please proceed to login" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const resendOTP = async (req, res) => {
    const { gmail } = req.body
    try {
        const user = await User.findOne({ gmail })
        const { otp, otpExpires } = generateOTP()

        const time = Date.now()

        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }
        if (user.isVerified) return res.status(400).json({ message: "OTP is already verified" })
        if (time - user.lastOtpSentAt < 20 * 60 *1000 ) return res.status(400).json({ message: "Wait for 20mins before resending OTP" })
        
        user.otp = otp
        user.otpExpires = otpExpires
        user.lastOtpSentAt = time
        await user.save()
    
    await sendMail({
        mailFrom: `Ecommapis ${process.env.EMAIL_USER}`,
        mailTo: gmail,
        subject: 'Updated OTP',
        body:`
            <p>Here is your OTP ${otp}, proceed to verify</p>
          `
    })
        res.status(200).json({ message: "OTP is resent successfully" })
    } catch (error) {
        console.log(error)
    }
    }