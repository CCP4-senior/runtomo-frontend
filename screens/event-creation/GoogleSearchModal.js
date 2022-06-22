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
  setWard,
}) => {
  //default region set to tokyo
  const [region, setRegion] = useState({
    latitude: 35.6828387,
    longitude: 139.7594549,
  });

  const tokyo23wards = [
    "Chiyoda",
    "Bunkyo",
    "Shinjuku",
    "Shibuya",
    "Minato",
    "Chuo",
    "Taito",
    "Toshima",
    "Nakano",
    "Suginami",
    "Setagaya",
    "Meguro",
    "Shinagawa",
    "Ota",
    "Koto",
    "Edogawa",
    "Sumida",
    "Arakawa",
    "Katsushika",
    "Nerima",
    "Itabashi",
    "Adachi",
    "Kita",
  ];

  const getWard = (address_components, formatted_address) => {
    const filteredData = address_components.filter((component) => {
      return component.types.includes("locality");
    });
    let wardName = "";
    if (filteredData[0] !== undefined) {
      wardName = filteredData[0].long_name.replace("City", "");
      wardName = wardName.replace(/\s/g, "");
    } else {
      const splitAddress = formatted_address.replace(/,/g, "").split(" ");
      for (const item of splitAddress) {
        if (tokyo23wards.includes(item)) {
          wardName = item;
          break;
        }
      }
    }
    return wardName;
  };

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
              const ward = getWard(
                details.address_components,
                details.formatted_address
              );
              setMeetingPoint(details.formatted_address);
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
              setWard(ward);
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
