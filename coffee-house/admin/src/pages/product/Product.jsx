import "./product.css";
import { useState, useEffect } from "react";
import axios from "axios"
export default function Product(props) {
  const id = props.match.params.productId;
  const [, setFile] = useState();
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

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp)
      SetInput({ ...resp })
    })
    .catch(err => console.log(err))
  }, [id])

  return (
    <div className="product">
      <h1 className="addProductTitle">Product</h1>
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
      </form>
      <button 
            onClick={() => {
              axios.put(`http://localhost:3001/products/${id}`, input)
              .finally(() => window.location.href = '/products')
            }}
            className="productButton"
          >
          Update
          </button>
    </div>
  );
}
  