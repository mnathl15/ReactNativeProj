import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Geolocation from "react-native-geolocation-service";
import { getUserPermission } from "../../../utils/geolocation";

function Search({ setUserLocation }) {
  const [searchError, setSearchError] = useState();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: "rgb(41,255,232)",
      height: 100,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
    headerSelected: {
      color: "red",
    },
    headerNotSelected: {
      color: "black",
    },
  });

  useEffect(() => {
    const permissions = async () => {
      const permission = await getUserPermission();
      setSearchError(permission);
    };

    permissions();

    // const location = getUserPermissionAndLocatio().then((info) => {
    //   setUserLocation(location);
    // });
  }, []);
  return (
    <View>
      <Text>This is the search page</Text>
      <Text>{searchError}</Text>
    </View>
  );
}

export default Search;
