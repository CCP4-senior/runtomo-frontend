import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Modal, Portal, Card, Title, Paragraph } from "react-native-paper";

const DurationModal = ({ modalVisible, hideModal, setRunningDuration }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
    margin: 20,
    justifyContent: "center",
  };
  const runningDuration = [
    { id: 1, name: "15 mins", num: 15 },
    { id: 2, name: "30 mins", num: 30 },
    { id: 3, name: "1 hr", num: 60 },
    { id: 4, name: "More", num: null },
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
            <Title style={{ textAlign: "center", padding: 10 }}>
              Select Running Duration!
            </Title>
            {runningDuration.map((duration) => {
              return (
                <Card
                  key={duration.id}
                  onPress={() => {
                    setRunningDuration({
                      name: duration.name,
                      num: duration.num,
                    });
                    hideModal();
                  }}
                >
                  <Card.Content>
                    <Paragraph>{duration.name}</Paragraph>
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

export default DurationModal;
