import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Modal, Portal, Title } from "react-native-paper";
import Color from "../../assets/themes/Color";
import LongButton from "../../components/LongButton";
import { AuthContext } from "../../context/authcontext/AuthContext";

const SuccessModal = ({ modalVisible }) => {
  const { signInUser, userToBeRegistered } = useContext(AuthContext);
  const { email, password } = userToBeRegistered;

  return (
    <View>
      <Portal>
        <Modal
          dismissable={false}
          visible={modalVisible}
          contentContainerStyle={{
            height: "80%",
            width: "90%",
            borderRadius: 15,
            alignSelf: "center",
          }}
        >
          <View style={styles.container}>
            <Title
              style={{
                textAlign: "center",
                padding: 10,
                fontFamily: "Mulish_900Black",
                fontSize: 28,
              }}
            >
              Conguratulations!
            </Title>
            <Image
              style={styles.image}
              source={require("../../assets/images/confirmation.png")}
            />
            <Text style={styles.text}>Account is created successufully</Text>
            <Text style={styles.text}>Start your RunTomo Journey!</Text>
            <LongButton
              buttonColor={Color.PrimaryMain}
              buttonText="Start"
              customStyle={{ width: "100%", marginTop: 26 }}
              buttonHandler={async () => {
                await signInUser({ email, password });
              }}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,

    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    height: "60%",
  },
  text: {
    color: Color.TextMute,
  },
});
