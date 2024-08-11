import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Device from "expo-device";
import { useMutation } from "@tanstack/react-query";
import { useMacAddress } from "@/context/MacAddressContext";
import { checkMacAdress } from "@/api/macAddress";
import Icon from "react-native-vector-icons/AntDesign";
import { Link, Navigator } from "expo-router";
import { openExternalLink } from "@/utils/openExternalLink";
import { getUniqueId } from "react-native-device-info";

const index = () => {
  const { macAddress, error } = useMacAddress();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const checkMaMutation = useMutation({
    mutationFn: async (body: { mac_address: string }) => {
      return await checkMacAdress({ mac_address: macAddress });
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: ({ data }) => {
      console.log("onSuccess", data.message);
      setMessage(data.message);
    },
  });

  useEffect(() => {
    checkMaMutation.mutate({ mac_address: macAddress });
    console.log('====================================');
    console.log('Device.osBuildId', Device.osBuildId);
    console.log('====================================');
  }, [macAddress]);

  return (
    <ImageBackground
      source={require("../assets/images/iptv3.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}> {macAddress}</Text>
        {checkMaMutation.isPending && (
          <ActivityIndicator
            size={100}
            color="#ffffff"
            style={styles.spinner}
          />
        )}
        {checkMaMutation.isSuccess && (
          <View style={styles.card}>
            <Icon
              name="checkcircleo"
              size={100}
              color="black"
              style={styles.checkIcon}
            />
            <Text style={styles.cardText}>{message}</Text>

            {/* <TouchableOpacity style={styles.button}> */}
            <Link href={"/player"} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </Link>
            {/* </TouchableOpacity> */}
          </View>
        )}

        {checkMaMutation.isError && (
          <View style={styles.card}>
            <Icon
              name="infocirlceo"
              size={100}
              color="white"
              style={[styles.checkIcon, { color: "red" }]}
            />
            <Text style={styles.cardText}>
              Your MAC address is not active or invalid. Please upgrade your
              account.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                openExternalLink("https://www.google.com");
              }}
            >
              <Text style={styles.buttonText}>Upgrade your account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    marginTop: "10%",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  spinner: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    gap: 15,
  },
  cardText: {
    color: "white",
    fontSize: 25,
    // fontWeight: 'bold',
    textAlign: "center",
  },
  checkIcon: {
    marginBottom: 10,
    color: "#399918",
  },
  button: {
    // backgroundColor: '#FF7777',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
  },
});
