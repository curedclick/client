import { axiosFetcher, axiosInstance } from "../../lib/axios.instance";
import useSWR from "swr";

export const getGpSurgeries = async () => {
  try {
    return (await axiosInstance("/surgery")).data;
  } catch (error) {
    return [];
  }
};

export const getUserInfo = () => {
  // Use <UserInfo> to specify the type of the data being returned
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading } = useSWR("/user/info", axiosFetcher);

  return {
    userInfoData: data,
    error,
    isLoading,
  };
};

export const getUserInfoSSR = async () => {
  try {
    return (
      await axiosInstance("/user/info", {
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      })
    ).data;
  } catch (error) {
    return {};
  }
};
