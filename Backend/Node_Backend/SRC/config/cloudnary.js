import {v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret
})
export default cloudinary