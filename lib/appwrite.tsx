import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from 'react-native-appwrite'

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.bogatyrev.aora',
	projectId: '66a0cb750001a33ce224',
	databaseId: '66a0cd6500377749d5f7',
	userCollectionId: '66a0cd7b00015c4e2894',
	videoCollectionId: '66a0cda20009bc5af35b',
	storageId: '66a0cee00032399040f3',
}

// Init your react-native SDK
const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

// Sign Up
export const createUser = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)

		if (!newAccount) console.log('Account is required')

		const avatarUrl = avatars.getInitials(username)

		await signIn(email, password)

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		)

		return newUser
	} catch (error) {
		console.log(error)
	}
}

// Sign in
export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password)

		return session
	} catch (error) {
		console.log(error)
	}
}

// get current user
export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get()

		if (!currentAccount) console.log('Account is required')

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		)

		if (!currentUser) console.log('User is required')

		return currentUser.documents[0]
	} catch (error) {
		console.log(error)
	}
}
