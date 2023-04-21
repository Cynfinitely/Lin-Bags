import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { addProduct } from "redux/slices/productSlice";

const schema = z.object({
  name: z.string(),
  color: z.string(),
  size: z.string(),
  price: z.number().int().positive(),
  img: z.string().url(),
});

type FormData = z.infer<typeof schema>;

const AddProduct = () => {
  const { products, product } = useSelector(
    (state: RootState) => state.products
  );
  const [newProduct, setNewProduct] = useState<null | Product>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const errorValues = Object.entries(errors);
  console.log(errorValues);
  const onSubmit = handleSubmit((product: Product) => {
    console.log("here is your;", product);
    dispatch(addProduct(product));
    setNewProduct(product);
  });

  console.log("👀 ", newProduct);

  return (
    <div className="d-flex justify-content-center w-100 h-100">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column text-center w-50 h-50 m-5 border border-dark"
      >
        {errorValues.length !== 0 && (
          <fieldset>
            <legend>
              <span>There is an ERROR!</span>
            </legend>
            <ul className="list-group">
              {errorValues.map(
                ([name, error]) =>
                  error && (
                    <li key={name} className="list-group-item">
                      {name} : {error.message}
                    </li>
                  )
              )}
            </ul>
          </fieldset>
        )}

        <label>Product Name</label>
        <input {...register("name")} placeholder="product name" />

        <label>Product Color</label>
        <input {...register("color")} placeholder="product color" />

        <label>Product Size</label>

        <select {...register("size")}>
          <option value="Small">s</option>
          <option value="Normal">n</option>
          <option value="Large">l</option>
        </select>

        <label>Product Price</label>
        <input
          {...register("price", { valueAsNumber: true })}
          placeholder="product price"
        />

        <label>Product IMG</label>
        <input {...register("img")} placeholder="product image url" />

        <button type="submit" className="btn btn-sm btn-primary">
          SEND
        </button>
        {newProduct && (
          <div className="alert alert-secondary mt-2" role="alert">
            <pre>"{newProduct.name}" has been created.</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;

