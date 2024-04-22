'use client'

import { signIn } from 'next-auth/react'

const SignInButton = () => {
	return (
		<button
			className="bg-green-500 text-white py-3 px-7 rounded"
			onClick={() => signIn()}
		>
			Sign In
		</button>
	)
}

export default SignInButton
