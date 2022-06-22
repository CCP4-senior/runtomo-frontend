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
import LongButton from '../../components/LongButton';

const UserProfileEditScreen = ({ navigation, user }) => {
	const { height } = useWindowDimensions();

	const [ username, setUsername ] = useState('my username');
	const [ email, setEmail ] = useState('myemail@example.com');
	const [ age, setAge ] = useState('34');
	const [ runnerType, setRunnerType ] = useState('social');

	const doneButtonHandler = () => {
		alert('Done!');
	};

	const cancelButtonHandler = () => {
		alert('Canceled!');
	};

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				{/* Username */}

				<View style={styles.field}>
					<Text style={styles.text}>Username</Text>

					<CustomInput
						placeholder="please input a username"
						value={username}
						changeHandler={(value) => setUsername(value)}
						width={'100%'}
					/>
				</View>

				{/* Email */}

				<View style={styles.field}>
					<Text style={styles.text}>Email</Text>

					<CustomInput
						placeholder="please input a username"
						value={email}
						changeHandler={(value) => setEmail(value)}
						width={'100%'}
					/>
				</View>

				{/* Age */}
				<View style={styles.field}>
					<Text style={styles.text}>Age</Text>

					<CustomInput
						placeholder="your age"
						value={age}
						changeHandler={(value) => setAge(value)}
						width={'100%'}
					/>
				</View>

				{/* Runner type */}
				<View style={styles.field}>
					<Text style={styles.text}>Runner Type</Text>

					<CustomInput
						placeholder="your type of running"
						value={age}
						changeHandler={(value) => setRunnerType(value)}
						width={'100%'}
					/>
				</View>

				{/* Buttons */}
				<View>
					<LongButton
						buttonHandler={doneButtonHandler}
						buttonColor={Color.PrimaryMain}
						buttonText="Done"
					/>
					<LongButton
						buttonHandler={cancelButtonHandler}
						buttonColor={Color.White}
            buttonTextColor={Color.PrimaryMain}
						buttonText="Cancel"
					/>
				</View>
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
		// backgroundColor: 'coral',
		padding         : 30,
		justifyContent  : 'flex-start',
		alignItems      : 'flex-start',
		overflow        : 'visible',
		width           : '100%'
	},
	title          : {
		fontSize  : 30,
		alignSelf : 'center'
	},
	text           : {
		fontSize       : 20,
		marginVertical : 5
	},
	field          : {
		// flex           : 1,
		justifyContent : 'center',
		alignItems     : 'flex-start',
		width          : '100%',
		marginVertical : 5
		// borderWidth: 2
	},
	customInput    : {},
	inputContainer : {
		flex           : 1,
		marginVertical : 5
	}
});
