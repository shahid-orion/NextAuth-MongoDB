const getUrl = (path: string) =>
	process.env.NODE_ENV === 'development'
		? `http://localhost:3000${path}`
		: process.env.VERCEL_URL + path

export default getUrl
