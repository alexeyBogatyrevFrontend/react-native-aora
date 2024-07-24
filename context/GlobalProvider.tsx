import { getCurrentUser } from '@/lib/appwrite'
import { createContext, useContext, useEffect, useState } from 'react'

// @ts-ignore
const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }: any) => {
	const [isLogged, setIsLogged] = useState(false)
	const [user, setUser] = useState<any | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getCurrentUser()
			.then(res => {
				if (res) {
					setIsLogged(true)
					setUser(res)
				} else {
					setIsLogged(false)
					setUser(null)
				}
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				user,
				setUser,
				loading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
