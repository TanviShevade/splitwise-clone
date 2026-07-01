import axios from "axios";

const API = "http://localhost:5000";

export const saveExpense = (data) =>
  axios.post(`${API}/add-expense`, data);

export const fetchBalance = (groupId) =>
  axios.get(`${API}/group-balance/${groupId}`);
