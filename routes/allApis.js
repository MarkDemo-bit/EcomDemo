 import { Router } from 'express'

const allApis = Router()

//get all users


const apis = [
    {
        name: 'user',
        description: 'user related apis',
        endpoints: [
            'http://localhost:3000/api/user/create',
            'http://localhost:3000/api/user/login',
            'http://localhost:3000/api/user/verifyOTP',
            'http://localhost:3000/api/user/resendOTP'
        ],
    },
    {
        name: 'product',
        description: 'product related apis',
        endpoints: [
            'http://localhost:3000/api/product/create',
            'http://localhost:3000/api/product/getAll',
            'http://localhost:3000/api/product/getById',
            'http://localhost:3000/api/product/update',
            'http://localhost:3000/api/product/delete'
        ],
    },
    {
        name: 'cart',
        description: 'cart related apis',
        endpoints: [
            'http://localhost:3000/api/cart/create',
            'http://localhost:3000/api/cart/getAll',
            'http://localhost:3000/api/cart/getById',
            'http://localhost:3000/api/cart/update',
            'http://localhost:3000/api/cart/delete'
        ],
    },
    {
        name: 'uploadFile',
        description: 'upload file related apis',
        endpoints: [
            'http://localhost:3000/api/uploadFile/upload'
        ],
        name: 'otp',
        description: 'otp related apis',
        endpoints: [
            'http://localhost:3000/api/otp/verify',
            'http://localhost:3000/api/otp/resend'
        ]
    }
]
allApis
    //post
    .get('/', (req, res) => {
        res.status(200).send({apis})
    })


export default allApis