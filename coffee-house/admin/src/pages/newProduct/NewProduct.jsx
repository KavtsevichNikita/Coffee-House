import { useState } from "react";
import "./newProduct.css";
import axios from "axios"

export default function NewProduct() {

  const [, setFile] = useState(null);
  const [input, SetInput] = useState({
    file:"",
    name:"",
    country:"",
    descr:"",
    price:"",
  })
  function handleChange(event){
    const  {name, value} = event.target

    SetInput(prevInput => {
      return{
      ...prevInput,
      [name]:value
      }
    })
  }


  const selectFile = e =>{
    setFile(e.target.file)
    const  {name, value} = e.target

    SetInput(prevInput => {
      return{
      ...prevInput,
      [name]:value
      }
    })
  }

  function handleClick(event) {
    event.preventDefault();

    const newProduct = {
      file: input.file,
      name: input.name,
      country: input.country,
      descr: input.descr,
      price: input.price,
    }
    
    axios.post("http://localhost:3001/products", newProduct)

    window.location.reload();
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        {/* <div className="addProductItem">
          <label>Image</label>
          <input
          name="file"
          value={input.file}
          type="file" 
          id="file" 
          onChange={selectFile}
          />
        </div> */}
        <div className="addProductItem">
          <label>Name</label>
          <input
          name="name" 
          value={input.name}
          onChange={handleChange}
          type="text" 
          placeholder="Product name" 
          />
        </div>
        <div className="addProductItem">
          <label>Country</label>
          <input
          name="country"
           type="text" 
           value={input.country}
           onChange={handleChange}
           placeholder="Country" />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
          name="descr"
          value={input.descr}
           type="text" 
           onChange={handleChange}
           placeholder="About product" />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
          name="price" 
          type="text"
          value={input.price}
          onChange={handleChange}
          placeholder="9.99$" />
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
