import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Linking,
	Alert
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assets/themes/Color.js';

const RegisterExtraInfo = () => {
	const navigation = useNavigation();
	const [ username, setUsername ] = useState('');
	const [ age, setAge ] = useState('');

	return (
		<SafeAreaView style={styles.root}>
			{/*  Title */}

			<Text style={styles.title}>Tell us about yourself!</Text>

			{/* Input Fields */}

			<View style={styles.inputs}>
				{/* Username */}

				<View style={styles.input}>
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
						onChangeText={(text) => setUsername(text)}
					/>
				</View>

				{/* Age */}

				<View style={styles.input}>
					<TextInput
						label="Age"
						value={age}
						mode="outlined"
						outlineColor={Color.Black}
						activeOutlineColor={Color.Black}
						autoCapitalize="none"
						keyboardType="default"
						returnKeyType="next"
						style={{ height: 50, backgroundColor: Color.White }}
						onChangeText={(text) => setUsername(text)}
					/>
				</View>
			</View>

			{/* Continue Button */}

			<View style={styles.button}>
				<Button
					mode="contained"
					uppercase={false}
					color={Color.PrimaryMain}
					style={{ borderRadius: 10 }}
					labelStyle={{
						fontWeight : 'bold',
						fontSize   : 18
					}}
					contentStyle={{
						padding : 5
					}}
					onPress={() => handlePress()}
				>
					Continue
				</Button>

				{/* Testing */}

				<View>
					<Text> {username} </Text>
					<Text> {username} </Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RegisterExtraInfo;

const styles = StyleSheet.create({
	root                 : {
		flex : 1
	},
	oldTitle             : {
		position         : 'absolute',
		width            : 305,
		height           : 34,
		top              : 125,
		fontSize         : 28,
		fontWeight       : '700',
		textAlign        : 'center',
		marginHorizontal : 20,
		letterSpacing    : 0.36,
		alignSelf        : 'center'
	},
	title                : {
		flex             : 1,
		fontSize         : 28,
		fontWeight       : '700',
		textAlign        : 'center',
		marginHorizontal : 20,
		letterSpacing    : 0.36,
		alignSelf        : 'center'
	},
	inputs               : {
		flex : 1
	},
	input                : {
		padding : 20
	},
	usernameFieldWrapper : {
		position  : 'absolute',
		width     : '75%',
		height    : 74,
		top       : 200,
		alignSelf : 'center'
	},
	ageField             : {
		position  : 'absolute',
		width     : '75%',
		height    : 74,
		top       : 300,
		alignSelf : 'center'
	},
	button: {
		
	},
	oldButton               : {
		position         : 'absolute',
		width            : 315,
		height           : 101,
		top              : 600,
		borderRadius     : 10,
		marginHorizontal : 20,
		justifyContent   : 'space-between',
		alignSelf        : 'center'
	}
});
