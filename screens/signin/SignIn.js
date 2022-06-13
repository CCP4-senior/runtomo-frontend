import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authcontext/AuthContext";

const SignIn = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);

  const handleSignIn = () => {
    if (true) {
      setUser("Wane");
      navigation.navigate("SignIn", { screen: "Home" });
    } else {
      setAuthenticated(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>Sign In Screen</Text>
      <View style={styles.buttonsWrapper}>
        <View style={styles.signInBtnWrapper}>
          <Button
            color="black"
            uppercase={false}
            contentStyle={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "black",
              padding: 2,
            }}
            labelStyle={{
              fontWeight: "bold",
            }}
            onPress={() => {
              handleSignIn();
            }}
          >
            Go to HomePage
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
