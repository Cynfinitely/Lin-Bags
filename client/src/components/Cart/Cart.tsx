import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "redux/slices/cartSlice";

import { AppDispatch, RootState } from "redux/store";

const Cart = () => {
  const CartProducts = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  console.log("CART:", CartProducts);

  useEffect(() => {
    dispatch(getTotals(CartProducts));
  }, [CartProducts, dispatch]);

  return (
    <div className="admin border border-dark m-5 p-2">
      <h1>CART</h1>
      {/* <button onClick={() => dispatch(cartProducts())}>TEST</button> */}
      <ul className="d-flex flex-column justify-content-evenly m-2 border-bottom border-success list-group list-group-flush">
        {CartProducts.cartProducts.length === 0 ? (
          <div className="cart-empty">
            <p>Your Cart is Empty!</p>
          </div>
        ) : (
          <div>
            {CartProducts.cartProducts.map((product: any) => (
              <>
                <li className="list-group-item">
                  <p>
                    {product.cartQuantity} Piece - {product.name} - 
                    {product.price * product.cartQuantity}€
                  </p>
                </li>
              </>
            ))}
          </div>
        )}
      </ul>
      <div className="d-flex justify-content-around">
        <button className="btn btn-primary m-2">Go To Buy</button>
        <p className="m-2 ">Total amount : {CartProducts.cartTotalAmount}€</p>
      </div>
    </div>
  );
};

export default Cart;
