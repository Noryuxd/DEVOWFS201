import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const BackEndUrl = 'http://127.0.0.1:8000/api'
// define your api calls in seperate files on this folder


//! -- Login Requests
export const LoginFunction = async (data) => {
  const response = await axios.post(`${BackEndUrl}/login`, data)
  return response.data
}


//! -- Sign Up Requests
export const SignUpFunctionV1 = async (data) => {
  const response = await axios.post(`${BackEndUrl}/sign_up`, data)
  return response.data
}
export const SignUpFunctionV2 = async (data) => {
  const response = await axios.post(`${BackEndUrl}/sign_up_v2`, data)
  return response.data
}


//! -- Forget Password Requests
export const ForgetPswdFunctionV1 = async (data) => {
  const response = await axios.post(`${BackEndUrl}/checkEmailIfExist`, data);
  return response.data
}
export const ForgetPswdFunctionV2 = async (data) => {
  const response = await axios.post(`${BackEndUrl}/updatePassword`, data);
  return response.data
}