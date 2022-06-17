import { StyleSheet, View, SafeAreaView, Text, Linking } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authcontext/AuthContext';
import Color from '../../assets/themes/Color.js';

const SignIn = () => {
	const navigation = useNavigation();
	const { setUser } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ secondPassword, setSecondPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ emailError, setEmailError ] = useState({
		isTriggered : false,
		message     : ''
	});
	const [ passwordError, setPasswordError ] = useState('');

	const handleSignIn = () => {
		if (true) {
			setUser({ id: 2, username: 'WayneWadeRuns' });
			navigation.navigate('SignIn', { screen: 'Home' });
		} else {
			setUser('');
		}
	};

	const handleUsername = (text) => {
		setUsername(text);
	};

	const validateEmail = (text) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
			const updatedEmailError = { isTriggered: false, message: '' };
			setEmailError(updatedEmailError);
		}
	};

	return (
		<SafeAreaView style={styles.root}>
			{/*  Title */}

			<Text style={styles.title}>Create a New Account</Text>

			{/* Email */}

			<View style={styles.emailFieldWrapper}>
				<TextInput
					label="Email"
					value={email}
					mode="outlined"
					outlineColor={Color.Black}
					activeOutlineColor={Color.Black}
					autoCapitalize="none"
					textContentType="emailAddress"
					keyboardType="email-address"
					returnKeyType="next"
					style={{ height: 50, backgroundColor: Color.White }}
					error={false}
					errorText={'TESTING'}
					onChangeText={(text) => {
						if (emailError.isTriggered === false) {
							const updatedEmailError = {
								isTriggered : true,
								message     : 'Please enter a valid email.'
							};
							setEmailError(updatedEmailError);
						}
						validateEmail(text);
						return setEmail(text);
					}}
				/>
				<Text style={styles.emailErrorMessage}>
					{emailError.isTriggered && emailError.message}
				</Text>
			</View>

			{/* Username */}

			<View style={styles.usernameFieldWrapper}>
				<TextInput
					label="Username"
					value={username}
					mode="outlined"
					outlineColor={Color.Black}
					activeOutlineColor={Color.Black}
					autoCapitalize="none"
					keyboardType="default"
					returnKeyType="next"
					style={{ height: 50, backgroundColor: Color.White }}
					onChangeText={handleUsername}
				/>
			</View>

			{/*  Password */}

			<View style={styles.passwordFieldWrapper}>
				<TextInput
					label="Password"
					value={password}
					mode="outlined"
					outlineColor={Color.Black}
					activeOutlineColor={Color.Black}
					textContentType="password"
					secureTextEntry={true}
					style={{ height: 50, backgroundColor: Color.White }}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			{/*  Second Password */}

			<View style={styles.secondPasswordFieldWrapper}>
				<TextInput
					label="Password (retype)"
					value={secondPassword}
					mode="outlined"
					outlineColor={Color.Black}
					activeOutlineColor={Color.Black}
					textContentType="password"
					secureTextEntry={true}
					style={{ height: 50, backgroundColor: Color.White }}
					onChangeText={(text) => setSecondPassword(text)}
				/>
			</View>

			{/* Register Button */}

			<View style={styles.registerBottomWrapper}>
				<Button
					mode="contained"
					uppercase={false}
					color={Color.PrimaryMain}
					style={{ borderRadius: 10 }}
					labelStyle={{
						fontWeight : 'bold',
						fontSize: 18,
					}}
					contentStyle={{
						padding : 5
					}}
					onPress={() => handleSignIn()}
				>
					Register
				</Button>
				<Text style={styles.registerText}>
					Already have an account?{' '}
					<Text
						style={styles.registerLink}
						onPress={() => navigation.navigate('SignIn')}
					>
						Sign In
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	root                       : {
		flex           : 1,
	},
	title                      : {
		position         : 'absolute',
		width            : 305,
		height           : 34,
		left             : 35,
		top              : 125,
		fontSize         : 28,
		fontWeight       : '700',
		textAlign        : 'center',
		marginHorizontal : 20,
		letterSpacing    : 0.36
	},
	emailFieldHeader           : {
		marginBottom : 10
	},
	emailFieldWrapper          : {
		position         : 'absolute',
		width            : 315,
		height           : 74,
		top              : 304,
		left             : 30,
		marginHorizontal : 20
	},
	emailErrorMessage          : {
		marginTop : 4,
		color     : Color.PrimaryMain
	},
	usernameFieldWrapper       : {
		position         : 'absolute',
		width            : 315,
		height           : 74,
		left             : 30,
		marginHorizontal : 20,
		top              : 200
	},
	passwordFieldWrapper       : {
		position         : 'absolute',
		width            : 315,
		height           : 70,
		top              : 400,
		left             : 30,
		marginHorizontal : 20
	},
	secondPasswordFieldWrapper : {
		position         : 'absolute',
		width            : 315,
		height           : 70,
		top              : 500,
		left             : 30,
		marginHorizontal : 20
	},
	forgotPasswordLink         : {
		position : 'absolute',
		color    : Color.PrimaryMain,
		top      : 470,
		left     : 245
	},
	registerBottomWrapper      : {
		position         : 'absolute',
		width            : 315,
		height           : 101,
		top              : 600,
		borderRadius     : 10,
		left             : 30,
		marginHorizontal : 20,
		justifyContent   : 'space-between'
	},
	registerText               : {
		alignSelf  : 'center',
		fontWeight : '500',
		color      : Color.Text
	},
	registerLink               : {
		color : Color.PrimaryMain
	}
});
