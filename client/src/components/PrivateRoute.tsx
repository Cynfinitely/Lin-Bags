import { Link, Navigate } from "react-router-dom";
import React from "react";
import jwt_decode from "jwt-decode";
import { DecodedUser } from "types";

// import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;

  if (!authUser.isAdmin) {
    // not logged in so redirect to login page with the return url
    return (
      <div>
        <h1>You are not allowed!</h1>
        <Link to={`/home`}>
          <button className="btn btn-primary">Back to home</button>
        </Link>
      </div>
    );
  }

  // authorized so return child components
  return children;
}

export default PrivateRoute;
