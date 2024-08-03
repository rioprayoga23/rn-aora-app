import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setIsLogged, setUser } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmiting(true);
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign Up With Aora
          </Text>

          <FormField
            title={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmiting}
          />

          <View className="justify-center flex-row gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary font-semibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
