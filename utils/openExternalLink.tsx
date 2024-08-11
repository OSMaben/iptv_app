import { Alert, Linking } from "react-native";

export const openExternalLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
