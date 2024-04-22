import axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL;

export const apiService = axios.create({
  baseURL,
});
