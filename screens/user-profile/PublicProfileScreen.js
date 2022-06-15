import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { Card, Title, List, Button } from "react-native-paper";


const PublicProfileScreen = () => {
  const userData = {
		username : 'KumikoKM',
		age      : 28
	};

  return (
		<SafeAreaView style={styles.root}>
			<Text>Kumiko's Public Profile</Text>
		</SafeAreaView>
  );
};

export default PublicProfileScreen;

const styles = StyleSheet.create({});
