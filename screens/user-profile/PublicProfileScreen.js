import React from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	ImageBackground,
	Image,
  useWindowDimensions,
} from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';

const PublicProfileScreen = () => {
	const { height } = useWindowDimensions();

	const userData = {
		username : 'KumikoKM',
		age      : 28
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
						source={{
							uri : 'https://xsgames.co/randomusers/avatar.php?g=male'
						}}
						resizeMode="contain"
					/>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default PublicProfileScreen;

const styles = StyleSheet.create({});
