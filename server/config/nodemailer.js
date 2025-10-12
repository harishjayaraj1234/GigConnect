import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: "nv5327260@gmail.com", 
        pass: 'cqze dadz dznp ycqf'
    }

})

export default transporter