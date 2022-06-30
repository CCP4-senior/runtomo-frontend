import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
/* google config */
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API } from "@env";
import { DataContext } from "../../context/datacontext/DataContext";

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

  const { tokyoWards } = useContext(DataContext);

  const tokyo23wards = tokyoWards;

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
      if (splitAddress.some((el) => el === "River")) {
        alert("Location is too broad. Please choose more specific address");
        throw new Error();
      }
      for (const item of splitAddress) {
        if (tokyo23wards.some((el) => el.ward_name === item)) {
          wardName = item;
          break;
        }
      }
    }
    const ward = tokyo23wards.find((el) => el.ward_name === wardName);
    return ward ? ward : { id: 24, ward_name: "Other" };
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
              try {
                const ward = getWard(
                  details.address_components,
                  details.formatted_address
                );
                setMeetingPoint(details.formatted_address);
                setLatitude(details.geometry.location.lat);
                setLongitude(details.geometry.location.lng);
                setWard(ward);
                hideModal();
              } catch (e) {
                console.log(e);
              }
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
