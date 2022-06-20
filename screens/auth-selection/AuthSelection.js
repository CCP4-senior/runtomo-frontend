import {
	StyleSheet,
	View,
	SafeAreaView,
	Image,
	useWindowDimensions
} from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import Color from '../../assets/themes/Color.js';

const AuthSelection = ({ navigation }) => {
	const { height } = useWindowDimensions();

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				<Image
					style={{ width: 500 }}
					source={require('../../assets/images/logo.png')}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.buttonsWrapper}>
				{/* Signin button */}

				<View style={styles.signInBtnWrapper}>
					<Button
						color={Color.Black}
						uppercase={false}
						contentStyle={{
							borderWidth     : 1,
							borderRadius    : 10,
							borderColor     : Color.Black,
							padding         : 5,
							backgroundColor : Color.White
						}}
						labelStyle={{
							fontWeight : 'bold',
							fontSize   : 18
						}}
						onPress={() => navigation.navigate('SignIn')}
					>
						Sign In
					</Button>
				</View>

				{/* Register button */}

				<View style={styles.registerBtnWrapper}>
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
						onPress={() => navigation.navigate('Register')}
					>
						Register
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default AuthSelection;

const styles = StyleSheet.create({
	root               : {
		flex : 1
	},
	container          : {
		flex       : 3,
		alignItems : 'center',
		padding    : 10,
		marginTop  : 30
	},
	buttonsWrapper     : {
		flex       : 1,
		alignItems : 'center'
	},
	signInBtnWrapper   : {
		marginBottom    : 20,
		width           : '70%',
		borderRadius    : 10,
		backgroundColor : Color.White
	},
	registerBtnWrapper : {
		width        : '70%',
		marginBottom : 20
	}
});
