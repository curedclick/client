import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_PHARMA_PAL_API_URL || "https://api.curedclick.com",
  withCredentials: true,
});

export const axiosFetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
