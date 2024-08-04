import { useEffect, useState } from "react";

export const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const refecth = () => fetch();

  return { data, refecth, isLoading };
};
