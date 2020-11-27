import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const getUserPermission = async () => {
  const permission = await Permissions.askAsync(Permissions.LOCATION);
  console.log(permission);
  if (permission.granted == "granted") {
    return "Can't currently access permission";
  }
  return "we can get some permissions for u";
};

export const getUserLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });

  const { latitude, longitude } = location.coords;

  return { latitude, longitude };
};

export const watchPosition = () => {
  console.log("watch positionn");
};
