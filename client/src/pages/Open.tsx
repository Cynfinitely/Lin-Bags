import "./Styles/Open.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { Link } from "react-router-dom";

const Open = () => {
  const state: any = useSelector((state) => state);
  console.log("this is state:", state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="container  align-items-center ">
      <div className="d-flex flex-column ">
        <div className="p-2">
          <h1 className="display-1">
            Welcome to the <span>Linnen</span>
          </h1>
        </div>
        <div className="p-2">
          {/* For Testing Redux 
            <button
            onClick={() => dispatch(fetchProducts())}
            className="btn mb-2 mb-md-0 btn-primary btn-block"
          >
            TEST REDUX
          </button> */}

          <Link to={`/home`}>
            <button className="btn btn-primary btn-lg m-3">Home</button>
          </Link>
          <Link to={`/login`}>
            <button className="btn btn-primary btn-lg m-3">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Open;
