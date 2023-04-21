import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsState, Product } from "types";

const baseURL = "http://localhost:5000/products";

const initialProductState: ProductsState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(baseURL);
    const products = await response.data;
    // console.log(products);
    return products;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id: string) => {
    try {
      axios
        .delete(`http://localhost:5000/deleteproduct/${id}`)
        .then((response) => console.log("Delete successful"));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId: string) => {
    try {
      const response = await axios.get(`${baseURL}/${productId}`);
      const product = await response.data;
      return product;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({
    productId,
    updatedProduct,
  }: {
    productId: string;
    updatedProduct: Product | null;
  }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/updateproduct/${productId}`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Product) => {
    try {
      const { name, size, price, color, img } = product;
      const productData = {
        name,
        size,
        price,
        color,
        img,
      };
      const res = await axios.post(
        "http://localhost:5000/products/",
        productData,
        {
          headers: {
            "x-access-token": "token-value",
          },
        }
      );
      return productData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    getProducts: () => {
      console.log("You are Succ!");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(deleteProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getProductById.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(updateProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateProducts.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action: any) => {
      state.isLoading = true;
      state.products = action.payload;
    });
  },
});

export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
