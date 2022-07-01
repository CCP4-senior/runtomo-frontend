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
  RadioButton,
} from "react-native-paper";
import Color from "../../assets/themes/Color";
import { DataContext } from "../../context/datacontext/DataContext";

const SortByModal = ({ modalVisible, hideModal }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "36%",
    margin: 20,
    justifyContent: "center",
  };
  const { allEvents, setFilteredEvents, setSortingCondition } =
    useContext(DataContext);

  const [sortValue, setSortValue] = useState("standard");

  const handleSorting = (action) => {
    if (action === "reset") {
      setSortValue("standard");
      setSortingCondition("standard");
    } else {
      setSortingCondition(sortValue);
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
            <Title style={styles.modalTitle}>Select Sorting Condition</Title>
            <RadioButton.Group
              onValueChange={(value) => setSortValue(value)}
              value={sortValue}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 30,
                  marginBottom: 10,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <View
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 36 / 2,
                    borderColor: "black",
                    borderWidth: 2,
                    marginRight: 20,
                  }}
                >
                  <RadioButton
                    value="standard"
                    status={sortValue === "standard" ? "checked" : "unchecked"}
                  />
                </View>
                <Text>Recently Added</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 30,
                  marginBottom: 10,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <View
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 36 / 2,
                    borderColor: "black",
                    borderWidth: 2,
                    marginRight: 20,
                  }}
                >
                  <View>
                    <RadioButton
                      value="ascending"
                      status={
                        sortValue === "ascending" ? "checked" : "unchecked"
                      }
                    />
                  </View>
                </View>
                <Text>Closest Date</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 30,
                  marginBottom: 10,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <View
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 36 / 2,
                    borderColor: "black",
                    borderWidth: 2,
                    marginRight: 20,
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RadioButton
                    value="descending"
                    status={
                      sortValue === "descending" ? "checked" : "unchecked"
                    }
                  />
                </View>
                <Text>Farthest Date</Text>
              </View>
            </RadioButton.Group>
            <View style={styles.applyResetBtnsWrapper}>
              <Button
                onPress={() => {
                  handleSorting("reset");
                  hideModal();
                }}
              >
                <Text style={styles.resetBtnText}>Reset</Text>
              </Button>
              <Button
                onPress={() => {
                  handleSorting();
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

export default SortByModal;

const styles = StyleSheet.create({
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