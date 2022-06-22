import React, { useState, useContext } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	useWindowDimensions,
	ImageBackground
} from 'react-native';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { Button } from 'react-native-paper';
import Color from '../../assets/themes/Color';

const UserProfileScreen = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const { height } = useWindowDimensions();
	const [ isImageAvailable, setIsImageAvailable ] = useState(false);

	// TODO: replace userData with db info User is ready
	const userData = {
		username   : user.username,
		age        : user.age,
		runnerType : [ 'beginner', 'social' ]
	};

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.imageContainer}>
				{/* placeholder image, to be updated */}
				<ImageBackground
					style={styles.backgroundImage}
					imageStyle={{ opacity: 0.75 }}
					source={require('../../assets/images/backgroundProfile.png')}
					resizeMode="cover"
				>
					<Image
						style={[ styles.profilePicture, { height: height * 0.3 } ]}
						source={require('../../assets/images/demo/wade.png')}
						resizeMode="contain"
					/>
				</ImageBackground>
			</View>
			<View style={styles.userInfoContainer}>
				<View style={styles.userInfoHeader}>
					<Text style={styles.userFullName}>{userData.username}</Text>
					<Button
						onPress={() => navigation.navigate("Edit Profile")}
						icon="account-edit"
						color={Color.PrimaryMain}
						labelStyle={{ fontSize: 30 }}
					/>
				</View>
				<View style={[ styles.userDataWrapper, styles.tagsContainer ]}>
					<Text style={styles.userDataFont}>Runner Type</Text>
					{userData.runnerType.map((type, index) => {
						return (
							<Text style={[ styles.tags ]} key={index}>
								{' '}
								{type}{' '}
							</Text>
						);
					})}
				</View>
				<View style={styles.userDataWrapper}>
					<Text style={styles.userDataFont}>Age: {userData.age}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default UserProfileScreen;

const styles = StyleSheet.create({
	root              : {
		flex : 1
	},
	imageContainer    : {
		alignItems : 'center'
	},
	backgroundImage   : {
		width  : '100%',
		height : 250
	},
	profilePicture    : {
		width        : 200,
		maxHeight    : 200,
		borderRadius : 200 / 2,
		borderWidth  : 2,
		borderColor  : Color.Black,
		alignSelf    : 'center',
		marginTop    : 'auto',
		marginBottom : 'auto',
		overflow     : 'hidden'
	},
	userInfoContainer : {
		flex    : 2,
		padding : 20
	},
	userFullName      : {
		fontSize   : 24,
		fontWeight : 'bold',
		alignSelf  : 'center'
	},
	userInfoHeader    : {
		flexDirection : 'row',
		alignSelf     : 'center',
		marginBottom  : 10
	},
	tagsContainer     : {
		flexDirection : 'row',
		alignItems    : 'center'
	},
	tags              : {
		backgroundColor  : Color.PrimaryMain,
		marginHorizontal : 4,
		borderRadius     : 6,
		borderColor      : Color.PrimaryMain,
		borderWidth      : 0.2,
		overflow         : 'hidden',
		padding          : 3,
		color            : Color.White,
		fontWeight       : 'bold',
		fontSize         : 16
	},
	userDataWrapper   : {
		backgroundColor : '#F5F5F5',
		borderRadius    : 20,
		padding         : 20,
		width           : '100%',
		marginBottom    : 10
	},
	userDataFont      : {
		fontSize   : 16,
		color      : Color.Black,
		fontWeight : '500'
	}
});
