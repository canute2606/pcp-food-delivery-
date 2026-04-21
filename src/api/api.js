import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  const normalizedSet =
    typeof set === "string" && set.toLowerCase().startsWith("set")
      ? set
      : `set${set}`;

  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set: normalizedSet,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = data?.data ?? data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.orders)) {
    return payload.orders;
  }

  if (Array.isArray(payload?.movies)) {
    return payload.movies;
  }

  return [];
};
