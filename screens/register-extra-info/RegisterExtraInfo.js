import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Linking,
	Alert
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Button, TextInput, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assets/themes/Color.js';

const RegisterExtraInfo = ({ route }) => {
	const navigation = useNavigation();

	const { username, email, password } = route.params;

	// const [ username, setUsername ] = useState('');
	const [ age, setAge ] = useState('');
	const [ runningLevel, setRunningLevel ] = useState('');
	const [ pace, setPace ] = useState('');

	const handlePress = () => {
		const user = { username, email, password, age, runningLevel, pace };
		createUser(user);
		
	};

	return (
		<SafeAreaView style={styles.root}>
			{/*  Title */}

			<View style={styles.title}>
				<Text style={styles.titleText}>Tell us about yourself!</Text>
			</View>

			{/* Input Fields */}

			<View style={styles.inputs}>
	

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
						onChangeText={(value) => setAge(value)}
					/>
				</View>

				{/* Running Level */}

				<View style={styles.input}>
					<TextInput
						label="Running Level"
						value={runningLevel}
						mode="outlined"
						outlineColor={Color.Black}
						activeOutlineColor={Color.Black}
						autoCapitalize="none"
						keyboardType="default"
						returnKeyType="next"
						style={{ height: 50, backgroundColor: Color.White }}
						onChangeText={(value) => setRunningLevel(value)}
					/>
				</View>

				{/* Pace */}

				<View style={styles.input}>
					<TextInput
						label="How long does it take to run 5km?"
						value={pace}
						mode="outlined"
						outlineColor={Color.Black}
						activeOutlineColor={Color.Black}
						autoCapitalize="none"
						keyboardType="default"
						returnKeyType="next"
						style={{ height: 50, backgroundColor: Color.White }}
						onChangeText={(value) => setPace(value)}
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
			</View>

			{/* Testing */}

			<View>

				<Text> {username} </Text>
				<Text> {email} </Text>
				<Text> {password} </Text>
				<Text> {age} </Text>
			</View>
		</SafeAreaView>
	);
};

export default RegisterExtraInfo;

const styles = StyleSheet.create({
	root      : {
		flex           : 1,
		justifyContent : 'center'
	},
	title     : {
		justifyContent : 'center',
		alignItems     : 'center',
		marginVertical : 20
	},
	inputs    : {
		alignItems : 'center'
	},
	button    : {
		width          : '75%',
		borderRadius   : 10,

		alignSelf      : 'center',
		marginVertical : 20
	},
	input     : {
		width          : '75%',
		marginVertical : 20
	},
	titleText : {
		fontSize      : 28,
		fontWeight    : '700',
		letterSpacing : 0.36
	}
});
