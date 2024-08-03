import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const { setIsLogged, setUser } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmiting(true);
    try {
      const result = await signIn({
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
            Sign In With Aora
          </Text>

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
            title={"Sign In"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmiting}
          />

          <View className="justify-center flex-row gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg text-secondary font-semibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
