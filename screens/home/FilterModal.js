import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Modal,
  Portal,
  Card,
  Title,
  Paragraph,
  Checkbox,
  Button,
} from "react-native-paper";
import Color from "../../assets/themes/Color";
import tokyoWards from "../../utils/tokyoWards";
import { DataContext } from "../../context/datacontext/DataContext";

const reseted23Wards = [
  { isChecked: false, name: "Adachi" },
  { isChecked: false, name: "Arakawa" },
  { isChecked: false, name: "Bunkyo" },
  { isChecked: false, name: "Chiyoda" },
  { isChecked: false, name: "Chuo" },
  { isChecked: false, name: "Edogawa" },
  { isChecked: false, name: "Itabashi" },
  { isChecked: false, name: "Katsushika" },
  { isChecked: false, name: "Kita" },
  { isChecked: false, name: "Koto" },
  { isChecked: false, name: "Meguro" },
  { isChecked: false, name: "Minato" },
  { isChecked: false, name: "Nakano" },
  { isChecked: false, name: "Nerima" },
  { isChecked: false, name: "Ota" },
  { isChecked: false, name: "Setagaya" },
  { isChecked: false, name: "Shibuya" },
  { isChecked: false, name: "Shinagawa" },
  { isChecked: false, name: "Shinjuku" },
  { isChecked: false, name: "Suginami" },
  { isChecked: false, name: "Sumida" },
  { isChecked: false, name: "Taito" },
  { isChecked: false, name: "Toshima" },
  { isChecked: false, name: "Other" },
];

const FilterModal = ({
  modalVisible,
  hideModal,
  resetFilterInHomeScreen,
  setResetFilterInHomeScreen,
}) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    borderRadius: 15,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  };
  const [tokyo23wards, setTokyo23wards] = useState(tokyoWards);
  const { allEvents, setFilteredEvents, setIsDataFiltered } =
    useContext(DataContext);

  useEffect(() => {
    if (resetFilterInHomeScreen === true) {
      setTokyo23wards(reseted23Wards);
      handleFilter("reset");
      setIsDataFiltered(false);
      setResetFilterInHomeScreen(false);
    }
  }, [resetFilterInHomeScreen]);

  const handleFilter = (action) => {
    if (action === "reset") {
      setFilteredEvents(null);
    } else {
      const selectedWards = [];
      tokyo23wards.forEach((ward) => {
        if (ward.isChecked === true) {
          selectedWards.push(ward.name);
        }
      });
      const events = allEvents.filter((event) => {
        return selectedWards.includes(event.ward);
      });
      setFilteredEvents(events);
    }
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {/* <ScrollView> */}
          <Title style={styles.modalTitle}>
            Select area from Tokyo 23 Wards
          </Title>
          <ScrollView>
            {tokyo23wards &&
              tokyo23wards.map((ward, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.wardSelectionGrid}
                    onPress={() => {
                      let updated23Wards = [...tokyo23wards];
                      const index = updated23Wards.findIndex(
                        (obj) => obj.name === ward.name
                      );
                      updated23Wards[index].isChecked =
                        !updated23Wards[index].isChecked;
                      setTokyo23wards(updated23Wards);
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Checkbox
                        status={ward.isChecked ? "checked" : "unchecked"}
                      />
                      <Text
                        style={{
                          marginTop: "auto",
                          marginBottom: "auto",
                          fontWeight: "700",
                          fontSize: 14,
                          lineHeight: 45,
                        }}
                      >
                        {ward.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <View style={styles.applyResetBtnsWrapper}>
            <Button
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "red",
                borderWidth: 1,
                borderRadius: "40px",
                width: 140,
              }}
              onPress={() => {
                const reseted23Wards = [
                  { isChecked: false, name: "Adachi" },
                  { isChecked: false, name: "Arakawa" },
                  { isChecked: false, name: "Bunkyo" },
                  { isChecked: false, name: "Chiyoda" },
                  { isChecked: false, name: "Chuo" },
                  { isChecked: false, name: "Edogawa" },
                  { isChecked: false, name: "Itabashi" },
                  { isChecked: false, name: "Katsushika" },
                  { isChecked: false, name: "Kita" },
                  { isChecked: false, name: "Koto" },
                  { isChecked: false, name: "Meguro" },
                  { isChecked: false, name: "Minato" },
                  { isChecked: false, name: "Nakano" },
                  { isChecked: false, name: "Nerima" },
                  { isChecked: false, name: "Ota" },
                  { isChecked: false, name: "Setagaya" },
                  { isChecked: false, name: "Shibuya" },
                  { isChecked: false, name: "Shinagawa" },
                  { isChecked: false, name: "Shinjuku" },
                  { isChecked: false, name: "Suginami" },
                  { isChecked: false, name: "Sumida" },
                  { isChecked: false, name: "Taito" },
                  { isChecked: false, name: "Toshima" },
                  { isChecked: false, name: "Other" },
                ];
                setTokyo23wards(reseted23Wards);
                handleFilter("reset");
                setIsDataFiltered(false);
                hideModal();
              }}
            >
              <Text style={styles.resetBtnText}>Reset</Text>
            </Button>
            <Button
              style={{
                backgroundColor: Color.PrimaryMain,
                borderColor: "red",
                borderWidth: 1,
                borderRadius: "40px",
                width: 140,
              }}
              onPress={() => {
                handleFilter();
                setIsDataFiltered(true);
                hideModal();
              }}
            >
              <Text style={styles.applyBtnText}>Apply</Text>
            </Button>
          </View>
          {/* </ScrollView> */}
        </Modal>
      </Portal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  wardSelectionGrid: {
    flexDirection: "row",
    marginBottom: 5,
    borderBottomColor: Color.GrayDark,
    borderBottomWidth: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalTitle: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "900",
    color: "#192126",
    fontSize: 18,
  },
  applyResetBtnsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20,
  },
  resetBtnText: {
    color: Color.PrimaryMain,
    fontWeight: "600",
  },
  applyBtnText: {
    color: Color.White,
    fontWeight: "600",
  },
});
