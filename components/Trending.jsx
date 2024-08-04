import React from "react";
import { FlatList, Text } from "react-native";

const Trending = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      renderItem={({ item }) => (
        <Text className="text-2xl text-white">{item}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
