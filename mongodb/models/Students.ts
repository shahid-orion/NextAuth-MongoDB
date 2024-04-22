import { IStudent } from '@/typings' // Ensure this path correctly points to where your interfaces are defined
import { Schema, model, models } from 'mongoose'
import connectDB from '../db'

//Create a Schema for students
// const StudentSchema = new Schema<IStudent>(
// 	{
// 		studentId: { type: String, required: true, unique: true },
// 		name: {
// 			firstName: { type: String, required: true },
// 			lastName: { type: String, required: true }
// 		},
// 		age: { type: Number, required: true },
// 		address: {
// 			street: String,
// 			city: String,
// 			state: String,
// 			zipCode: String
// 		},
// 		email: { type: String, required: true, unique: true }
// 	},
// 	{
// 		toJSON: { virtuals: true },
// 		toObject: { virtuals: true }
// 	}
// )

const StudentSchema = new Schema<IStudent>({
	studentId: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		}
	},
	age: {
		type: Number,
		required: true
	},
	address: {
		street: String,
		city: String,
		state: String,
		zipCode: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
})

// Compile model from schema
//Singleton pattern
const StudentModel = models.Student || model<IStudent>('Student', StudentSchema)

interface Result<T> {
	success: boolean
	data?: T
	error?: string
}

async function addStudent(studentData: IStudent): Promise<Result<IStudent>> {
	await connectDB()
	try {
		const student = new StudentModel(studentData)
		const savedStudent = await student.save()
		// Immediately convert the MongoDB ObjectId to a string
		const resultStudent: IStudent = {
			...savedStudent.toObject(), // Convert the mongoose document to a plain object
			_id: savedStudent._id.toString() // Ensure _id is converted to string
		}
		return { success: true, data: resultStudent }
	} catch (error: any) {
		console.error('Failed to add student:', error.message)
		return { success: false, error: `Failed to add student: ${error.message}` }
	}
}

// async function addStudent(studentData: IStudent): Promise<Result<IStudent>> {
// 	await connectDB()
// 	try {
// 		const student = new StudentModel(studentData)
// 		// console.log('collected student data: ', student)
// 		const savedStudent = await student.save()
// 		// console.log('saved student data: ', savedStudent)
// 		return savedStudent
// 	} catch (error: any) {
// 		console.error('Failed to add student:', error.message)
// 		return { success: false, error: `Failed to add student: ${error.message}` }
// 		// return {} as IStudent // Return empty object on failure
// 	}
// }

//fetch all students
async function fetchAllStudents(): Promise<IStudent[]> {
	await connectDB()
	try {
		const rawStudents = await StudentModel.find().lean()
		const students: IStudent[] = rawStudents.map((student) => ({
			...student,
			_id: student._id as string, // Explicit conversion here
			studentId: student.studentId,
			name: student.name,
			age: student.age,
			address: student.address,
			email: student.email
		}))
		return students
	} catch (error: any) {
		console.error('Failed to fetch students:', error.message)
		return []
	}
}

// async function fetchAllStudents(): Promise<IStudent[]> {
// 	await connectDB() // Ensure the database connection is ready

// 	try {
// 		const students = await StudentModel.find().lean()
// 		// Map fields to conform exactly to IStudent, removing or converting unwanted fields
// 		return students.map((student) => ({
// 			studentId: student.studentId,
// 			name: student.name,
// 			age: student.age,
// 			email: student.email,
// 			address: student.address
// 				? {
// 						street: student.address.street,
// 						city: student.address.city,
// 						state: student.address.state,
// 						zipCode: student.address.zipCode
// 				  }
// 				: undefined
// 		}))
// 	} catch (error: any) {
// 		console.error('Failed to fetch students:', error.message)
// 		return []
// 	}
// }

//fetch single student
async function fetchStudentByEmail(email: string): Promise<IStudent | {}> {
	await connectDB() // Ensure the database connection is ready
	try {
		// Retrieve the student record by email
		const student = await StudentModel.findOne({ email: email })
		return student || {} // Returns the student document or an empty object if not found
	} catch (error: any) {
		console.error('Failed to fetch student by email:', error.message)
		// Return an empty object to maintain a consistent return type
		return {}
	}
}

//update single student by email
async function updateStudentByEmail(
	email: string,
	updateData: Partial<IStudent>
): Promise<IStudent | null | string> {
	//connecting mongodb database first
	await connectDB()
	try {
		// Update the student record by email and return the updated document
		const updatedStudent = await StudentModel.findOneAndUpdate(
			{ email: email },
			{ $set: updateData },
			{ new: true, runValidators: true } // options to return the updated object and run schema validators
		)

		if (!updatedStudent) {
			return null // Return null if no student was found to update
		}
		return updatedStudent
	} catch (error: any) {
		console.error('Failed to update student by email:', error.message)
		return `Error updating student by email: ${error.message}`
	}
}

//delete student by email
async function deleteStudentByEmail(email: string): Promise<string> {
	//connecting mongodb database first
	await connectDB()
	try {
		const result = await StudentModel.findOneAndDelete({ email: email })
		if (!result) {
			return 'No student found with that email to delete.'
		}
		return 'Student successfully deleted.'
	} catch (error: any) {
		console.error('Failed to delete student by email:', error.message)
		return `Error deleting student by email: ${error.message}`
	}
}

export {
	StudentModel,
	addStudent,
	fetchAllStudents,
	fetchStudentByEmail,
	updateStudentByEmail,
	deleteStudentByEmail
}
