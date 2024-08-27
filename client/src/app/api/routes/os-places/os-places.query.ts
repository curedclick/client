import { axiosInstance } from "../../lib/axios.instance";

export const getAddressFromPostcode = async ({
  postcode,
}: {
  postcode: string;
}) => {
  try {
    const response = await axiosInstance(
      "https://api.os.uk/search/places/v1/postcode",
      {
        params: {
          key: process.env.NEXT_PUBLIC_OS_PLACES_API_KEY,
          postcode: postcode.trim(),
        },
      }
    );

    return response.data;
  } catch (error) {
    return [];
  }
};
