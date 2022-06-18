import * as React from "react";
import axiosInstance from "../../axios/axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState("");

  const createUser = async ({ username, email, password }) => {
    const response = await axiosInstance.post("/auth/signup/", {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    // await loginUser(e);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "api/token/",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? `JWT ${String(localStorage.getItem("access_token"))}`
              : null,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(jwt_decode(data.access));
        localStorage.setItem("access_token", JSON.stringify(data.access));
        localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        navigate("/");
      }
    } catch (e) {
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const deleteAccount = async () => {
    await axiosInstance.delete("/api/delete_account", {
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? `JWT ${String(localStorage.getItem("access_token"))}`
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
  };

  const contextData = {
    createUser,
    user,
    setUser,
    loginUser,
    user,
    logoutUser,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
