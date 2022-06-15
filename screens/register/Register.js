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
import { AuthContext } from "../../context/authcontext/AuthContext";




const Register = ( { navigation }) => {
	const { setUser } = useContext(AuthContext);
	
	const [ text, onChangeText ] = React.useState('Useless Text');
	const [ number, onChangeNumber ] = React.useState(null);
	
	const handleRegister = () => {
		setUser("Wane");
		navigation.navigate("Register", { screen: "Home" });
	};

	return (
		<SafeAreaView style={styles.root}>
			<Text style={styles.title}> Create a New Account </Text>

			{/* Email input */}
			<View>
				<Text style={styles.text}>E-mail</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeNumber}
					value={number}
					placeholder="youremail@example.com"
					keyboardType="numeric"
				/>
			</View>

			{/* Username Input */}
			<View>
				<Text style={styles.text}>Username</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeNumber}
					value={number}
					placeholder="yourawesomeusername"
					keyboardType="numeric"
				/>
			</View>

			{/* Password Input */}
			<View>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeNumber}
					value={number}
					placeholder="a strong password"
					keyboardType="numeric"
				/>
			</View>

			{/* Button */}
			<View>
				<Button
					title="Register"
					color={Color.PrimaryMain}
					onPress={handleRegister}
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
	input  : {
		height      : 40,
		borderWidth : 1,
		padding     : 10
	},
	spacer : {},
	text   : {},
	button : {
		color : 'red'
	}
});
