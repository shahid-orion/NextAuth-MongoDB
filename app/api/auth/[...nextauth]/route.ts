import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!
			// profile(profile, tokens) {
			// 	// Now includes tokens parameter
			// 	// console.log('Google Profile: ', profile)

			// 	let userRole = 'Google User' // Default role for Google users
			// 	if (profile?.email === 'sroutfit@gmail.com') {
			// 		userRole = 'admin'
			// 	}

			// 	// Correctly returning an object of type User
			// 	return {
			// 		id: profile.id || profile.email, // Assuming profile.id needs to be a string
			// 		name: profile.name,
			// 		email: profile.email,
			// 		image: profile.picture,
			// 		role: userRole
			// 	}
			// }
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!
			// profile(profile, tokens) {
			// 	// Now includes tokens parameter
			// 	// console.log('Github Profile: ', profile)

			// 	let userRole = 'Github User'
			// 	if (profile?.email === 'sroutfit@gmail.com') {
			// 		userRole = 'admin'
			// 	}

			// 	// Correctly returning an object of type User
			// 	return {
			// 		id: profile.id.toString(), // Assuming profile.id needs to be a string
			// 		name: profile.name,
			// 		email: profile.email,
			// 		image: profile.avatar_url,
			// 		role: userRole
			// 	}
			// }
		})
	]
	// callbacks: {
	// 	async jwt({ token, user }) {
	// 		// Correctly assign 'role' from user to token if user object exists
	// 		if (user) token.role = user.role // Use assignment (=), not comparison (==)
	// 		return token
	// 	},
	// 	async session({ session, token }) {
	// 		// Assign 'role' from token to session's user object if session and user object exist
	// 		if (session?.user) session.user.role = token.role as string // Use assignment (=), not comparison (==)
	// 		return session
	// 	}
	// }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
