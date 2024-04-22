'use server'

import { addStudent } from '@/mongodb/models/Students'
import { IStudent } from '@/typings'
import { revalidateTag } from 'next/cache'

const createStudent = async (formData: FormData) => {
	// Constructing the student data from FormData
	const studentData: IStudent = {
		studentId: formData.get('studentId') as string,
		name: {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string
		},
		age: parseInt(formData.get('age') as string, 10),
		email: formData.get('email') as string,
		address: {
			street: formData.get('street') as string,
			city: formData.get('city') as string,
			state: formData.get('state') as string,
			zipCode: formData.get('zipCode') as string
		}
	}

	try {
		// Use the existing addStudent function to handle database operations.
		//FROM DB SUCCESS CAN BE TRUE OR FALSE, FIND A WAY TO DISPLAY IT TO THE FRONT-END
		const savedStudentData = await addStudent(studentData)
		console.log('return from database', savedStudentData)
		revalidateTag('students')
		return savedStudentData // This should be a Mongoose document if addStudent is properly typed.
	} catch (error: any) {
		console.error('Error processing student data:', error)
		return new Error(`Error processing student data: ${error.message}`) // Return an Error object
	}
}

export default createStudent
