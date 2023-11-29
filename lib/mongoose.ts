import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is required')

  if (isConnected) return console.log('Connection to Database is established')

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error)
  }
}
