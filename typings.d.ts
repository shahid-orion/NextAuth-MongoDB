// import { Document } from 'mongoose'
import { SessionOptions } from 'next-auth'
//
declare module 'next-auth' {
	interface Session {
		user: {
			/** Assuming your user object may already have these, add any that aren't already declared */
			name?: string
			email?: string
			image?: string // Add the image property here
		}
	}
}

// Interfaces for subdocuments and nested objects
interface IName {
	firstName: string
	lastName: string
}

interface IAddress {
	street?: string
	city?: string
	state?: string
	zipCode?: string
}

// Main Student Interface
interface IStudent {
	_id?: string
	studentId: string
	name: IName
	age: number
	address?: IAddress
	email: string
}
