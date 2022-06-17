import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  List,
  Button,
  Portal,
  Dialog,
  Provider,
  Avatar,
} from "react-native-paper";
import { AuthContext } from "../../context/authcontext/AuthContext.js";
import Color from "../../assets/themes/Color.js";

const SettingScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [dialogType, setDialogType] = useState("confirmation");
  const { user, setUser } = useContext(AuthContext);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setDialogType("confirmation");
  };
  const removeAccount = () => {
    showDialog();
  };
  const deleteAccount = () => {
    setDialogType("deleted");
    setTimeout(() => setUser(""), 5000);
  };
  const signOut = () => {
    setUser("");
  };

  const openProfileScreen = (eventData) => {
    navigation.navigate("Profile", {
      eventData: eventData,
    });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              {dialogType === "confirmation"
                ? "Confirmation"
                : "Account Deleted"}
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {dialogType === "confirmation"
                  ? "Are you sure you want to remove your account?"
                  : "Your account was deleted successfully. All of your data was removed from our services. Thank you for using SoleMates."}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              {dialogType === "confirmation" && (
                <>
                  <Button onPress={hideDialog} color={Color.PrimaryMain}>
                    Cancel
                  </Button>
                  <Button onPress={deleteAccount} color="grey">
                    Yes
                  </Button>
                </>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Card
          style={[styles.card, styles.cardTop]}
          theme={{ roundness: 20 }}
          onPress={() => openProfileScreen()}
        >
          <Card.Content>
            <View style={styles.cardContent}>
              <View style={styles.avatar}>
                <Avatar.Image
                  size={60}
                  source={require("../../assets/images/demo/wade.png")}
                />
              </View>
              <View style={styles.accountDetails}>
                <Title style={styles.cardTopTitle}>Wade Warren</Title>
                <Paragraph style={styles.paragraph}>
                  example@example.com
                </Paragraph>
              </View>
              <Card.Actions>
                <Button
                  icon="chevron-right"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  uppercase={false}
                  color={Color.Text}
                  labelStyle={styles.label}
                  onPress={() => {
                    console.log("Presed");
                  }}
                >
                  Edit
                </Button>
              </Card.Actions>
            </View>
          </Card.Content>
        </Card>
        <Card
          style={[styles.card, styles.cardBottom]}
          theme={{ roundness: 20 }}
        >
          <Card.Content>
            <List.Item
              title="Change Password"
              left={(props) => <List.Icon {...props} icon="lock" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Remove Account"
              left={(props) => <List.Icon {...props} icon="account-remove" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={removeAccount}
            />
            <List.Item
              title="Sign Out"
              left={(props) => <List.Icon {...props} icon="logout-variant" />}
              onPress={signOut}
            />
          </Card.Content>
        </Card>
      </View>
    </Provider>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  cardContent: {
    flexDirection: "row",
  },
  accountDetails: {
    width: 170,
  },
  card: {
    width: "95%",
    marginBottom: 10,
    height: 90,
  },
  cardTopTitle: {
    color: Color.Text,
    fontWeight: "bold",
  },
  paragraph: {
    color: "#007AFF",
  },
  cardBottom: {
    height: 200,
  },
  avatar: {
    borderRadius: 10,
    borderColor: Color.GrayDark,
    width: 80,
    height: 60,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
