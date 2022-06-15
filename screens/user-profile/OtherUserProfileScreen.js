import React from 'react';
import { Card, Title, List, Button } from 'react-native-paper';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

const OtherUserProfileScreen = () => {
	const userData = {
		username : 'KumikoKM',
		age      : 28
	};

	return (
		<SafeAreaView style={styles.root}>
			<Text>Testing</Text>
		</SafeAreaView>
	);
};

export default OtherUserProfileScreen;

const styles = StyleSheet.create({});
