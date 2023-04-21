import { useEffect } from "react";

import "./Styles/Home.css";
import jwt_decode from "jwt-decode";
import { DecodedUser } from "types";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { addToCart } from "redux/slices/cartSlice";
import { deleteProducts, fetchProducts } from "redux/slices/productSlice";
import Cart from "components/Cart/Cart";

const baseURL = "http://localhost:5000/products";

export default function App() {
  const Products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log("This is new ", Products);

  const token = localStorage.getItem("token") || "";
  const authUser = jwt_decode(token) as DecodedUser;

  return (
    <div className="container w-100 h-100 p-2">
      <div className="card w-50 text-center border border-dark">
        <h1 className="sale display-5">SALE</h1>
        <ul className="product-list d-flex flex-wrap w-100">
          { Products && Products.length > 2 &&
            Products.map((product: any) => (
              <li key={product._id}>
                <div className="product d-flex">
                  <img
                    src={product.img}
                    className="w-25 h-25 img-fluid rounded float-left mr-auto p-2"
                  ></img>

                  <div className="product-information d-flex flex-column  text-center p-2 w-75">
                    <h4>{product.name}</h4>
                    <div className="specification m-4">
                      <span>
                        <em>{product.color}</em>
                      </span>
                      <span>
                        <em>{product.size}</em>
                      </span>
                      <span>
                        <em>{product.price} €</em>
                      </span>
                    </div>
                    <div className="d-flex justify-content-end">
                      {!authUser.isAdmin && (
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="btn btn-sm btn-primary ml-auto"
                        >
                          Add To Cart
                        </button>
                      )}

                      {authUser.isAdmin && (
                        <>
                          <div>
                            <Link to={`/updateProduct/${product._id}`}>
                              <button className="btn btn-primary btn-sm m-1">
                                Update Product
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                dispatch(deleteProducts(product._id))
                              }
                              className="btn btn-sm btn-danger btn-sm m-1"
                            >
                              Delete Product
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="side w-50 h-50 d-flex flex-column ">
        <Cart />

        {authUser.isAdmin && (
          <>
            <div className="admin   border border-dark m-5 p-2">
              <div className="p-3">
                <h1>ADMIN DASHBOARD</h1>
                <Link to="/addProduct">
                  <button className="btn btn-primary m-1">Add Product</button>
                </Link>
                <Link to="/deleteProduct">
                  <button className="btn btn-primary">Delete Product</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
