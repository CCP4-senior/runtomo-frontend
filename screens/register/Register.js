import {
	StyleSheet,
	Text,
	TextInput,
	View,
	SafeAreaView,
	Button
} from 'react-native';
import React, { useState, useContext } from 'react';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Color from '../../assets/themes/Color';
import { AuthContext } from '../../context/authcontext/AuthContext';
import LongButton from '../../components/LongButton';
import CustomInput from '../../components/CustomInput';

const Register = ({ navigation }) => {
	const { setUser } = useContext(AuthContext);

	const [ email, setEmail ] = React.useState('');
	const [ username, setUsername ] = React.useState('');
	const [ password, setPassword ] = React.useState('');

	const handleRegister = () => {
		setUser('Wade');
		navigation.navigate('Register', { screen: 'Home' });
	};

	return (
		<SafeAreaView style={styles.root}>
			<Text style={styles.title}> Create a New Account </Text>

			{/* Email input */}
			<View style={styles.inputCard}>
				<Text style={styles.text}>E-mail</Text>
				<View>
					<CustomInput
						placeholder="email@example.com"
						value={email}
						changeHandler={(value) => setEmail(value)}
					/>
				</View>
			</View>

			{/* Username Input */}
			<View style={styles.inputCard}>
				<Text style={styles.text}>Username</Text>
				<View>
					<CustomInput
						placeholder="your username"
						value={username}
						changeHandler={(value) => setUsername(value)}
					/>
				</View>
			</View>

			{/* Password Input */}
			<View style={styles.inputCard}>
				<Text style={styles.text}>Password</Text>
				<CustomInput
					placeholder="use a strong password"
					value={password}
					changeHandler={(value) => setPassword(value)}
				/>
			</View>

			{/* Button */}
			<View>
				<LongButton
					buttonHandler={handleRegister}
					buttonColor={Color.PrimaryMain}
					buttonText="Register"
				/>
			</View>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	root   : {
		flex           : 1,
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'flex-start',
		margin         : 20
	},
	title  : {
		fontSize      : 28,
		fontWeight    : '700',
		letterSpacing : 0.36
	},
	inputCard  : {
		marginVertical: 10
	},
});
