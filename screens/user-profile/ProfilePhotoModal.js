import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { DataContext } from "../../context/datacontext/DataContext";
import selectImage from "../../helpers/selectImage";
import uploadImage from "../../helpers/uploadImage";
import resizeImage from "../../helpers/resizeImage";
import Color from "../../assets/themes/Color";
import axiosInstance from "../../helpers/axios";
import deleteStoredImage from "../../helpers/deleteStoredImage";

const ProfilePhotoModal = ({
  modalVisible,
  hideModal,
  imageUri,
  setImageUri,
  wantsToDelete,
  setWantsToDelete,
}) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    justifyContent: "center",
  };
  const { user, setUser } = useContext(AuthContext);
  const { generateImageUrl } = useContext(DataContext);
  const hasPhoto = user.imageUrl;
  const startSelectImage = () => {
    selectImage(setImageUri);
  };
  const storeNewImage = async () => {
    const prevImageUrl = user.imageUrl;
    const newUri = await resizeImage(imageUri, 300);
    const imageRef = await uploadImage("profiles", newUri);

    await axiosInstance.patch(`/users/profile/${user.profile.id}/`, {
      image: imageRef,
    });

    setUser({
      ...user,
      profile: { ...user.profile, image: imageRef },
      imageUrl: generateImageUrl(imageRef),
    });

    if (hasPhoto) {
      await deleteStoredImage(prevImageUrl);
    }
    hideModal();
  };

  const deleteProfilePhoto = async () => {
    const prevImageUrl = user.imageUrl;
    await axiosInstance.patch(`/users/profile/${user.profile.id}/`, {
      image: null,
    });

    setUser({
      ...user,
      profile: { ...user.profile, image: null },
      imageUrl: null,
    });

    await deleteStoredImage(prevImageUrl);
    hideModal();
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {hasPhoto && wantsToDelete && (
            <>
              <Text style={{ textAlign: "center", padding: 10 }}>
                Are you sure you want to delete your profile photo ?{" "}
              </Text>
              <Text style={{ textAlign: "center", padding: 10 }}>
                The old photo will be deleted from our system.
              </Text>
              <View style={styles.buttonContainer}>
                <Button onPress={deleteProfilePhoto} color={Color.PrimaryMain}>
                  Yes
                </Button>
                <Button color={Color.PrimaryMain} onPress={hideModal}>
                  No
                </Button>
              </View>
            </>
          )}

          {!wantsToDelete && imageUri === "" && hasPhoto && (
            <>
              <Text style={{ textAlign: "center", padding: 10 }}>
                Do you want to change or delete your profile photo?
              </Text>
              <View style={styles.buttonContainer}>
                <Button onPress={startSelectImage} color={Color.PrimaryMain}>
                  Change
                </Button>
                <Button
                  color={Color.PrimaryMain}
                  onPress={() => setWantsToDelete(true)}
                >
                  Delete
                </Button>
              </View>
            </>
          )}

          {!wantsToDelete && imageUri === "" && !hasPhoto && (
            <>
              <Text style={{ textAlign: "center", padding: 10 }}>
                Do you want to add your profile photo?
              </Text>
              <View style={styles.buttonContainer}>
                <Button onPress={startSelectImage} color={Color.PrimaryMain}>
                  Yes
                </Button>
                <Button color={Color.PrimaryMain} onPress={hideModal}>
                  No
                </Button>
              </View>
            </>
          )}

          {!wantsToDelete && imageUri !== "" && (
            <>
              <Text style={{ textAlign: "center", padding: 10 }}>
                Do you want to set this as your new profile photo?
              </Text>
              {hasPhoto && (
                <Text style={{ textAlign: "center", padding: 10 }}>
                  The old photo will be deleted from our system.
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <Button onPress={storeNewImage} color={Color.PrimaryMain}>
                  Yes
                </Button>
                <Button color={Color.PrimaryMain} onPress={hideModal}>
                  No
                </Button>
              </View>
            </>
          )}

          {!wantsToDelete && imageUri !== "" && (
            <View style={styles.imageBackground}>
              <Image source={{ uri: imageUri }} style={styles.selectedPhoto} />

              <View style={styles.imageOverlay}></View>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
};

export default ProfilePhotoModal;

const styles = StyleSheet.create({
  selectedPhoto: {
    position: "relative",
    height: 200,
    width: 200,
    borderRadius: 200,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
});
