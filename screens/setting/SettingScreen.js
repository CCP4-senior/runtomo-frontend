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
import * as RootNavigation from "../../navigations/RootNavigator.js";
import axiosInstance from "../../helpers/axios.js";

const SettingScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [dialogType, setDialogType] = useState("confirmation");
  const { user, setUser, signOutUser } = useContext(AuthContext);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setDialogType("confirmation");
  };
  const removeAccount = () => {
    showDialog();
  };
  const deleteAccount = () => {
    try {
      setDialogType("deleted");
      setTimeout(() => {
        setUser("");
        axiosInstance.delete("/auth/delete/");
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };
  const signOut = () => {
    signOutUser();
  };

  const openProfileScreen = (eventData) => {
    const userToView = user;
    RootNavigation.navigate("Profile", { userToView } );
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

        {/* Profile card */}

        <Card
          style={[styles.card, styles.cardTop]}
          theme={{ roundness: 20 }}
          onPress={() => openProfileScreen()}
        >
          <Card.Content>
            <View style={styles.cardContent}>
              <View style={styles.avatar}>
                {user.imageUrl && (
                  <Avatar.Image
                    size={60}
                    // source={require("../../assets/images/demo/wade.png")}
                    source={{ uri: user.imageUrl }}
                  />
                )}
                {!user.imageUrl && (
                  <Avatar.Icon
                    icon="account"
                    size={60}
                    style={{ backgroundColor: Color.GrayDark }}
                  />
                )}
              </View>
              <View style={styles.accountDetails}>
                <Title style={styles.cardTopTitle}>{user.username}</Title>
                <Paragraph style={styles.paragraph}>{user.email}</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* List of items */}

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
    justifyContent: "center",
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
