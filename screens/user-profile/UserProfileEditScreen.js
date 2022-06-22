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

const UserProfileEditScreen = ({ navigation, user }) => {
	const { height } = useWindowDimensions();

	return (
		<SafeAreaView style={styles.root}>
			<View>
				<Text>Profile Edit Page</Text>
			</View>
      <View>
				<Text>Username</Text>
			</View>
      <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Running Duration"
              customValue={runningDuration}
              onFocus={setDurationModalVisible}
              value={runningDuration}
              submitted={submitted}
            />
          </View>
		</SafeAreaView>
	);
};

export default UserProfileEditScreen;

const styles = StyleSheet.create({
	root              : {
		flex : 1
	},
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  inputContainer: {
    margin: 5,
  },
});
