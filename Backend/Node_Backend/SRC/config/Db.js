import mongoose from 'mongoose'
export const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection to the database")
    } catch (error) {
        console.log(`Failed to connect database ${error}`)
    }
}