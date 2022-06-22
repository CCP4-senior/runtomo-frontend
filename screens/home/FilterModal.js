import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
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

const FilterModal = ({ modalVisible, hideModal }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    justifyContent: "center",
  };
  const [tokyo23wards, setTokyo23wards] = useState([
    { isChecked: false, name: "Chiyoda" },
    { isChecked: false, name: "Bunkyo" },
    { isChecked: false, name: "Shinjuku" },
    { isChecked: false, name: "Shibuya" },
    { isChecked: false, name: "Minato" },
    { isChecked: false, name: "Chuo" },
    { isChecked: false, name: "Taito" },
    { isChecked: false, name: "Toshima" },
    { isChecked: false, name: "Nakano" },
    { isChecked: false, name: "Suginami" },
    { isChecked: false, name: "Setagaya" },
    { isChecked: false, name: "Meguro" },
    { isChecked: false, name: "Shinagawa" },
    { isChecked: false, name: "Ota" },
    { isChecked: false, name: "Koto" },
    { isChecked: false, name: "Edogawa" },
    { isChecked: false, name: "Sumida" },
    { isChecked: false, name: "Arakawa" },
    { isChecked: false, name: "Katsushika" },
    { isChecked: false, name: "Nerima" },
    { isChecked: false, name: "Itabashi" },
    { isChecked: false, name: "Adachi" },
    { isChecked: false, name: "Kita" },
  ]);

  return (
    <View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Title style={{ textAlign: "center", padding: 10 }}>
              Select area from Tokyo 23 Wards!
            </Title>
            {tokyo23wards.map((ward, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    borderBottomColor: Color.GrayDark,
                    borderBottomWidth: 1,
                  }} 
                >
                  <Checkbox
                    status={ward.isChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      let updated23Wards = [...tokyo23wards];
                      const index = updated23Wards.findIndex(
                        (obj) => obj.name === ward.name
                      );
                      updated23Wards[index].isChecked =
                        !updated23Wards[index].isChecked;
                      setTokyo23wards(updated23Wards);
                    }}
                  />
                  <Text
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {ward.name}
                  </Text>
                </View>
              );
            })}
            <Button
              onPress={() => {
                const reseted23Wards = [
                  { isChecked: false, name: "Chiyoda" },
                  { isChecked: false, name: "Bunkyo" },
                  { isChecked: false, name: "Shinjuku" },
                  { isChecked: false, name: "Shibuya" },
                  { isChecked: false, name: "Minato" },
                  { isChecked: false, name: "Chuo" },
                  { isChecked: false, name: "Taito" },
                  { isChecked: false, name: "Toshima" },
                  { isChecked: false, name: "Nakano" },
                  { isChecked: false, name: "Suginami" },
                  { isChecked: false, name: "Setagaya" },
                  { isChecked: false, name: "Meguro" },
                  { isChecked: false, name: "Shinagawa" },
                  { isChecked: false, name: "Ota" },
                  { isChecked: false, name: "Koto" },
                  { isChecked: false, name: "Edogawa" },
                  { isChecked: false, name: "Sumida" },
                  { isChecked: false, name: "Arakawa" },
                  { isChecked: false, name: "Katsushika" },
                  { isChecked: false, name: "Nerima" },
                  { isChecked: false, name: "Itabashi" },
                  { isChecked: false, name: "Adachi" },
                  { isChecked: false, name: "Kita" },
                ];
                setTokyo23wards(reseted23Wards);
              }}
            >
              Reset
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default FilterModal;
