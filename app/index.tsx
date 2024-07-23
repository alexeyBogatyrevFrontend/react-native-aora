import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Text, View } from 'react-native'

const App = () => {
	return (
		<View className='flex-1 items-center justify-center bg-white'>
			<Text className='text-3xl font-pblack'>Aora!</Text>
			<StatusBar style='auto' />
			<Link href='/home'>Go to home</Link>
		</View>
	)
}

export default App
