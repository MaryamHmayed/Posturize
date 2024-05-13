
import axios from 'axios';


export const BASE_URL = 'http://192.168.1.109:8000/api';


export const apiInstance = axios.create({
  baseURL: BASE_URL,
});