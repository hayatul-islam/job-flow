import api from "../axios";

export const getProfile = async () => {
  const res = await api.get("/profile");

  return res.data;
};

export const updateProfile = async (formData: FormData) => {
  const res = await api.put(`/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
