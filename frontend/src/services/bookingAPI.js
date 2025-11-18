import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const getBookings = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserBookings = async (userId, token) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createBooking = async (booking, token) => {
  const response = await axios.post(API_URL, booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBooking = async (id, updates, token) => {
  const response = await axios.patch(`${API_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const cancelBooking = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
