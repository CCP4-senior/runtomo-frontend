import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as RootNavigation from "../navigations/RootNavigator";
import { decode as atob } from "base-64";
const baseURL = "https://solemates-backend-drf.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenData = await SecureStore.getItemAsync("access_token");
    const token = JSON.parse(tokenData);

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    if (!token) {
      config.headers.Authorization = null;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  async (error) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/auth/jwt/refresh/"
    ) {
      RootNavigation.navigate("SignOut", { tokenExpired: true });
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401
    ) {
      const refreshTokenData = await SecureStore.getItemAsync("refresh_token");
      const refreshToken = JSON.parse(refreshTokenData);

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        console.log(tokenParts);

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp, now);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/auth/jwt/refresh/", { refresh: refreshToken })
            .then(async (response) => {
              console.log("there is response", response.data.access);

              await SecureStore.setItemAsync(
                "access_token",
                JSON.stringify(response.data.access)
              );

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          RootNavigation.navigate("SignOut", { tokenExpired: true });
        }
      } else {
        console.log("Refresh token not available.");
        RootNavigation.navigate("SignOut", { tokenExpired: true });
      }
    }

    if (error.response.status === 401) {
      console.log(error);
      RootNavigation.navigate("SignOut", { tokenExpired: true });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
);

export default axiosInstance;
