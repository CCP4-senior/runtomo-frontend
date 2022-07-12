import React from "react";
import { ScrollView, View } from "react-native";
import { Modal, Portal, Card, Title, Paragraph } from "react-native-paper";

const DurationModal = ({
  modalVisible,
  hideModal,
  setRunningDuration,
  runningDuration,
}) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "80%",
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
