import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, updateProducts } from "redux/slices/productSlice";
import { AppDispatch, RootState } from "redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Product } from "../types";

const UpdateProduct = () => {
  const { products, product } = useSelector(
    (state: RootState) => state.products
  );
  const [updatedProduct, setUpdatedProduct] = React.useState<Product | null>(
    null
  );

  const baseURL = "http://localhost:5000/products";
  const { productId } = useParams();
  const notify = () =>
    toast.success("Succesfully Updated!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [productId]);

  if (!updatedProduct) return <p>Loading a product</p>;

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    if (productId && updatedProduct) {
      console.log("STARTING");
      dispatch(updateProducts({ productId, updatedProduct }));
      notify();
    }
  };

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      <form className="d-flex flex-column text-center w-50 h-50 m-5 border border-dark">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              [e.target.name]: e.target.value,
            })
          }
        />

        <label>Product Color</label>
        <input
          type="text"
          name="color"
          value={updatedProduct.color}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              [e.target.name]: e.target.value,
            })
          }
        />

        <label>Product Size</label>

        <input
          type="text"
          name="size"
          value={updatedProduct.size}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              [e.target.name]: e.target.value,
            })
          }
        />

        <label>Product Price</label>
        <input
          type="text"
          name="price"
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              [e.target.name]: e.target.value,
            })
          }
        />

        <label>Product Img</label>
        <input
          type="text"
          name="img"
          value={updatedProduct.img}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              [e.target.name]: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={handleSubmit}
        >
          SEND
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
