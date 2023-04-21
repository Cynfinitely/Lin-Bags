
import { useState } from "react";

const DeleteProduct = () => {
  const delete_id = useState();
  const [ product, DeleteProduct ] = useState();


  async function handleDelete() {
    console.log("item deleted.")
  }
  
  
  return <div>
    <h1>Are you sure?</h1>
    <a href="" onClick={ handleDelete }><button className="btn btn-primary">YES</button></a>
    <a href=""><button className="btn btn-secondary">NO</button></a>
  </div>;
};

export default DeleteProduct;
