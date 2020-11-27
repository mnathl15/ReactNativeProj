import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Route } from "react-router-native";
import Search from "./Components/Search";

export const [SEARCH_ROUTE, REMOVE_ROUTE, ADD_ROUTE] = [
  "search",
  "remove",
  "add",
];

function Home({ setCurrPage, location }) {
  const [userLocation, setUserLocation] = useState();

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
    setCurrPage(`home/${SEARCH_ROUTE}`);
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text
            style={
              location.pathname == `/home/${SEARCH_ROUTE}`
                ? styles.headerSelected
                : styles.headerNotSelected
            }
            onPress={() => {
              setCurrPage(`home/${SEARCH_ROUTE}`);
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={
              location.pathname == `/home/${REMOVE_ROUTE}`
                ? styles.headerSelected
                : styles.headerNotSelected
            }
            onPress={() => {
              setCurrPage(`home/${REMOVE_ROUTE}`);
            }}
          >
            Remove
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={
              location.pathname == `/home/${ADD_ROUTE}`
                ? styles.headerSelected
                : styles.headerNotSelected
            }
            onPress={() => {
              setCurrPage(`home/${ADD_ROUTE}`);
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Route
          path={`/home/${SEARCH_ROUTE}`}
          render={(props) => {
            return (
              <Search
                {...props}
                setUserLocation={(userLocation) =>
                  setUserLocation(userLocation)
                }
              />
            );
          }}
        />
        <Route
          path={`/home/${REMOVE_ROUTE}`}
          render={() => {
            return <Text>{REMOVE_ROUTE}</Text>;
          }}
        />
        <Route
          path={`/home/${ADD_ROUTE}`}
          render={() => {
            return <Text>{ADD_ROUTE}</Text>;
          }}
        />
      </View>
    </View>
  );
}

export default Home;
