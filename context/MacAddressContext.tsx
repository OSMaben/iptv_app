import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Platform, PermissionsAndroid } from "react-native";
// import { NetworkInfo } from "react-native-network-info";
// import { getUniqueId, getManufacturer } from "react-native-device-info";
import * as Device from "expo-device";

const MacAddressContext = createContext({
  macAddress: "",
  error: "",
});

export const MacAddressProvider = ({ children }: { children: ReactNode }) => {
  const [macAddress, setMacAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getUniqueDeviceIdentifier().then((id) => setMacAddress(id));
  }, []);

  const getUniqueDeviceIdentifier = async () => {
    return Device.osBuildId;
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs access to your location to get the MAC address.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // getMacAddress();
      } else {
        setError("Location permission denied");
      }
    } catch (err) {
      setError(`Error requesting permission: ${err}`);
    }
  };

  // const getMacAddress = async () => {
  //   try {
  //     if (NetworkInfo && typeof NetworkInfo.getBSSID === "function") {
  //       const bssid = await NetworkInfo.getBSSID();
  //       if (bssid) {
  //         setMacAddress(bssid);
  //       } else {
  //         setError("Unable to get BSSID. WiFi might be disconnected.");
  //         getDeviceInfo();
  //       }
  //     } else {
  //       setError("NetworkInfo or getBSSID function is not available");
  //       getDeviceInfo();
  //     }
  //   } catch (err) {
  //     setError(`Error getting BSSID: ${err}`);
  //     getDeviceInfo();
  //   }
  // };

  // const getDeviceInfo = async () => {
  //   const id = await getUniqueId();
  //   setMacAddress(id);
  // };

  return (
    <MacAddressContext.Provider value={{ macAddress, error }}>
      {children}
    </MacAddressContext.Provider>
  );
};

export const useMacAddress = () => useContext(MacAddressContext);
