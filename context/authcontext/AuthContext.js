import React, { useState, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../../axios/axios';
import * as RootNavigation from '../../navigations/RootNavigator.js';
import { Alert } from 'react-native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState('');

	const createUser = async ({ username, email, password }) => {
		try {
			const response = await axiosInstance.post('/auth/signup/', {
				username : username.trim(),
				email    : email.trim(),
				password : password.trim()
			});
			await signInUser({ email, password });
		} catch (e) {
			alert('Something went wrong. Please try again!');
		}
	};

	const signInUser = async ({ email, password }) => {
		try {
			const response = await axiosInstance.post('/auth/jwt/create/', {
				email    : email,
				password : password
			});
			if (response.status === 200) {
				const data = response.data;

				// TODO: user information will be updated dynamically when backend is ready
				const mockData = {
					username   : 'wadeRunner',
					email      : 'wade@example.com',
					age        : '34',
					runnerType : [ 'beginner', 'social' ]
				};

				setUser({
					id       : jwt_decode(data.access)['user_id'],
					username : mockData.username,
          email: mockData.email,
					age      : mockData.age,
          runnerType: mockData.runnerType,
				});

				await SecureStore.setItemAsync(
					'access_token',
					JSON.stringify(data.access)
				);
				await SecureStore.setItemAsync(
					'refresh_token',
					JSON.stringify(data.refresh)
				);
			}
		} catch (e) {
			Alert.alert('Error', e.response.data.detail, [
				{
					text    : 'OK',
					onPress : () => null,
					style   : 'cancel'
				}
			]);
		}
	};

	const signOutUser = async () => {
		try {
			setUser('');
			await SecureStore.deleteItemAsync('access_token');
			await SecureStore.deleteItemAsync('refresh_token');
			RootNavigation.navigate('AuthSelection', { tokenExpired: true });
		} catch (e) {
			alert('Something went wrong. Please try again!');
		}
	};

	// DeleteAccount function: to be implemented once endpoint is ready
	// const deleteAccount = async () => {
	//   await axiosInstance.delete("/api/delete_account", {
	//   });
	// };

	const contextData = {
		createUser,
		user,
		setUser,
		signInUser,
		signOutUser
		/*deleteAccount,*/
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
