import React, { useState, useContext } from "react";
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

const FilterModal = ({ modalVisible, hideModal }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    justifyContent: "center",
  };
  const [tokyo23wards, setTokyo23wards] = useState(tokyoWards);
  const { allEvents, setFilteredEvents } = useContext(DataContext);

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
        console.log(event.ward);
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
          <ScrollView>
            <Title style={styles.modalTitle}>
              Select area from Tokyo 23 Wards!
            </Title>
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
                    <Checkbox
                      status={ward.isChecked ? "checked" : "unchecked"}
                    />
                    <Text
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      {ward.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            <View style={styles.applyResetBtnsWrapper}>
              <Button
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
                  ];
                  setTokyo23wards(reseted23Wards);
                  handleFilter("reset");
                  hideModal();
                }}
              >
                <Text style={styles.resetBtnText}>Reset</Text>
              </Button>
              <Button
                onPress={() => {
                  handleFilter();
                  hideModal();
                }}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </Button>
            </View>
          </ScrollView>
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
  },
  modalTitle: {
    textAlign: "center",
    padding: 10,
  },
  applyResetBtnsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 2,
  },
  resetBtnText: {
    color: Color.PrimaryMain,
  },
  applyBtnText: {
    color: Color.Black,
  },
});
