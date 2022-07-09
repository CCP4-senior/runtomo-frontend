import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Modal, Portal, Card, Title, Paragraph } from "react-native-paper";

const AreaModal = ({ modalVisible, hideModal, setWard }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    justifyContent: "center",
  };
  const tokyo23wards = [
    { id: 1, name: "Chiyoda-ku" },
    { id: 2, name: "Bunkyo-ku" },
    { id: 3, name: "Shinjuku-ku" },
    { id: 4, name: "Shibuya-ku" },
    { id: 5, name: "Minato-ku" },
    { id: 6, name: "Chuo-ku" },
    { id: 7, name: "Taito-ku" },
    { id: 8, name: "Toshima-ku" },
    { id: 9, name: "Nakano-ku" },
    { id: 10, name: "Suginami-ku" },
    { id: 11, name: "Setagaya-ku" },
    { id: 12, name: "Meguro-ku" },
    { id: 13, name: "Shinagawa-ku" },
    { id: 14, name: "Ota-ku" },
    { id: 15, name: "Koto-ku" },
    { id: 16, name: "Edogawa-ku" },
    { id: 17, name: "Sumida-ku" },
    { id: 18, name: "Arakawa-ku" },
    { id: 19, name: "Katsushika-ku" },
    { id: 20, name: "Nerima-ku" },
    { id: 21, name: "Itabashi-ku" },
    { id: 22, name: "Adachi-ku" },
    { id: 23, name: "Kita-ku" },
  ];
  return (
    <View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Title
              style={{
                textAlign: "center",
                padding: 10,
                fontWeight: "900",
                color: "#192126",
              }}
            >
              Select area from Tokyo 23 Wards!
            </Title>
            {tokyo23wards.map((ward) => {
              return (
                <Card
                  key={ward.id}
                  onPress={() => {
                    setWard(ward.name);
                    hideModal();
                  }}
                >
                  <Card.Content>
                    <Paragraph>{ward.name}</Paragraph>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default AreaModal;
