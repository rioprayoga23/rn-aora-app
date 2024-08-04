import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="flex flex-row items-center space-x-4 w-full pr-4 h-16 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular h-full px-4"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
