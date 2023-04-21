import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { CredentialResponse, DecodedUser } from "../types";
import "./Styles/Login.css";

const Login = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<null | DecodedUser>(null);
  console.log("token:", token);
  console.log("user", user);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode(token) as DecodedUser;
    setUser(decoded);
    setToken(token);
  }, []);

  const handleGoogleOnSuccess = async (response: CredentialResponse) => {
    console.log("response:", response);
    if (response.credential) {
      const res = await axios.post(
        "http://localhost:5000/login",
        {},
        {
          headers: {
            id_token: response.credential,
          },
        }
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    }
  };

  return (
    <div className="container w-100">
      <div className="p-5 align-self-center">
        <h1>LOGIN</h1>
        <p>Is Admin?: {user?.isAdmin ? "YES" : "No"}</p>
        <GoogleLogin
          onSuccess={handleGoogleOnSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
