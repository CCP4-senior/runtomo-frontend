import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as RootNavigation from "../navigations/RootNavigator";
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
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 401) {
      console.log(error);
      RootNavigation.navigate("SignOut", { tokenExpired: true });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     if (typeof error.response === "undefined") {
//       alert(
//         "A server/network error occurred. " +
//           "Looks like CORS might be the problem. " +
//           "Sorry about this - we will get it fixed shortly."
//       );
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === baseURL + "api/token/refresh/"
//     ) {
//       window.location.href = "/login/";
//       return Promise.reject(error);
//     }

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = SecureStore.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);
//         console.log(tokenParts.exp);

//         if (tokenParts.exp > now) {
//           return axiosInstance
//             .post("api/token/refresh/", { refresh: JSON.parse(refreshToken) })
//             .then((response) => {
//               console.log("there is response", response);
//               localStorage.setItem("access_token", response.data.access);
//               //   localStorage.setItem("refresh_token", response.data.refresh);

//               axiosInstance.defaults.headers["Authorization"] =
//                 "JWT " + response.data.access;
//               originalRequest.headers["Authorization"] =
//                 "JWT " + response.data.access;

//               return axiosInstance(originalRequest);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         } else {
//           console.log("Refresh token is expired", tokenParts.exp, now);
//           window.location.href = "/login/";
//         }
//       } else {
//         console.log("Refresh token not available.");
//         window.location.href = "/login/";
//       }
//     }

//     // specific error handling done elsewhere
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
