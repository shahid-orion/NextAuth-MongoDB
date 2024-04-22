'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
	return (
		<button
			className="bg-red-500 text-white py-2 px-6 rounded"
			onClick={() => signOut()}
		>
			Sign Out
		</button>
	)
}

export default SignOutButton
