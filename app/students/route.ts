import { fetchAllStudents } from '@/mongodb/models/Students'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const students = await fetchAllStudents()
	return NextResponse.json(students) // Ensure this correctly serializes the data
}
