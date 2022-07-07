import React, { useState, useEffect } from "react";
import { Card, Title } from "react-native-paper";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import Color from "../../assets/themes/Color";
import axiosInstance from "../../helpers/axios";

const PointsOfInterestScreen = () => {
  const [region, setRegion] = useState({
    latitude: 35.6828387,
    longitude: 139.7594549,
  });
  const [runningStations, setRunningStations] = useState([]);

  useEffect(() => {
    fetchPointsOfInterest();
  }, []);

  const fetchPointsOfInterest = async () => {
    const pointsOfInterestResponse = await axiosInstance.get(
      `/pointsofinterest/`
    );
    setRunningStations(pointsOfInterestResponse.data);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card} theme={{ roundness: 10 }}>
            <Card.Content style={styles.creatorCard}>
              <Title style={styles.eventTitle}>
                Running Stations in Tokyo!
              </Title>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}
                  provider={PROVIDER_DEFAULT}
                >
                  {runningStations &&
                    runningStations.map((station) => {
                      return (
                        <View key={station.id}>
                          <Marker
                            coordinate={{
                              latitude: Number(station.lat),
                              longitude: Number(station.long),
                            }}
                            title={`${station.en_title} - ${station.jp_title}`}
                            description={station.address}
                          ></Marker>
                          <Circle
                            center={{
                              latitude: Number(station.lat),
                              longitude: Number(station.long),
                            }}
                            radius={100}
                            strokeWidth={2}
                          />
                        </View>
                      );
                    })}
                </MapView>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PointsOfInterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Fill,
    padding: 10,
    alignItems: "center",
    overflow: "visible",
  },
  mapContainer: {
    backgroundColor: Color.White,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "auto",
    marginBottom: 20,
    paddingBottom: 12,
  },
  eventTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: Color.PrimaryMain,
  },
  map: {
    height: 500,
    width: "100%",
    alignSelf: "center",
    marginTop: 12,
  },
});
