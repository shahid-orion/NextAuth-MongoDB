import mongoose from 'mongoose'

const connectionString = `mongodb+srv://srorion:${process.env.MONGODB_PASSWORD}@mongodb-nextauth.extdysy.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-nextauth`

if (!connectionString) {
	throw new Error('Please provide a valid connection string')
}

//here's the function that will create connection to mongoDB
const connectDB = async () => {
	//Singleton pattern
	if (mongoose.connection?.readyState >= 1) {
		console.log('------Already connected to MongoDB------')
		return
	}

	try {
		//connecting to database here
		await mongoose.connect(connectionString)
	} catch (error) {
		console.error('Error connecting to MongoDB', error)
	}
}

export default connectDB
