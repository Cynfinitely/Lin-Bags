export type Product = {
  name: string;
  color: string;
  size: string;
  price: number;
  img: string;
  cartQuantity?: any;
};

export interface ProductsState {
  products: Product[];
  product: null | Product;
  isLoading: boolean;
  error: null | string;
}
export interface CartState {
  cartProducts: Product[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

export type DecodedUser = {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export type initState = {
  products: Product[];
  isLoading: boolean;
  error: null;
};

type Cart = Pick<Product, "name">;
type UpdatedProduct = Partial<Product>;

// for ref
const updatedProduct: UpdatedProduct = {
  name: "string",
  color: "string",
};

export interface CredentialResponse {
  /** This field is the returned ID token */
  credential?: string;
  /** This field sets how the credential is selected */
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}
