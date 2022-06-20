import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
/* google config */
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API } from "@env";

const GoogleSearchModal = ({
  modalVisible,
  hideModal,
  setMeetingPoint,
  setLatitude,
  setLongitude,
}) => {
  //default region set to tokyo
  const [region, setRegion] = useState({
    latitude: 35.652832,
    longitude: 139.839478,
  });

  const containerStyle = {
    backgroundColor: "#fff",
    height: "100%",
    margin: 20,
    justifyContent: "center",
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              setMeetingPoint(details.formatted_address);
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
              hideModal();
            }}
            query={{
              key: `${GOOGLE_PLACES_API}`,
              language: "en",
              components: "country:jp",
              radius: 75000,
              location: `${region.latitude}, ${region.longitude}`,
            }}
            styles={{
              container: { width: "100%", height: "100%", zIndex: 1 },
              listView: { backgroundColor: "white" },
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default GoogleSearchModal;
