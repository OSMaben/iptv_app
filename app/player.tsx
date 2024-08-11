import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { getChannelByMA } from "@/api/macAddress";
import { useMacAddress } from "@/context/MacAddressContext";
import { parseM3U } from "@/utils/parseM3U";

const { width, height } = Dimensions.get("window");

type Channel = {
  id: number;
  m3u_list: string;
};

const IPTVScreen = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const { macAddress } = useMacAddress();

  useEffect(() => {
    const setLandscapeMode = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    setLandscapeMode();

    if (macAddress) {
      fetchChannels();
    }

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [macAddress]);

  const fetchChannels = async () => {
    try {
      const response = await getChannelByMA(macAddress);
      const channelData = response.data.channels;
      setChannels(channelData);
      setCurrentChannel(channelData[0]);
      setIsLoadingList(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchCurrentChannel();
  }, [currentChannel]);

  const fetchCurrentChannel = async () => {
    if (!currentChannel) return;
    try {
      const response = await fetch(currentChannel.m3u_list);
      const data = await response.text();
      const channelUrl = parseM3U(data);
      if (channelUrl) {
        setCurrentChannel({ ...currentChannel, m3u_list: channelUrl });
      }
    } catch (error) {
      console.error("Error fetching channel:", error);
    }
  };

  const renderChannelItem = ({ item }: { item: Channel }) => (
    <TouchableOpacity
      style={[
        styles.channelItem,
        currentChannel?.id === item.id && styles.selectedChannelItem,
      ]}
      onPress={() => {
        setCurrentChannel(item);
        setIsLoading(true);
      }}
    >
      <Text style={styles.channelName}>channel{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.channelListContainer}>
          {isLoadingList ? (
            <ActivityIndicator
              size={70}
              color="#000"
              style={styles.loadingIndicator}
            />
          ) : (
            <FlatList
              data={channels}
              renderItem={renderChannelItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <View style={styles.playerContainer}>
          {currentChannel && (
            <>
              {isLoading && (
                <ActivityIndicator
                  size={70}
                  color="#000"
                  style={styles.loadingIndicator}
                />
              )}
              <Video
                source={{ uri: currentChannel.m3u_list }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
                style={styles.player}
                onLoad={() => setIsLoading(false)}
                onError={(error) => {
                  console.error("Video loading error:");
                  setIsLoading(false);
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flexDirection: "row",
    flex: 1,
  },
  playerContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  currentChannelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  player: {
    width: "100%",
    height: "90%",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  channelListContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 30,
  },
  channelItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  selectedChannelItem: {
    backgroundColor: "#e6e6e6",
  },
  channelName: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default IPTVScreen;
