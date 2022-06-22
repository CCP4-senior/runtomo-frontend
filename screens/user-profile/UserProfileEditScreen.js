import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	Image,
	useWindowDimensions,
	Button,
	TextInput
} from 'react-native';

import Color from '../../assets/themes/Color';
import CustomInput from '../../components/CustomInput';

const UserProfileEditScreen = ({ navigation, user }) => {
	const { height } = useWindowDimensions();

	const [ username, setUsername ] = useState('my username');

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				{/* Username */}

				<View>
					<Text style={styles.text}>Username</Text>
				</View>

				<CustomInput
					placeholder="please input a username"
					value={username}
					changeHandler={(value) => setUsername(value)}
					width={'100%'}
				/>

				{/* Email */}
			</View>
		</SafeAreaView>
	);
};

export default UserProfileEditScreen;

const styles = StyleSheet.create({
	root           : {
		flex : 1
	},
	container      : {
		flex            : 1,
		backgroundColor : Color.Fill,
		padding         : 30,
		alignItems      : 'flex-start',
		overflow        : 'visible'
	},
	title          : {
		fontSize  : 30,
		alignSelf : 'center'
	},
	text           : {
		fontSize       : 20,
		marginVertical : 5,
		alignSelf      : 'flex-start'
	},
	customInput    : {
		// alignSelf : 'stretch'
	},
	inputContainer : {
		// flex           : 1,
		marginVertical : 5
	}
});
