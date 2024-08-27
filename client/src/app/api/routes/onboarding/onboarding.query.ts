import { axiosInstance } from "../../lib/axios.instance";

export const getGpSurgeries = async () => {
  try {
    return (await axiosInstance("/surgery")).data;
  } catch (error) {
    return [];
  }
};
