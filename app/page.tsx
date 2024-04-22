import createStudent from '@/actions/createStudent'
import getUrl from '@/lib/getUrl'
import { fetchAllStudents } from '@/mongodb/models/Students'
import { IStudent } from '@/typings'

export default async function Home() {
	//getting the url-->for server side url path
	const url = getUrl('/students')
	//making fetch request where we will use revalidate tags
	const response = await fetch(url, {
		next: {
			tags: ['students']
		}
	})
	const students = (await response.json()) as IStudent[]

	return (
		<main className="p-8 bg-gray-100 min-h-screen flex">
			<div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
				<h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					Student Form
				</h1>
				<form action={createStudent} className="space-y-5 text-black">
					<div>
						<label
							htmlFor="studentId"
							className="block text-sm font-medium text-gray-700"
						>
							Student ID
						</label>
						<input
							type="text"
							name="studentId"
							id="studentId"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-gray-700"
							>
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-700"
							>
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="age"
							className="block text-sm font-medium text-gray-700"
						>
							Age
						</label>
						<input
							type="number"
							name="age"
							id="age"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="md:col-span-2">
							<label
								htmlFor="street"
								className="block text-sm font-medium text-gray-700"
							>
								Street
							</label>
							<input
								type="text"
								name="street"
								id="street"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label
								htmlFor="city"
								className="block text-sm font-medium text-gray-700"
							>
								City
							</label>
							<input
								type="text"
								name="city"
								id="city"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div className="md:col-span-1">
							<label
								htmlFor="state"
								className="block text-sm font-medium text-gray-700"
							>
								State
							</label>
							<input
								type="text"
								name="state"
								id="state"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label
								htmlFor="zipCode"
								className="block text-sm font-medium text-gray-700"
							>
								Zip Code
							</label>
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</form>
			</div>
			{/* student details */}
			{students.length > 0 && (
				<div className="mt-10">
					<h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
						Student Details
					</h2>
					<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">
						{students.map((student: IStudent, index: number) => (
							<div
								key={index}
								className="p-4 border border-gray-300 rounded-lg text-black"
							>
								<p>
									<strong>ID:</strong> {student.studentId}
								</p>
								<p>
									<strong>Name:</strong> {student.name.firstName}{' '}
									{student.name.lastName}
								</p>
								<p>
									<strong>Age:</strong> {student.age}
								</p>
								<p>
									<strong>Email:</strong> {student.email}
								</p>
								<p>
									<strong>Address:</strong> {student.address?.street},{' '}
									{student.address?.city}, {student.address?.state}{' '}
									{student.address?.zipCode}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</main>
	)
}
