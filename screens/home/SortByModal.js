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
  RadioButton,
} from "react-native-paper";
import Color from "../../assets/themes/Color";
import { DataContext } from "../../context/datacontext/DataContext";

const SortByModal = ({ modalVisible, hideModal }) => {
  const containerStyle = {
    backgroundColor: "#fff",
    height: "35%",
    margin: 20,
    justifyContent: "center",
  };
  const {
    allEvents,
    setFilteredEvents,
    setSortingCondition,
    resetSortingInHomeScreen,
    isSortingResetInHomePage,
    setIsSortingResetInHomePage,
  } = useContext(DataContext);

  const [sortValue, setSortValue] = useState("standard");

  useEffect(() => {
    if (resetSortingInHomeScreen === true) {
      handleSorting("reset");
      setIsSortingResetInHomePage(false);
    }
  }, [resetSortingInHomeScreen]);

  useEffect(() => {
    if (isSortingResetInHomePage === true) {
      handleSorting("reset");
      setIsSortingResetInHomePage(false);
    }
  }, [isSortingResetInHomePage]);

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
                    borderColor: Color.Black,
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
                <Text>{`Date (soon to later)`}</Text>
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
                    borderColor: Color.Black,
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
                <Text>{`Date (later to soon)`}</Text>
              </View>
            </RadioButton.Group>
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
                  handleSorting("reset");
                  hideModal();
                }}
              >
                <Text style={styles.resetBtnText}>Reset</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: "#FF3E0C",
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: "40px",
                  width: 140,
                }}
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
    paddingTop: 10,
    paddingBottom: 20,
    fontWeight: "900",
    color: "#192126",
    fontSize: 18,
  },
  applyResetBtnsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 40,
  },
  resetBtnText: {
    color: "#FF3E0C",
    fontWeight: "600",
  },
  applyBtnText: {
    color: Color.White,
    fontWeight: "600",
  },
});
