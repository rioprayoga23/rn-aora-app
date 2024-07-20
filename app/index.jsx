import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-pblack">index</Text>
      <Link href="/home" style={{ color: "blue" }}>
        Home
      </Link>
    </View>
  );
};

export default index;
