import { Document } from 'mongoose'

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
	studentId: string
	name: IName
	age: number
	address?: IAddress
	email: string
}
